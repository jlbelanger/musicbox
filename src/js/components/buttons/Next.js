import { batch, useDispatch, useSelector } from 'react-redux';
import {
	incrementQueueIndex,
	selectCurrentQueueIndex,
	stopQueue,
} from '../../slices/queue';
import { selectActiveSongs, selectNumSongs } from '../../slices/songs';
import { selectColumn, selectDirection } from '../../slices/sort';
import createQueue from '../../helpers/queue';
import { ReactComponent as NextIcon } from '../../../svg/next.svg';
import React from 'react';
import { selectShuffle } from '../../slices/shuffle';
import { stopPlaying } from '../../slices/isPlaying';

export default function Next() {
	const dispatch = useDispatch();
	const currentQueueIndex = useSelector(selectCurrentQueueIndex);
	const numSongs = useSelector(selectNumSongs);
	const songs = useSelector(selectActiveSongs);
	const column = useSelector(selectColumn);
	const direction = useSelector(selectDirection);
	const shuffle = useSelector(selectShuffle);
	const onClick = () => {
		if (currentQueueIndex === null) {
			return;
		}
		if (currentQueueIndex < (numSongs - 1)) {
			dispatch(incrementQueueIndex());
		} else {
			batch(() => {
				dispatch(stopPlaying());
				dispatch(stopQueue(createQueue(songs, { shuffle, column, direction })));
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
