import {
	selectCurrentIndex,
	selectNumSongs,
	selectShuffle,
	setCurrentIndex,
} from '../../appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as PreviousIcon } from '../../../svg/previous.svg';
import React from 'react';

export default function Previous() {
	const currentIndex = useSelector(selectCurrentIndex);
	const numSongs = useSelector(selectNumSongs);
	const shuffle = useSelector(selectShuffle);
	const dispatch = useDispatch();
	const onClick = () => {
		let newIndex;
		if (shuffle) {
			// TODO: Should come from a queue.
			newIndex = Math.floor(Math.random() * numSongs);
		} else if (currentIndex === null) {
			newIndex = 0;
		} else if (currentIndex === 0) {
			newIndex = null;
		} else {
			newIndex = currentIndex - 1;
		}
		dispatch(setCurrentIndex(newIndex));
	};

	return (
		<button className="icon" disabled={currentIndex === null} id="previous" onClick={onClick} type="button">
			<PreviousIcon />
			Previous
		</button>
	);
}
