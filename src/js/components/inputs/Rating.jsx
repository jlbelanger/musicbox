import '../../../css/components/inputs/Rating.css';
import PropTypes from 'prop-types';
import StarIcon from '../../../svg/star.svg?react'; // eslint-disable-line import/no-unresolved

export default function Rating({ onChange, value = 0 }) {
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
					<input
						checked={num === star.i}
						className="rating__input"
						name="rating"
						onChange={onInputChange}
						onClick={onClick}
						type="radio"
						value={star.i}
					/>
				</div>
			))}
		</>
	);
}

Rating.propTypes = {
	onChange: PropTypes.func.isRequired,
	value: PropTypes.any,
};
