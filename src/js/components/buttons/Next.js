import {
	selectCurrentQueueIndex,
	selectNumSongs,
	setCurrentQueueIndex,
} from '../../appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as NextIcon } from '../../../svg/next.svg';
import React from 'react';

export default function Next() {
	const currentQueueIndex = useSelector(selectCurrentQueueIndex);
	const numSongs = useSelector(selectNumSongs);
	const dispatch = useDispatch();
	const onClick = () => {
		let newIndex;
		if (currentQueueIndex === null) {
			// This should never happen.
			return;
		}
		if (currentQueueIndex < (numSongs - 1)) {
			newIndex = currentQueueIndex + 1;
		} else {
			newIndex = null;
		}
		dispatch(setCurrentQueueIndex(newIndex));
	};

	return (
		<button className="icon" disabled={currentQueueIndex === null} id="next" onClick={onClick} type="button">
			<NextIcon />
			Next
		</button>
	);
}
