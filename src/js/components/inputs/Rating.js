import '../../../scss/components/inputs/Rating.scss';
import PropTypes from 'prop-types';
import React from 'react';
import { ReactComponent as StarIcon } from '../../../svg/star.svg';

export default function Rating({ onChange, value }) {
	const onClick = (e) => {
		if (e.target.value === value.toString()) {
			onChange('rating', 0);
		}
	};
	const onInputChange = (e) => {
		onChange('rating', e.target.value);
	};

	const max = 5;
	const stars = [];
	const num = parseInt(value, 10);
	let i;
	for (i = 1; i <= num; i += 1) {
		stars.push({ active: true, i });
	}
	for (i = num + 1; i <= max; i += 1) {
		stars.push({ active: false, i });
	}

	return (
		<>
			{stars.map((star) => (
				<div className={`rating ${star.active ? 'active' : 'dimmed'}`} key={star.i}>
					<StarIcon className="rating__svg" />
					<input className="rating__input" checked={num === star.i} onClick={onClick} onChange={onInputChange} name="rating" type="radio" value={star.i} />
				</div>
			))}
		</>
	);
}

Rating.propTypes = {
	onChange: PropTypes.func.isRequired,
	value: PropTypes.any,
};

Rating.defaultProps = {
	value: 0,
};
