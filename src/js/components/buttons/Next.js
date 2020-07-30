import { batch, useDispatch, useSelector } from 'react-redux';
import {
	incrementQueueIndex,
	selectCurrentQueueIndex,
	stopPlaying,
	stopQueue,
} from '../../slices/app';
import { selectNumActiveSongs, selectSongs } from '../../slices/songs';
import { ReactComponent as NextIcon } from '../../../svg/next.svg';
import React from 'react';

export default function Next() {
	const dispatch = useDispatch();
	const currentQueueIndex = useSelector(selectCurrentQueueIndex);
	const numSongs = useSelector(selectNumActiveSongs);
	const songs = useSelector(selectSongs);
	const onClick = () => {
		if (currentQueueIndex === null) {
			return;
		}
		if (currentQueueIndex < (numSongs - 1)) {
			dispatch(incrementQueueIndex());
		} else {
			batch(() => {
				dispatch(stopPlaying());
				dispatch(stopQueue({ songs }));
			});
		}
	};

	return (
		<button className="icon" disabled={currentQueueIndex === null} onClick={onClick} type="button">
			<NextIcon />
			Next
		</button>
	);
}
