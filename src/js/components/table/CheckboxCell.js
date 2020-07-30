import PropTypes from 'prop-types';
import React from 'react';
import { toggleChecked } from '../../slices/songs';
import { useDispatch } from 'react-redux';

export default function CheckboxCell(props) {
	const dispatch = useDispatch();
	const onChange = () => {
		dispatch(toggleChecked({ id: props.id }));
		// TODO: Add-to/remove-from queue.
	};

	return (
		<td><input checked={props.value} onChange={onChange} type="checkbox" /></td>
	);
}

CheckboxCell.propTypes = {
	id: PropTypes.string.isRequired,
	value: PropTypes.bool,
};

CheckboxCell.defaultProps = {
	value: false,
};
