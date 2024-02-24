import '../../scss/components/Table.scss';
import { selectEditSongId, selectSearch } from '../slices/app';
import Header from './Header';
import ImportModal from './modals/ImportModal';
import PropTypes from 'prop-types';
import React from 'react';
import SongModal from './modals/SongModal';
import { useSelector } from 'react-redux';

export default function App({ hasJson }) {
	const search = useSelector(selectSearch);
	const editSongId = useSelector(selectEditSongId);

	return (
		<main className={search ? '' : 'hide-search'}>
			{hasJson ? null : <ImportModal />}
			<Header />
			<article id="table" />
			{editSongId ? <SongModal /> : null}
		</main>
	);
}

App.propTypes = {
	hasJson: PropTypes.bool.isRequired,
};
