import {
	selectCurrentQueueIndex,
	setCurrentQueueIndex,
} from '../../appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as PreviousIcon } from '../../../svg/previous.svg';
import React from 'react';

export default function Previous() {
	const currentQueueIndex = useSelector(selectCurrentQueueIndex);
	const dispatch = useDispatch();
	const onClick = () => {
		let newIndex;
		if (currentQueueIndex === null) {
			// This should never happen.
			return;
		}
		if (currentQueueIndex <= 0) {
			newIndex = null;
		} else {
			newIndex = currentQueueIndex - 1;
		}
		dispatch(setCurrentQueueIndex(newIndex));
	};

	return (
		<button className="icon" disabled={currentQueueIndex === null} id="previous" onClick={onClick} type="button">
			<PreviousIcon />
			Previous
		</button>
	);
}
