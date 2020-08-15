import { nextSong, selectCurrentSong, selectIsPlaying } from '../slices/app';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { prettyTime } from '../helpers/datetime';
import Storage from '../helpers/Storage';
import Range from './Range';

export default function NowPlaying() {
	const dispatch = useDispatch();
	const song = useSelector(selectCurrentSong);
	const isPlaying = useSelector(selectIsPlaying);
	const [currentTime, setCurrentTime] = useState(0);
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
			sortColumn: Storage.get('sortColumn'),
			sortDirection: Storage.get('sortDirection'),
		}));
	};
	const onSeek = (e) => {
		audio.currentTime = parseFloat(e.target.value) / 1000;
	};
	const prettyDuration = prettyTime(song.duration);

	return (
		<section id="now-playing">
			<audio
				autoPlay
				onEnded={onEnded}
				onTimeUpdate={onTimeUpdate}
				ref={(element) => { setAudio(element); }}
				src={`http://localhost:2000/?path=${encodeURIComponent(song.path)}`}
			/>
			<div id="now-playing-title">{song.title}</div>
			<div id="now-playing-artist">{song.artist}</div>
			<div id="now-playing-time">
				<div id="now-playing-time-current">{prettyTime(currentTime, song.duration)}</div>
				<Range id="position" max={song.duration} onChange={onSeek} step={1} value={currentTime} />
				<div id="now-playing-time-total">{prettyDuration}</div>
			</div>
		</section>
	);
}
