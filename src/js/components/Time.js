import '../../scss/components/Time.scss';
import Range from './Range';
import React from 'react';

export default function Time() {
	const onChange = (e) => {
		window.api.setTime(parseFloat(e.target.value) / 1000);
	};

	return (
		<div id="now-playing-time">
			<div id="now-playing-time-current" />
			<Range id="position" onChange={onChange} step={1000} value={0} />
			<div id="now-playing-time-total" />
		</div>
	);
}
