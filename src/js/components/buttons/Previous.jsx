import { previousSong, selectCurrentQueueIndex } from '../../slices/app.js';
import { useDispatch, useSelector } from 'react-redux';
import PreviousIcon from '../../../svg/previous.svg?react'; // eslint-disable-line import/no-unresolved
import Storage from '../../helpers/Storage.js';

export default function Previous() {
	const dispatch = useDispatch();
	const currentQueueIndex = useSelector(selectCurrentQueueIndex);
	const onClick = () => {
		if (window.audio.getTime() >= 5) {
			window.audio.setTime(0);
		} else {
			dispatch(previousSong({
				songs: window.musicboxTable.table.rowManager.activeRows.map((song) => song.data),
				sort: Storage.get('tabulator-table-sort'),
			}));
		}
	};

	return (
		<button className="icon" disabled={currentQueueIndex === null} id="previous" onClick={onClick} title="Previous" type="button">
			<PreviousIcon />
			Previous
		</button>
	);
}
