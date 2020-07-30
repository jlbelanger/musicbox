import {
	pausePlayback,
	selectIsPlaying,
	startPlayback,
} from '../../slices/app';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as PauseIcon } from '../../../svg/pause.svg';
import { ReactComponent as PlayIcon } from '../../../svg/play.svg';
import React from 'react';

export default function PlayPause() {
	const dispatch = useDispatch();
	const isPlaying = useSelector(selectIsPlaying);
	const Icon = isPlaying ? PauseIcon : PlayIcon;
	const onClick = () => {
		if (isPlaying) {
			dispatch(pausePlayback());
		} else {
			dispatch(startPlayback());
		}
	};

	return (
		<button className="icon icon--large" onClick={onClick} type="button">
			<Icon />
			{isPlaying ? 'Pause' : 'Play'}
		</button>
	);
}
