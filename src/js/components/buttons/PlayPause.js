import { batch, useDispatch, useSelector } from 'react-redux';
import { selectIsPlaying, startPlaying, stopPlaying } from '../../slices/isPlaying';
import { ReactComponent as PauseIcon } from '../../../svg/pause.svg';
import { ReactComponent as PlayIcon } from '../../../svg/play.svg';
import React from 'react';
import { startQueue } from '../../slices/queue';

export default function PlayPause() {
	const dispatch = useDispatch();
	const isPlaying = useSelector(selectIsPlaying);
	const Icon = isPlaying ? PauseIcon : PlayIcon;
	const onClick = () => {
		if (isPlaying) {
			dispatch(stopPlaying());
		} else {
			batch(() => {
				dispatch(startPlaying());
				dispatch(startQueue());
			});
		}
	};

	return (
		<button className="icon icon--large" onClick={onClick} type="button">
			<Icon />
			{isPlaying ? 'Pause' : 'Play'}
		</button>
	);
}
