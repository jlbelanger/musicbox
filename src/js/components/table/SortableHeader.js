import '../../../scss/components/table/SortableHeader.scss';
import {
	changeSort,
	selectSortColumn,
	selectSortDirection,
} from '../../slices/queue';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as ArrowIcon } from '../../../svg/arrow.svg';
import PropTypes from 'prop-types';
import React from 'react';
import { selectSongs } from '../../slices/songs';

export default function SortableHeader(props) {
	const dispatch = useDispatch();
	const column = useSelector(selectSortColumn);
	const direction = useSelector(selectSortDirection);
	const songs = useSelector(selectSongs);
	const isSorted = column === props.name;
	const onClick = () => {
		dispatch(changeSort({ sortColumn: props.name, songs }));
	};

	const className = ['sortable-header__button'];
	if (isSorted) {
		className.push(direction);
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
