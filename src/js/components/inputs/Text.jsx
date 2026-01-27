import PropTypes from 'prop-types';

export default function Text({ onChange, name, type = 'text', value = '', ...otherProps }) {
	return (
		<input className="field__input" id={name} name={name} onChange={onChange} type={type} value={value || ''} {...otherProps} />
	);
}

Text.propTypes = {
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	type: PropTypes.string,
	value: PropTypes.any,
};
