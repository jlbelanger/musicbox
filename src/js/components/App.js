import '../../scss/components/Table.scss';
import Header from './Header';
import ImportModal from './modals/ImportModal';
import PropTypes from 'prop-types';
import React from 'react';
import { selectEditSongId } from '../slices/app';
import SongModal from './modals/SongModal';
import { useSelector } from 'react-redux';

export default function App({ hasJson }) {
	const editSongId = useSelector(selectEditSongId);

	return (
		<main>
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
