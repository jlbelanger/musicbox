import PropTypes from 'prop-types';
import React from 'react';

export default function Text({
	onChange,
	label,
	name,
	value,
	...otherProps
}) {
	const onInputChange = (e) => {
		onChange(e.target.name, e.target.value);
	};
	return (
		<div className="field">
			<div className="field--label-wrapper">
				<label className="field--label" htmlFor={name}>{label}</label>
			</div>
			<div className="field--input-wrapper">
				<input className="field--input" id={name} name={name} onChange={onInputChange} type="text" value={value} {...otherProps} />
			</div>
		</div>
	);
}

Text.propTypes = {
	onChange: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.any,
};

Text.defaultProps = {
	value: '',
};
