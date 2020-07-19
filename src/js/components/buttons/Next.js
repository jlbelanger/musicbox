import {
	selectCurrentIndex,
	selectNumSongs,
	selectShuffle,
	setCurrentIndex,
} from '../../appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as NextIcon } from '../../../svg/next.svg';
import React from 'react';

export default function Next() {
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
		} else if (currentIndex < (numSongs - 1)) {
			newIndex = currentIndex + 1;
		} else {
			newIndex = null;
		}
		dispatch(setCurrentIndex(newIndex));
	};

	return (
		<button className="icon" disabled={currentIndex === null} id="next" onClick={onClick} type="button">
			<NextIcon />
			Next
		</button>
	);
}
