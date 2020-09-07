import '../../scss/components/Volume.scss';
import React, { useState } from 'react';
import Range from './Range';
import Storage from '../helpers/Storage';
import { ReactComponent as VolumeHighIcon } from '../../svg/volume-high.svg';
import { ReactComponent as VolumeLowIcon } from '../../svg/volume-low.svg';
import { ReactComponent as VolumeOffIcon } from '../../svg/volume-off.svg';

export default function Volume() {
	const [volume, setVolume] = useState(Storage.get('volume', 1.0));
	const [showVolume, setShowVolume] = useState(false);
	const onChange = (e) => {
		const newVolume = parseFloat(e.target.value);
		window.api.setVolume(newVolume);
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
