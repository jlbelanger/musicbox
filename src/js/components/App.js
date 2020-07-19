import Header from './Header';
import ImportModal from './modals/ImportModal';
import React from 'react';
import { selectNumSongs } from '../appSlice';
import Table from './Table';
import { useSelector } from 'react-redux';

export default function App() {
	const numSongs = useSelector(selectNumSongs);
	if (numSongs <= 0) {
		return <ImportModal />;
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
