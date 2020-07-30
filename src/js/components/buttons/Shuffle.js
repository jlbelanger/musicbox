import { selectShuffle, toggleShuffle } from '../../slices/queue';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { selectSongs } from '../../slices/songs';
import { ReactComponent as ShuffleIcon } from '../../../svg/shuffle.svg';

export default function Shuffle() {
	const dispatch = useDispatch();
	const shuffle = useSelector(selectShuffle);
	const songs = useSelector(selectSongs);
	const onClick = () => {
		dispatch(toggleShuffle({ songs }));
	};

	return (
		<button className={`icon icon--small${shuffle ? ' active' : ''}`} onClick={onClick} type="button">
			<ShuffleIcon />
			Shuffle
		</button>
	);
}
