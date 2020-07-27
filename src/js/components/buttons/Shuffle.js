import { batch, useDispatch, useSelector } from 'react-redux';
import { selectColumn, selectDirection } from '../../slices/sort';
import { selectShuffle, toggleShuffle } from '../../slices/shuffle';
import createQueue from '../../helpers/queue';
import React from 'react';
import { selectSongs } from '../../slices/songs';
import { setQueue } from '../../slices/queue';
import { ReactComponent as ShuffleIcon } from '../../../svg/shuffle.svg';

export default function Shuffle() {
	const dispatch = useDispatch();
	const shuffle = useSelector(selectShuffle);
	const songs = useSelector(selectSongs);
	const column = useSelector(selectColumn);
	const direction = useSelector(selectDirection);
	const onClick = () => {
		batch(() => {
			dispatch(toggleShuffle());
			// TODO: This is using the old shuffle value.
			dispatch(setQueue({
				queue: createQueue(songs, { shuffle, column, direction }),
				shuffle,
				songs,
				column,
				direction,
			}));
		});
	};

	return (
		<button className={`icon icon--small${shuffle ? ' active' : ''}`} onClick={onClick} type="button">
			<ShuffleIcon />
			Shuffle
		</button>
	);
}
