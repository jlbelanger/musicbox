import { selectShuffle, toggleShuffle } from '../../slices/app.js';
import { useDispatch, useSelector } from 'react-redux';
import ShuffleIcon from '../../../svg/shuffle.svg?react'; // eslint-disable-line import/no-unresolved
import Storage from '../../helpers/Storage.js';

export default function Shuffle() {
	const dispatch = useDispatch();
	const shuffle = useSelector(selectShuffle);
	const onClick = () => {
		dispatch(toggleShuffle({
			songs: window.musicboxTable.table.rowManager.activeRows.map((song) => song.data),
			sort: Storage.get('tabulator-table-sort'),
		}));
	};

	return (
		<button className={`icon${shuffle ? ' active' : ''}`} id="shuffle" onClick={onClick} title="Shuffle" type="button">
			<ShuffleIcon />
			Shuffle
		</button>
	);
}
