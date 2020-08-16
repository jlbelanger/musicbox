import '../../scss/components/Time.scss';
import { prettyTime } from '../helpers/datetime';
import Range from './Range';
import React from 'react';
import { selectCurrentSong } from '../slices/app';
import { useSelector } from 'react-redux';

export default function Time() {
	const song = useSelector(selectCurrentSong);
	if (!song) {
		return null;
	}
	const prettyDuration = prettyTime(song.duration);
	const onSeek = (e) => {
		window.audio.currentTime = parseFloat(e.target.value) / 1000;
	};

	return (
		<div id="now-playing-time">
			<div id="now-playing-time-current">{prettyTime(window.audio.currentTime, song.duration)}</div>
			<Range id="position" max={song.duration} onChange={onSeek} step={1} value={window.audio.currentTime} />
			<div id="now-playing-time-total">{prettyDuration}</div>
		</div>
	);
}
