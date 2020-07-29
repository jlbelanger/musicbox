import { selectHasQueue, setQueue } from '../slices/queue';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import React from 'react';
import { selectSongs } from '../slices/songs';
import Table from './Table';

export default function Main() {
	const dispatch = useDispatch();
	const songs = useSelector(selectSongs);
	const hasQueue = useSelector(selectHasQueue);

	if (!hasQueue) {
		dispatch(setQueue(songs));
	}

	return (
		<main>
			<Header />
			<article>
				<Table />
			</article>
		</main>
	);
}
