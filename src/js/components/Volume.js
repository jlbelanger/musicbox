import '../../scss/components/Volume.scss';
import React, { useState } from 'react';
import Range from './Range';
import Storage from '../helpers/Storage';
import { ReactComponent as VolumeHighIcon } from '../../svg/volume-high.svg';
import { ReactComponent as VolumeLowIcon } from '../../svg/volume-low.svg';
import { ReactComponent as VolumeOffIcon } from '../../svg/volume-off.svg';

export default function Volume() {
	const [volume, setVolume] = useState(Storage.get('volume', 1.0));
	const onChangeVolume = (e) => {
		const newVolume = parseFloat(e.target.value);
		window.audio.volume = newVolume;
		setVolume(newVolume);
		Storage.set('volume', newVolume);
	};
	let VolumeIcon = VolumeHighIcon;
	if (volume <= 0.0) {
		VolumeIcon = VolumeOffIcon;
	} else if (volume < 1.0) {
		VolumeIcon = VolumeLowIcon;
	}

	return (
		<section id="volume">
			<VolumeIcon id="volume-icon" />
			<Range id="volume-range" max={1} onChange={onChangeVolume} step={0.1} value={volume} />
		</section>
	);
}
