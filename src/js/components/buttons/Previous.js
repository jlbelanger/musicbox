import { batch, useDispatch, useSelector } from 'react-redux';
import {
	decrementQueueIndex,
	selectCurrentQueueIndex,
	stopQueue,
} from '../../slices/queue';
import { ReactComponent as PreviousIcon } from '../../../svg/previous.svg';
import React from 'react';
import { selectSongs } from '../../slices/songs';
import { stopPlaying } from '../../slices/isPlaying';

export default function Previous() {
	const dispatch = useDispatch();
	const currentQueueIndex = useSelector(selectCurrentQueueIndex);
	const songs = useSelector(selectSongs);
	const onClick = () => {
		if (currentQueueIndex === null) {
			return;
		}
		if (currentQueueIndex <= 0) {
			batch(() => {
				dispatch(stopPlaying());
				dispatch(stopQueue({ songs }));
			});
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
