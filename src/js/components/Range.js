import '../../scss/components/Range.scss';
import PropTypes from 'prop-types';
import React from 'react';

export default function Range({
	direction = 'horizontal',
	id,
	max = 0,
	onChange,
	step = 1,
	value,
}) {
	const horizontal = direction === 'horizontal';
	return (
		<div className={`range ${direction}`} id={id}>
			<input className="range-input" id={`${id}-input`} max={max} onChange={onChange} type="range" step={step} />
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="range-slider"
				id={`${id}-svg`}
				preserveAspectRatio="none"
				viewBox={`0 0 ${horizontal ? max : 1} ${horizontal ? 1 : max} `}
			>
				<rect width={horizontal ? max : 1} height={horizontal ? 1 : max} className="range-slider-before" id={`${id}-before`} />
				<rect width={horizontal ? value : 1} height={horizontal ? 1 : value} className="range-slider-after" id={`${id}-after`} />
			</svg>
		</div>
	);
}

Range.propTypes = {
	direction: PropTypes.string,
	id: PropTypes.string.isRequired,
	max: PropTypes.number,
	onChange: PropTypes.func.isRequired,
	step: PropTypes.number,
	value: PropTypes.number.isRequired,
};
