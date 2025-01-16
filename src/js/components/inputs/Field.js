import PropTypes from 'prop-types';
import Rating from './Rating';
import React from 'react';
import Text from './Text';

export default function Field({
	children = null,
	onChange,
	label,
	name,
	type = 'text',
	value = '',
	...otherProps
}) {
	const onInputChange = (e) => {
		onChange(e.target.name, e.target.value);
	};

	let input;
	if (type === 'rating') {
		input = (
			<Rating onChange={onChange} value={value} />
		);
	} else {
		input = (
			<Text name={name} onChange={onInputChange} type={type} value={value || ''} {...otherProps} />
		);
	}

	return (
		<div className="field">
			<div className="field__label-wrapper">
				<label className="field__label" htmlFor={name}>{label}</label>
			</div>
			<div className="field__input-wrapper" id={`field__input-wrapper--${name}`}>
				{children || input}
			</div>
		</div>
	);
}

Field.propTypes = {
	children: PropTypes.node,
	onChange: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string,
	value: PropTypes.any,
};
