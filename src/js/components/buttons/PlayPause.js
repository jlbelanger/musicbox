import {
	selectIsPlaying,
	toggleIsPlaying,
} from '../../appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as PauseIcon } from '../../../svg/pause.svg';
import { ReactComponent as PlayIcon } from '../../../svg/play.svg';
import React from 'react';

export default function PlayPause() {
	const isPlaying = useSelector(selectIsPlaying);
	const dispatch = useDispatch();
	const Icon = isPlaying ? PauseIcon : PlayIcon;
	const onClick = () => {
		dispatch(toggleIsPlaying());
	};

	return (
		<button className={`icon icon--large icon--${isPlaying ? 'pause' : 'play'}`} id="play-pause" onClick={onClick} type="button">
			<Icon />
			{isPlaying ? 'Pause' : 'Play'}
		</button>
	);
}
