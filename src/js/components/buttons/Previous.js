import {
	selectCurrentSongIndex,
	selectNumSongs,
	selectShuffle,
	setCurrentSongIndex,
} from '../../appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as PreviousIcon } from '../../../svg/previous.svg';
import React from 'react';

export default function Previous() {
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
		} else if (currentSongIndex === 0) {
			newIndex = null;
		} else {
			newIndex = currentSongIndex - 1;
		}
		dispatch(setCurrentSongIndex(newIndex));
	};

	return (
		<button className="icon" disabled={currentSongIndex === null} id="previous" onClick={onClick} type="button">
			<PreviousIcon />
			Previous
		</button>
	);
}
