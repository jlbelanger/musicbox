import { addPlay, addSkip, updateSong } from '../../helpers/update';
import { nextSong, selectCurrentQueueIndex } from '../../slices/app';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as NextIcon } from '../../../svg/next.svg';
import React from 'react';
import scrobble from '../../helpers/lastfm';
import Storage from '../../helpers/Storage';

export default function Next() {
	const dispatch = useDispatch();
	const currentQueueIndex = useSelector(selectCurrentQueueIndex);
	const onClick = () => {
		const currentTime = parseFloat(document.getElementById('position-after').getAttribute('width'));
		const duration = parseFloat(document.getElementById('position-before').getAttribute('width'));
		const currentSongId = document.getElementById('now-playing').getAttribute('data-id');
		const date = new Date().toISOString().replace(/Z$/, '+0');
		const data = {};
		if (currentTime >= (duration * 0.75)) {
			data.lastPlayed = date;
			data.numPlays = window.songs[currentSongId].numPlays + 1;
			addPlay(currentSongId, date);
			scrobble(window.songs[currentSongId]);
		} else {
			data.lastSkipped = date;
			data.numSkips = window.songs[currentSongId].numSkips + 1;
			addSkip(currentSongId, date);
		}

		updateSong(currentSongId, data);

		dispatch(nextSong({
			songs: window.musicboxTable.table.rowManager.activeRows.map((song) => song.data),
			sort: Storage.get('tabulator-table-sort'),
		}));
	};

	return (
		<button className="icon" disabled={currentQueueIndex === null} id="next" onClick={onClick} title="Next" type="button">
			<NextIcon />
			Next
		</button>
	);
}
