import { selectColumn, selectDirection } from '../slices/sort';
import { selectHasQueue, setQueue } from '../slices/queue';
import { useDispatch, useSelector } from 'react-redux';
import createQueue from '../helpers/queue';
import Header from './Header';
import React from 'react';
import { selectActiveSongs } from '../slices/songs';
import { selectShuffle } from '../slices/shuffle';
import Table from './Table';

export default function Main() {
	const dispatch = useDispatch();
	const shuffle = useSelector(selectShuffle);
	const songs = useSelector(selectActiveSongs);
	const hasQueue = useSelector(selectHasQueue);
	const column = useSelector(selectColumn);
	const direction = useSelector(selectDirection);

	if (!hasQueue) {
		dispatch(setQueue(createQueue(songs, { shuffle, column, direction })));
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
