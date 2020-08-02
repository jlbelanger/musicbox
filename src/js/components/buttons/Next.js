import { nextSong, selectCurrentQueueIndex } from '../../slices/app';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as NextIcon } from '../../../svg/next.svg';
import React from 'react';
import { selectSongs } from '../../slices/songs';

export default function Next() {
	const dispatch = useDispatch();
	const currentQueueIndex = useSelector(selectCurrentQueueIndex);
	const songs = useSelector(selectSongs);
	const onClick = () => {
		dispatch(nextSong({ songs }));
	};

	return (
		<button className="icon" disabled={currentQueueIndex === null} onClick={onClick} type="button">
			<NextIcon />
			Next
		</button>
	);
}
