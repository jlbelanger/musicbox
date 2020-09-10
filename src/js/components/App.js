import '../../scss/components/Table.scss';
import Header from './Header';
import ImportModal from './modals/ImportModal';
import React from 'react';
import { selectEditSongId } from '../slices/app';
import SongModal from './modals/SongModal';
import { useSelector } from 'react-redux';

export default function App() {
	const editSongId = useSelector(selectEditSongId);

	return (
		<main>
			{window.api.hasJson() ? null : <ImportModal />}
			<Header />
			<article id="table" />
			{editSongId ? <SongModal id={editSongId} /> : null}
		</main>
	);
}
