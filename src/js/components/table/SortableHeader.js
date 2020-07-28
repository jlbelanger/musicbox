import '../../../scss/components/table/SortableHeader.scss';
import { batch, useDispatch, useSelector } from 'react-redux';
import {
	selectColumn,
	selectDirection,
	sortColumn,
} from '../../slices/sort';
import { ReactComponent as ArrowIcon } from '../../../svg/arrow.svg';
import createQueue from '../../helpers/queue';
import PropTypes from 'prop-types';
import React from 'react';
import { selectSongs } from '../../slices/songs';
import { selectShuffle } from '../../slices/shuffle';
import { setQueue } from '../../slices/queue';

export default function SortableHeader(props) {
	const dispatch = useDispatch();
	const column = useSelector(selectColumn);
	const direction = useSelector(selectDirection);
	const shuffle = useSelector(selectShuffle);
	const songs = useSelector(selectSongs);
	const isSorted = column === props.name;
	const onClick = () => {
		batch(() => {
			dispatch(sortColumn(props.name))
				.then(() => {
					// TODO: This is using the old sort values.
					dispatch(setQueue({
						queue: createQueue(songs, { shuffle, column, direction }),
						shuffle,
						songs,
						column,
						direction,
					}));
				});
		});
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
