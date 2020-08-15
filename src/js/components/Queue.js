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
			<ol style={{ margin: 0, padding: 0 }}>
				{songs.map((song) => (
					<li key={song.id}>
						{`${song.title} - ${song.artist}`}
						<button className="icon icon--small" onClick={() => { onRemove(song.id); }} type="button">
							<XIcon />
							Remove
						</button>
					</li>
				))}
			</ol>
		</section>
	);
}
