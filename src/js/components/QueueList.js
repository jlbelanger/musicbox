import '../../scss/components/Queue.scss';
import { removeFromQueue, selectUpcomingSongs } from '../slices/app';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { ReactComponent as XIcon } from '../../svg/x.svg';

export default function QueueList({ className }) {
	const dispatch = useDispatch();
	const songs = useSelector(selectUpcomingSongs);
	const onRemove = (id) => {
		dispatch(removeFromQueue({ id }));
	};

	return (
		<section className={className} id="queue">
			<h1 id="queue-title">Queue</h1>
			<ol id="queue-list">
				{songs.map((song) => (
					<li className="queue-item" key={song.id} title={`${song.title} - ${song.artist}${song.album ? ` (${song.album})` : ''}`}>
						<div className="queue-info">
							<div className="queue-title">{song.title}</div>
							<div className="queue-artist">{song.artist}</div>
						</div>
						<div className="queue-controls">
							<button className="icon queue-remove" onClick={() => { onRemove(song.id); }} type="button">
								<XIcon />
								Remove
							</button>
						</div>
					</li>
				))}
			</ol>
		</section>
	);
}

QueueList.propTypes = {
	className: PropTypes.string,
};

QueueList.defaultProps = {
	className: '',
};
