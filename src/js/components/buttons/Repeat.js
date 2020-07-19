import { selectRepeat, toggleRepeat } from '../../appSlice';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { ReactComponent as RepeatIcon } from '../../../svg/repeat.svg';

export default function Repeat() {
	const isActive = useSelector(selectRepeat);
	const dispatch = useDispatch();
	const onClick = () => {
		dispatch(toggleRepeat());
	};

	return (
		<button className={`icon icon--small${isActive ? ' active' : ''}`} id="repeat" onClick={onClick} type="button">
			<RepeatIcon />
			Repeat
		</button>
	);
}
