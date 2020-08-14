import React from 'react';
import { selectUpcomingSongs } from '../slices/app';
import { useSelector } from 'react-redux';

export default function Queue() {
	const songs = useSelector(selectUpcomingSongs);

	return (
		<section id="queue">
			<ol style={{ margin: 0, padding: 0 }}>
				{songs.map((song) => (
					<li key={song.id}>{song.title}</li>
				))}
			</ol>
		</section>
	);
}
