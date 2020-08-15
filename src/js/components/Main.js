import { populateQueue, selectHasQueue } from '../slices/app';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import React from 'react';
import Storage from '../helpers/Storage';
import Table from './Table';

export default function Main() {
	const dispatch = useDispatch();
	const hasQueue = useSelector(selectHasQueue);

	if (!hasQueue) {
		dispatch(populateQueue({
			songs: window.songs,
			sort: Storage.get('tabulator--sort'),
		}));
		return null;
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
