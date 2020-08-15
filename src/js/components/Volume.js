import '../../scss/components/Volume.scss';
import PropTypes from 'prop-types';
import Range from './Range';
import React from 'react';
import Storage from '../helpers/Storage';
import { ReactComponent as VolumeHighIcon } from '../../svg/volume-high.svg';
import { ReactComponent as VolumeLowIcon } from '../../svg/volume-low.svg';
import { ReactComponent as VolumeOffIcon } from '../../svg/volume-off.svg';

export default function NowPlaying({ audio, setVolume, volume }) {
	if (!audio) {
		return null;
	}
	const onChangeVolume = (e) => {
		const newVolume = parseFloat(e.target.value);
		audio.volume = newVolume;
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
		<div id="volume">
			<VolumeIcon height="16" id="volume-icon" width="16" />
			<Range id="volume-input" max={1} step={0.1} onChange={onChangeVolume} value={volume} />
		</div>
	);
}

NowPlaying.propTypes = {
	audio: PropTypes.object,
	setVolume: PropTypes.func.isRequired,
	volume: PropTypes.number.isRequired,
};

NowPlaying.defaultProps = {
	audio: null,
};
