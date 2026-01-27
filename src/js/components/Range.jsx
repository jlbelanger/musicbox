import '../../css/components/Range.css';
import PropTypes from 'prop-types';

export default function Range({ direction = 'horizontal', id, max = 0, onChange, step = 1, value }) {
	const horizontal = direction === 'horizontal';
	return (
		<div className={`range ${direction}`} id={id}>
			<input className="range-input" id={`${id}-input`} max={max} onChange={onChange} step={step} type="range" />
			<svg
				className="range-slider"
				id={`${id}-svg`}
				preserveAspectRatio="none"
				viewBox={`0 0 ${horizontal ? max : 1} ${horizontal ? 1 : max} `}
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect className="range-slider-before" height={horizontal ? 1 : max} id={`${id}-before`} width={horizontal ? max : 1} />
				<rect className="range-slider-after" height={horizontal ? 1 : value} id={`${id}-after`} width={horizontal ? value : 1} />
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
