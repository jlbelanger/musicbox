import '../../scss/components/Table.scss';
import { chooseSong, selectSongIds } from '../slices/app';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { ReactTabulator } from 'react-tabulator';
import Storage from '../helpers/Storage';
import { ReactComponent as VolumeHighIcon } from '../../svg/volume-high.svg';
import { ReactComponent as VolumeOffIcon } from '../../svg/volume-off.svg';
import { renderToString } from 'react-dom/server';

export default function Table() {
	const dispatch = useDispatch();
	const ids = useSelector(selectSongIds);
	const data = ids.map((id) => window.songs[id.toString()]);
	const columns = [
		{
			field: 'state',
			formatter: (cell) => {
				const state = cell.getValue();
				if (state === false) {
					return renderToString(<VolumeOffIcon height="16" width="16" />);
				}
				if (state === true) {
					return renderToString(<VolumeHighIcon height="16" width="16" />);
				}
				return '';
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
			ref={(ref) => { window.table = ref; }}
			resizableColumns="header"
			rowDblClick={onRowDblClick}
		/>
	);
}
