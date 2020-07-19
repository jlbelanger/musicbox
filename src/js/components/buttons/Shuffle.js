import { selectShuffle, toggleShuffle } from '../../appSlice';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { ReactComponent as ShuffleIcon } from '../../../svg/shuffle.svg';

export default function Shuffle() {
	const isActive = useSelector(selectShuffle);
	const dispatch = useDispatch();
	const onClick = () => {
		dispatch(toggleShuffle());
	};

	return (
		<button className={`icon icon--small${isActive ? ' active' : ''}`} id="shuffle" onClick={onClick} type="button">
			<ShuffleIcon />
			Shuffle
		</button>
	);
}
