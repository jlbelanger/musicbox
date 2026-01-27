import '../../css/components/Volume.css';
import Range from './Range.jsx';
import Storage from '../helpers/Storage.js';
import { useState } from 'react';
import VolumeHighIcon from '../../svg/volume-high.svg?react'; // eslint-disable-line import/no-unresolved
import VolumeLowIcon from '../../svg/volume-low.svg?react'; // eslint-disable-line import/no-unresolved
import VolumeOffIcon from '../../svg/volume-off.svg?react'; // eslint-disable-line import/no-unresolved

export default function Volume() {
	const [volume, setVolume] = useState(Storage.get('volume', 1.0));
	const [showVolume, setShowVolume] = useState(false);
	const onChange = (e) => {
		const newVolume = parseFloat(e.target.value);
		window.audio.setVolume(newVolume);
		setVolume(newVolume);
		Storage.set('volume', newVolume);
	};
	const onClick = () => {
		setShowVolume(!showVolume);
	};
	let VolumeIcon = VolumeHighIcon;
	if (volume <= 0.0) {
		VolumeIcon = VolumeOffIcon;
	} else if (volume < 1.0) {
		VolumeIcon = VolumeLowIcon;
	}

	return (
		<section className={showVolume ? 'open' : null} id="volume">
			<button className="icon" id="toggle-volume" onClick={onClick} tabIndex="-1" title="Toggle volume" type="button">
				<VolumeIcon id="volume-icon" />
			</button>
			<Range direction="vertical" id="volume-range" max={1} onChange={onChange} step={0.1} value={volume} />
		</section>
	);
}
