import { previousSong, selectCurrentQueueIndex } from '../../slices/app';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as PreviousIcon } from '../../../svg/previous.svg';
import React from 'react';
import Storage from '../../helpers/Storage';

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
