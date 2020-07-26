import React from 'react';
import { selectCurrentSong } from '../slices/queue';
import { useSelector } from 'react-redux';

export default function NowPlaying() {
	const song = useSelector(selectCurrentSong);
	if (!song) {
		return null;
	}

	return (
		<section>
			<div>{song.title}</div>
			<div>{song.artist}</div>
		</section>
	);
}
