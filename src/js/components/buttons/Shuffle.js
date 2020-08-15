import { selectShuffle, toggleShuffle } from '../../slices/app';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { ReactComponent as ShuffleIcon } from '../../../svg/shuffle.svg';
import Storage from '../../helpers/Storage';

export default function Shuffle() {
	const dispatch = useDispatch();
	const shuffle = useSelector(selectShuffle);
	const onClick = () => {
		dispatch(toggleShuffle({
			songs: window.songs,
			sort: Storage.get('tabulator--sort'),
		}));
	};

	return (
		<button className={`icon icon--small${shuffle ? ' active' : ''}`} onClick={onClick} type="button">
			<ShuffleIcon />
			Shuffle
		</button>
	);
}
