import '../../scss/components/NowPlaying.scss';
import React from 'react';
import { selectCurrentSong } from '../slices/app';
import Time from './Time';
import { useSelector } from 'react-redux';

export default function NowPlaying() {
	const song = useSelector(selectCurrentSong);
	if (!song) {
		return null;
	}

	return (
		<>
			<div id="now-playing-placeholder">
				<img alt="" id="now-playing-img" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" />
			</div>
			<div id="now-playing-title">{song.title}</div>
			<div id="now-playing-artist">{song.artist}</div>
			<Time />
		</>
	);
}
