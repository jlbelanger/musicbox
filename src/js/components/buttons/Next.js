import {
	selectCurrentSongIndex,
	selectNumSongs,
	selectShuffle,
	setCurrentSongIndex,
} from '../../appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as NextIcon } from '../../../svg/next.svg';
import React from 'react';

export default function Next() {
	const currentSongIndex = useSelector(selectCurrentSongIndex);
	const numSongs = useSelector(selectNumSongs);
	const shuffle = useSelector(selectShuffle);
	const dispatch = useDispatch();
	const onClick = () => {
		let newIndex;
		if (shuffle) {
			// TODO: Should come from a queue.
			newIndex = Math.floor(Math.random() * numSongs);
		} else if (currentSongIndex === null) {
			newIndex = 0;
		} else if (currentSongIndex < (numSongs - 1)) {
			newIndex = currentSongIndex + 1;
		} else {
			newIndex = null;
		}
		dispatch(setCurrentSongIndex(newIndex));
	};

	return (
		<button className="icon" disabled={currentSongIndex === null} id="next" onClick={onClick} type="button">
			<NextIcon />
			Next
		</button>
	);
}
