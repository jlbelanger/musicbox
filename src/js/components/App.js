import '../../scss/components/Table.scss';
import { populateQueue, selectHasQueue } from '../slices/app';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import ImportModal from './modals/ImportModal';
import React from 'react';
import Storage from '../helpers/Storage';

export default function App() {
	const dispatch = useDispatch();
	const hasQueue = useSelector(selectHasQueue);

	if (!hasQueue) {
		dispatch(populateQueue({
			songs: window.songs,
			sort: Storage.get('tabulator--sort'),
		}));
	}

	return (
		<main>
			{window.api.hasJson() ? null : <ImportModal showClose={false} />}
			<Header />
			<article id="table" />
		</main>
	);
}
