import '../../scss/components/Time.scss';
import Range from './Range';
import React from 'react';

export default function Time() {
	const onSeek = (e) => {
		window.musicbox.setTime(parseFloat(e.target.value) / 1000);
	};

	return (
		<div id="now-playing-time">
			<div id="now-playing-time-current" />
			<Range id="position" onChange={onSeek} step={1} value={0} />
			<div id="now-playing-time-total" />
		</div>
	);
}
