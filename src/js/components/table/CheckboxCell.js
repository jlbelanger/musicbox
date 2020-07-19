import PropTypes from 'prop-types';
import React from 'react';
import { toggleSongChecked } from '../../appSlice';
import { useDispatch } from 'react-redux';

export default function CheckboxCell(props) {
	const dispatch = useDispatch();
	const onChange = () => {
		dispatch(toggleSongChecked(props.index));
	};

	return (
		<td><input checked={props.value} onChange={onChange} type="checkbox" /></td>
	);
}

CheckboxCell.propTypes = {
	index: PropTypes.number.isRequired,
	value: PropTypes.bool,
};

CheckboxCell.defaultProps = {
	value: false,
};
