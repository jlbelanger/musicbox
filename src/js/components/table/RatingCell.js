import '../../../scss/components/table/RatingCell.scss';
import PropTypes from 'prop-types';
import React from 'react';
import { setSongRating } from '../../appSlice';
import { ReactComponent as StarIcon } from '../../../svg/star.svg';
import { useDispatch } from 'react-redux';

export default function RatingCell(props) {
	const max = 5;
	const num = props.value / 20;
	let i;
	const stars = [];

	const dispatch = useDispatch();
	const onChange = (e) => {
		const value = e.target.value * 20;
		dispatch(setSongRating({ index: props.index, value }));
	};

	for (i = 1; i <= num; i += 1) {
		stars.push({ active: true, i });
	}
	for (i = num + 1; i <= max; i += 1) {
		stars.push({ active: false, i });
	}

	return (
		<td>
			<div className="rating-cell">
				{stars.map((star) => (
					<div className={`rating ${star.active ? ' active' : ' dimmed'}`} key={star.i}>
						<StarIcon />
						<input checked={num === star.i} onChange={onChange} name={`rating[${props.index}]`} type="radio" value={star.i} />
					</div>
				))}
			</div>
		</td>
	);
}

RatingCell.propTypes = {
	index: PropTypes.number.isRequired,
	value: PropTypes.any,
};

RatingCell.defaultProps = {
	value: 0,
};
