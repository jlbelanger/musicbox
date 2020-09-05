import '../../scss/components/Queue.scss';
import { removeFromQueue, selectUpcomingSongs } from '../slices/app';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { ReactComponent as XIcon } from '../../svg/x.svg';

export default function Queue() {
	const dispatch = useDispatch();
	const songs = useSelector(selectUpcomingSongs);
	const onRemove = (id) => {
		dispatch(removeFromQueue({ id }));
	};

	return (
		<section id="queue">
			<ul id="queue-list">
				{songs.map((song, index) => (
					<li key={song.id} title={`${song.title} - ${song.artist}${song.album ? ` (${song.album})` : ''}`}>
						<button className="icon icon--small" onClick={() => { onRemove(song.id); }} type="button">
							<XIcon />
							Remove
						</button>
						{`${index + 1}. ${song.title} - ${song.artist}`}
					</li>
				))}
			</ul>
		</section>
	);
}
