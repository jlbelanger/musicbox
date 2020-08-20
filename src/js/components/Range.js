import '../../scss/components/Range.scss';
import PropTypes from 'prop-types';
import React from 'react';

export default function Range({
	id,
	max,
	onChange,
	step,
	value,
}) {
	return (
		<div className="range" id={id}>
			<input className="range-input" id={`${id}-input`} max={max} onChange={onChange} type="range" step={step} />
			<svg xmlns="http://www.w3.org/2000/svg" className="range-slider" id={`${id}-svg`} preserveAspectRatio="none" viewBox={`0 0 ${max} 1`}>
				<rect width={max} height="1" className="range-slider-before" id={`${id}-before`} />
				<rect width={value} height="1" className="range-slider-after" id={`${id}-after`} />
			</svg>
		</div>
	);
}

Range.propTypes = {
	id: PropTypes.string.isRequired,
	max: PropTypes.number,
	onChange: PropTypes.func.isRequired,
	step: PropTypes.number,
	value: PropTypes.number.isRequired,
};

Range.defaultProps = {
	max: 0,
	step: 1,
};
