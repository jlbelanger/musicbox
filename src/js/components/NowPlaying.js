import { nextSong, selectCurrentSong, selectIsPlaying } from '../slices/app';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { prettyTime } from '../helpers/datetime';
import Range from './Range';
import Storage from '../helpers/Storage';
import Volume from './Volume';

export default function NowPlaying() {
	const dispatch = useDispatch();
	const song = useSelector(selectCurrentSong);
	const isPlaying = useSelector(selectIsPlaying);
	const [currentTime, setCurrentTime] = useState(0);
	const [volume, setVolume] = useState(Storage.get('volume', 1.0));
	const [isActuallyPlaying, setIsActuallyPlaying] = useState(false);
	const [audio, setAudio] = useState(null);
	if (!song) {
		return null;
	}
	if (audio) {
		if (isActuallyPlaying && !isPlaying) {
			audio.pause();
			setIsActuallyPlaying(false);
		} else if (!isActuallyPlaying && isPlaying) {
			audio.play();
			setIsActuallyPlaying(true);
		}
	}
	const onTimeUpdate = () => {
		setCurrentTime(audio.currentTime * 1000);
	};
	const onEnded = () => {
		dispatch(nextSong({
			songs: window.songs,
			sort: Storage.get('tabulator--sort'),
		}));
	};
	const onSeek = (e) => {
		audio.currentTime = parseFloat(e.target.value) / 1000;
	};
	const prettyDuration = prettyTime(song.duration);
	const audioSrc = `http://localhost:2000/audio?path=${encodeURIComponent(song.path)}`;
	const imgSrc = `http://localhost:2000/image?path=${encodeURIComponent(song.path)}`;

	return (
		<section id="now-playing">
			<audio
				autoPlay
				onEnded={onEnded}
				onTimeUpdate={onTimeUpdate}
				ref={(element) => { setAudio(element); }}
				src={audioSrc}
				volume={volume}
			/>
			<img id="now-playing-img" alt="" src={imgSrc} />
			<div id="now-playing-title">{song.title}</div>
			<div id="now-playing-artist">{song.artist}</div>
			<Volume audio={audio} setVolume={setVolume} volume={volume} />
			<div id="now-playing-time">
				<div id="now-playing-time-current">{prettyTime(currentTime, song.duration)}</div>
				<Range id="position" max={song.duration} onChange={onSeek} step={1} value={currentTime} />
				<div id="now-playing-time-total">{prettyDuration}</div>
			</div>
		</section>
	);
}
