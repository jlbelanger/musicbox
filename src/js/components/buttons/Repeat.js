import { selectRepeat, toggleRepeat } from '../../slices/repeat';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { ReactComponent as RepeatIcon } from '../../../svg/repeat.svg';

export default function Repeat() {
	const dispatch = useDispatch();
	const isActive = useSelector(selectRepeat);
	const onClick = () => {
		dispatch(toggleRepeat());
	};

	return (
		<button className={`icon icon--small${isActive ? ' active' : ''}`} onClick={onClick} type="button">
			<RepeatIcon />
			Repeat
		</button>
	);
}
