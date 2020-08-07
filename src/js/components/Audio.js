import React, { useState } from 'react';
import { nextSong, selectCurrentSong, selectIsPlaying } from '../slices/app';
import { useDispatch, useSelector } from 'react-redux';
import { prettyTime } from '../helpers/datetime';
import { selectSongs } from '../slices/songs';

export default function Audio() {
	const dispatch = useDispatch();
	const song = useSelector(selectCurrentSong);
	const songs = useSelector(selectSongs);
	const isPlaying = useSelector(selectIsPlaying);
	const [currentTime, setCurrentTime] = useState(0);
	const [audio, setAudio] = useState(null);
	if (audio) {
		if (!isPlaying) {
			audio.pause();
		} else {
			audio.play();
		}
	}
	const onTimeUpdate = () => {
		setCurrentTime(audio.currentTime * 1000);
	};
	const onEnded = () => {
		dispatch(nextSong({ songs }));
	};
	const prettyDuration = prettyTime(song.duration);

	return (
		<>
			<div id="now-playing-time">
				<span id="now-playing-time-current">{prettyTime(currentTime, song.duration)}</span>
				/
				<span id="now-playing-time-total">{prettyDuration}</span>
			</div>
			<audio
				autoPlay
				onEnded={onEnded}
				onTimeUpdate={onTimeUpdate}
				ref={(element) => { setAudio(element); }}
				src={`http://localhost:2000/?path=${encodeURIComponent(song.path)}`}
			/>
		</>
	);
}
