import {
	decrementQueueIndex,
	selectCurrentQueueIndex,
	stopPlayback,
} from '../../slices/app';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as PreviousIcon } from '../../../svg/previous.svg';
import React from 'react';
import { selectSongs } from '../../slices/songs';

export default function Previous() {
	const dispatch = useDispatch();
	const currentQueueIndex = useSelector(selectCurrentQueueIndex);
	const songs = useSelector(selectSongs);
	const onClick = () => {
		if (currentQueueIndex === null) {
			return;
		}
		if (currentQueueIndex <= 0) {
			dispatch(stopPlayback({ songs }));
		} else {
			dispatch(decrementQueueIndex());
		}
	};

	return (
		<button className="icon" disabled={currentQueueIndex === null} onClick={onClick} type="button">
			<PreviousIcon />
			Previous
		</button>
	);
}
