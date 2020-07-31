import '../../../scss/components/table/RatingCell.scss';
import PropTypes from 'prop-types';
import React from 'react';
import { setRating } from '../../slices/songs';
import { ReactComponent as StarIcon } from '../../../svg/star.svg';
import { useDispatch } from 'react-redux';

export default function RatingCell(props) {
	const max = 5;
	const num = props.value / 20;
	let i;
	const stars = [];

	const dispatch = useDispatch();
	const onClick = (e) => {
		if (e.target.value === (props.value / 20).toString()) {
			dispatch(setRating({ id: props.id, value: 0 }));
		}
	};
	const onChange = (e) => {
		const value = e.target.value * 20;
		dispatch(setRating({ id: props.id, value }));
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
						<input checked={num === star.i} onClick={onClick} onChange={onChange} name={`rating[${props.id}]`} type="radio" value={star.i} />
					</div>
				))}
			</div>
		</td>
	);
}

RatingCell.propTypes = {
	id: PropTypes.number.isRequired,
	value: PropTypes.any,
};

RatingCell.defaultProps = {
	value: 0,
};
