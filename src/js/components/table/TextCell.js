import PropTypes from 'prop-types';
import React from 'react';

export default function TextCell(props) {
	return (
		<td>{props.value}</td>
	);
}

TextCell.propTypes = {
	value: PropTypes.any,
};

TextCell.defaultProps = {
	value: '',
};
