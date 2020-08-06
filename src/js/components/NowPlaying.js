import { prettyTime } from '../helpers/datetime';
import React from 'react';
import { selectCurrentSong } from '../slices/app';
import { useSelector } from 'react-redux';

export default function NowPlaying() {
	const song = useSelector(selectCurrentSong);
	if (!song) {
		return null;
	}

	return (
		<section>
			<div id="now-playing-title">{song.title}</div>
			<div id="now-playing-artist">{song.artist}</div>
			<div id="now-playing-duration">{prettyTime(song.duration)}</div>
		</section>
	);
}
