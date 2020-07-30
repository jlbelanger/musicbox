import {
	incrementQueueIndex,
	selectCurrentQueueIndex,
	stopPlayback,
} from '../../slices/app';
import { useDispatch, useSelector } from 'react-redux';
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
			dispatch(stopPlayback({ songs }));
		}
	};

	return (
		<button className="icon" disabled={currentQueueIndex === null} onClick={onClick} type="button">
			<NextIcon />
			Next
		</button>
	);
}
