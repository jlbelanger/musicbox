import { batch, useDispatch, useSelector } from 'react-redux';
import {
	incrementQueueIndex,
	selectCurrentQueueIndex,
	selectShuffle,
	selectSortColumn,
	selectSortDirection,
	stopQueue,
} from '../../slices/queue';
import { selectNumActiveSongs, selectSongs } from '../../slices/songs';
import createQueue from '../../helpers/queue';
import { ReactComponent as NextIcon } from '../../../svg/next.svg';
import React from 'react';
import { stopPlaying } from '../../slices/isPlaying';

export default function Next() {
	const dispatch = useDispatch();
	const currentQueueIndex = useSelector(selectCurrentQueueIndex);
	const numSongs = useSelector(selectNumActiveSongs);
	const songs = useSelector(selectSongs);
	const column = useSelector(selectSortColumn);
	const direction = useSelector(selectSortDirection);
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
