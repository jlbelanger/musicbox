import '../../scss/components/Table.scss';
import { chooseSong, selectSongIds } from '../slices/app';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { ReactTabulator } from 'react-tabulator';
import Storage from '../helpers/Storage';

export default function Table() {
	const dispatch = useDispatch();
	const ids = useSelector(selectSongIds);
	let table;
	const data = ids.map((id) => window.songs[id.toString()]);
	const columns = [
		{
			field: 'state',
			formatter: (cell) => {
				if (!cell.getValue()) {
					return '';
				}
				return cell.getValue();
			},
			width: 60,
			resizable: false,
			headerSort: false,
		},
		{
			field: 'checked',
			formatter: 'tickCross',
			editor: 'tickCross',
			width: 60,
			resizable: false,
		},
		{
			field: 'title',
			title: 'Title',
			editor: 'input',
			sorterParams: { alignEmptyValues: 'bottom' },
		},
		{
			field: 'artist',
			title: 'Artist',
			editor: 'input',
			sorterParams: { alignEmptyValues: 'bottom' },
		},
		{
			field: 'album',
			title: 'Album',
			editor: 'input',
			sorterParams: { alignEmptyValues: 'bottom' },
		},
		{
			field: 'year',
			title: 'Year',
			editor: 'input',
		},
		{
			field: 'genre',
			title: 'Genre',
			editor: 'input',
			sorterParams: { alignEmptyValues: 'bottom' },
		},
		{
			field: 'rating',
			title: 'Rating',
			formatter: 'star',
			editor: 'star',
			width: 143,
			resizable: false,
		},
		{
			field: 'last_played',
			title: 'Last Played',
			formatter: 'datetime',
			formatterParams: {
				outputFormat: 'YYYY-MM-DD h:mm a',
			},
			sorterParams: { alignEmptyValues: 'bottom' },
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
		const id = row._row.data.id;
		dispatch(chooseSong({ currentSongId: id }));
		// TODO: Update previously playing song.
		table.table.updateData([{ id, state: 1 }]);
	};

	return (
		<ReactTabulator
			columns={columns}
			data={data}
			dataSorting={(sorters) => {
				Storage.set('sortColumn', sorters[0].field);
				Storage.set('sortDirection', sorters[0].dir);
			}}
			initialSort={[
				{
					column: Storage.get('sortColumn', 'artist'),
					dir: Storage.get('sortDirection', 'asc'),
				},
			]}
			layout="fitColumnsStretchdsf"
			movableColumns
			ref={(ref) => { table = ref; }}
			resizableColumns="header"
			rowDblClick={onRowDblClick}
		/>
	);
}
