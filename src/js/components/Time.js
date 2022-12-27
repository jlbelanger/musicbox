import '../../scss/components/Time.scss';
import React, { useEffect } from 'react';
import Range from './Range';

export default function Time() {
	const onChange = (e) => {
		window.audio.setTime(parseFloat(e.target.value) / 1000);
	};

	const onPositionKeyup = (e) => {
		if (e.key === ' ' || e.key === 'Enter') {
			document.getElementById('play-pause').click();
		}
	};

	useEffect(() => {
		const input = document.getElementById('position-input');
		input.addEventListener('keyup', onPositionKeyup, true);

		return () => {
			input.removeEventListener('keyup', onPositionKeyup, true);
		};
	}, []);

	return (
		<div id="now-playing-time">
			<div id="now-playing-time-current" />
			<Range id="position" onChange={onChange} step={1000} value={0} />
			<div id="now-playing-time-total" />
		</div>
	);
}
