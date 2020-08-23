import { nextSong, selectCurrentQueueIndex } from '../../slices/app';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as NextIcon } from '../../../svg/next.svg';
import React from 'react';
import Storage from '../../helpers/Storage';

export default function Next() {
	const dispatch = useDispatch();
	const currentQueueIndex = useSelector(selectCurrentQueueIndex);
	const onClick = () => {
		const currentTime = parseFloat(document.getElementById('position-after').getAttribute('width'));
		const duration = parseFloat(document.getElementById('position-before').getAttribute('width'));
		const date = new Date().toISOString();
		let key;
		if (currentTime >= (duration * 0.75)) {
			key = 'plays';
		} else {
			key = 'skips';
		}
		const value = Storage.get(key, {});
		value[date] = document.getElementById('now-playing').getAttribute('data-id');
		Storage.set(key, value);

		dispatch(nextSong({
			songs: window.songs,
			sort: Storage.get('tabulator-table-sort'),
		}));
	};

	return (
		<button className="icon" disabled={currentQueueIndex === null} id="next" onClick={onClick} type="button">
			<NextIcon />
			Next
		</button>
	);
}
