import '../../scss/components/Table.scss';
import { chooseSong, selectSongIds } from '../slices/app';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { ReactTabulator } from 'react-tabulator';
import { selectSongs } from '../slices/songs';

export default function Table() {
	const dispatch = useDispatch();
	const songs = useSelector(selectSongs);
	const ids = useSelector(selectSongIds);
	const data = ids.map((id) => songs[id.toString()]);
	const columns = [
		{
			field: 'checked',
			formatter: 'tickCross',
			// editor: 'tick',
		},
		{
			field: 'title',
			title: 'Title',
			// editor: 'input',
		},
		{
			field: 'artist',
			title: 'Artist',
			// editor: 'input',
		},
		{
			field: 'album',
			title: 'Album',
			// editor: 'input',
		},
		{
			field: 'year',
			title: 'Year',
			// editor: 'input',
		},
		{
			field: 'genre',
			title: 'Genre',
			// editor: 'input',
		},
		{
			field: 'rating',
			title: 'Rating',
			formatter: 'star',
			// editor: 'star',
		},
		{
			field: 'last_played',
			title: 'Last Played',
			formatter: 'datetime',
			formatterParams: {
				outputFormat: 'YYYY-MM-DD h:mm a',
			},
		},
		{
			field: 'date_added',
			title: 'Date Added',
			formatter: 'datetime',
			formatterParams: {
				outputFormat: 'YYYY-MM-DD h:mm a',
			},
		},
	];
	const onRowDblClick = (_e, row) => {
		dispatch(chooseSong({ currentSongId: row._row.data.id }));
	};

	return (
		<ReactTabulator
			columns={columns}
			data={data}
			movableColumns
			resizableColumns="header"
			rowDblClick={onRowDblClick}
		/>
	);
}
