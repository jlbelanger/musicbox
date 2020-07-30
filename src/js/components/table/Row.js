import { batch, useDispatch, useSelector } from 'react-redux';
import {
	chooseSong,
	selectCurrentSongId,
	selectIsPlaying,
	startPlaying,
} from '../../slices/queue';
import CheckboxCell from './CheckboxCell';
import prettyDate from '../../helpers/date';
import PropTypes from 'prop-types';
import RatingCell from './RatingCell';
import React from 'react';
import { selectSongs } from '../../slices/songs';
import TextCell from './TextCell';
import { ReactComponent as VolumeHighIcon } from '../../../svg/volume-high.svg';
import { ReactComponent as VolumeOffIcon } from '../../../svg/volume-off.svg';

export default function Row(props) {
	const dispatch = useDispatch();
	const currentSongId = useSelector(selectCurrentSongId);
	const isPlaying = useSelector(selectIsPlaying);
	const songs = useSelector(selectSongs);
	const song = songs[props.id];

	let icon = null;
	if (props.id === currentSongId) {
		if (isPlaying) {
			icon = <VolumeHighIcon height="16" width="16" />;
		} else {
			icon = <VolumeOffIcon height="16" width="16" />;
		}
	}

	const onDoubleClick = (e) => {
		if (['TD', 'TH'].includes(e.target.tagName)) {
			batch(() => {
				dispatch(startPlaying());
				dispatch(chooseSong({ currentSongId: song.id }));
			});
		}
	};

	return (
		<tr onDoubleClick={onDoubleClick} tabIndex="0">
			<td>{icon}</td>
			<CheckboxCell id={props.id} value={song.checked} />
			<th scope="row">{song.title}</th>
			<TextCell value={song.artist} />
			<TextCell value={song.album} />
			<TextCell value={song.year} />
			<TextCell value={song.genre} />
			<RatingCell id={props.id} value={song.rating} />
			<TextCell value={prettyDate(song.last_played)} />
			<TextCell value={prettyDate(song.date_added)} />
		</tr>
	);
}

Row.propTypes = {
	id: PropTypes.string.isRequired,
};
