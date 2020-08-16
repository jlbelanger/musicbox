import { nextSong, selectCurrentQueueIndex } from '../../slices/app';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as NextIcon } from '../../../svg/next.svg';
import React from 'react';
import Storage from '../../helpers/Storage';

export default function Next() {
	const dispatch = useDispatch();
	const currentQueueIndex = useSelector(selectCurrentQueueIndex);
	const onClick = () => {
		dispatch(nextSong({
			songs: window.musicbox.songs,
			sort: Storage.get('tabulator--sort'),
		}));
	};

	return (
		<button className="icon" disabled={currentQueueIndex === null} id="next" onClick={onClick} type="button">
			<NextIcon />
			Next
		</button>
	);
}
