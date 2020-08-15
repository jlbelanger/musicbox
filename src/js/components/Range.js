import '../../scss/components/Range.scss';
import React from 'react';

export default function Range({ id, max, onChange, step, value }) {
	return (
		<div className="range" id={id}>
			<input className="range-input" max={max} onChange={onChange} type="range" step={step} />
			<svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${max} 1`} className="range-slider" preserveAspectRatio="none">
				<rect width={max} height="1" className="range-slider-before" />
				<rect width={value} height="1" className="range-slider-after" />
			</svg>
		</div>
	);
}
