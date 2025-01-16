import PropTypes from 'prop-types';
import React from 'react';

export default function Text({
	onChange,
	name,
	type = 'text',
	value = '',
	...otherProps
}) {
	return (
		<input className="field__input" id={name} name={name} onChange={onChange} type={type} value={value || ''} {...otherProps} />
	);
}

Text.propTypes = {
	onChange: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string,
	value: PropTypes.any,
};
