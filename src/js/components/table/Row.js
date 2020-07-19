import { selectCurrentSongId, selectIsPlaying, setCurrentSongId } from '../../appSlice';
import { useDispatch, useSelector } from 'react-redux';
import CheckboxCell from './CheckboxCell';
import prettyDate from '../../helpers/date';
import PropTypes from 'prop-types';
import RatingCell from './RatingCell';
import React from 'react';
import TextCell from './TextCell';
import { ReactComponent as VolumeHighIcon } from '../../../svg/volume-high.svg';
import { ReactComponent as VolumeOffIcon } from '../../../svg/volume-off.svg';

export default function Row(props) {
	const currentSongId = useSelector(selectCurrentSongId);
	const isPlaying = useSelector(selectIsPlaying);

	let icon = null;
	if (props.row.id === currentSongId) {
		if (isPlaying) {
			icon = <VolumeHighIcon height="16" width="16" />;
		} else {
			icon = <VolumeOffIcon height="16" width="16" />;
		}
	}

	const dispatch = useDispatch();
	const onDoubleClick = (e) => {
		if (['TD', 'TH'].includes(e.target.tagName)) {
			dispatch(setCurrentSongId(props.row.id));
		}
	};

	return (
		<tr onDoubleClick={onDoubleClick} tabIndex="0">
			<td>{icon}</td>
			<CheckboxCell index={props.index} value={props.row.checked} />
			<th scope="row">{props.row.title}</th>
			<TextCell value={props.row.artist} />
			<TextCell value={props.row.album} />
			<TextCell value={props.row.year} />
			<TextCell value={props.row.genre} />
			<RatingCell index={props.index} value={props.row.rating} />
			<TextCell value={prettyDate(props.row.last_played)} />
			<TextCell value={prettyDate(props.row.date_added)} />
		</tr>
	);
}

Row.propTypes = {
	index: PropTypes.number.isRequired,
	row: PropTypes.object.isRequired,
};
