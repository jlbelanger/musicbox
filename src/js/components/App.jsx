import '../../css/components/Table.css';
import { selectEditSongId, selectSearch } from '../slices/app.js';
import Header from './Header.jsx';
import ImportModal from './modals/ImportModal.jsx';
import PropTypes from 'prop-types';
import SongModal from './modals/SongModal.jsx';
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
