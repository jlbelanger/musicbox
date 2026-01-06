import '../../../css/components/buttons/PlayPause.css';
import { selectIsPlaying, togglePlayback } from '../../slices/app.js';
import { useDispatch, useSelector } from 'react-redux';
import PauseIcon from '../../../svg/pause.svg?react'; // eslint-disable-line import/no-unresolved
import PlayIcon from '../../../svg/play.svg?react'; // eslint-disable-line import/no-unresolved

export default function PlayPause() {
	const dispatch = useDispatch();
	const isPlaying = useSelector(selectIsPlaying);
	const Icon = isPlaying ? PauseIcon : PlayIcon;
	const onClick = () => {
		dispatch(togglePlayback());
	};
	const label = isPlaying ? 'Pause' : 'Play';

	return (
		<button className="icon" id="play-pause" onClick={onClick} title={label} type="button">
			<Icon />
			{label}
		</button>
	);
}
