import { nextSong, selectCurrentQueueIndex } from '../../slices/app';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as NextIcon } from '../../../svg/next.svg';
import React from 'react';
import Storage from '../../helpers/Storage';
import update from '../../helpers/update';

export default function Next() {
	const dispatch = useDispatch();
	const currentQueueIndex = useSelector(selectCurrentQueueIndex);
	const onClick = () => {
		const currentTime = parseFloat(document.getElementById('position-after').getAttribute('width'));
		const duration = parseFloat(document.getElementById('position-before').getAttribute('width'));
		const currentSongId = document.getElementById('now-playing').getAttribute('data-id');
		const date = new Date().toISOString();
		let key;
		let data = {};
		if (currentTime >= (duration * 0.75)) {
			key = 'plays';
			data.lastPlayed = new Date().toISOString();
			data.numPlays = window.songs[currentSongId].numPlays + 1;
		} else {
			key = 'skips';
			data.lastSkipped = new Date().toISOString();
			data.numSkips = window.songs[currentSongId].numSkips + 1;
		}

		// Add to play/skip list.
		const value = Storage.get(key, {});
		value[date] = currentSongId;
		Storage.set(key, value);

		update(currentSongId, data);

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
