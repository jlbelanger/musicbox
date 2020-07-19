import '../../../scss/components/table/SortableHeader.scss';
import {
	selectSortColumn,
	selectSortDirection,
	setSortColumn,
	toggleSortDirection,
} from '../../appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as ArrowIcon } from '../../../svg/arrow.svg';
import PropTypes from 'prop-types';
import React from 'react';

export default function SortableHeader(props) {
	const sortColumn = useSelector(selectSortColumn);
	const sortDirection = useSelector(selectSortDirection);
	const isSorted = sortColumn === props.name;
	const dispatch = useDispatch();
	const onClick = () => {
		if (isSorted) {
			dispatch(toggleSortDirection());
		} else {
			dispatch(setSortColumn(props.name));
		}
	};

	const className = ['sortable-header__button'];
	if (isSorted) {
		className.push(sortDirection);
	}

	return (
		<th scope="col">
			<button className={className.join(' ')} onClick={onClick} type="button">
				{props.label}
				{isSorted ? <ArrowIcon height="16" width="16" /> : null}
			</button>
		</th>
	);
}

SortableHeader.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
};
