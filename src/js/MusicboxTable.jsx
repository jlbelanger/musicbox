import {
	chooseSong,
	editSong,
	playNext,
	populateQueue,
} from './slices/app.js';
import { getDatetimeFormat } from './helpers/datetime.js';
import { DateTime } from 'luxon';
import { renderToString } from 'react-dom/server';
import Storage from './helpers/Storage.js';
import store from './store.js';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import VolumeHighIcon from '../svg/volume-high.svg?react'; // eslint-disable-line import/no-unresolved
import VolumeOffIcon from '../svg/volume-off.svg?react'; // eslint-disable-line import/no-unresolved

// Required for Tabulator.
window.luxon = DateTime;

export default class MusicboxTable {
	constructor(data) {
		const int = setInterval(() => {
			const elem = document.getElementById('table');
			if (!elem || elem.length <= 0) {
				return;
			}
			clearInterval(int);
			this.table = this.initialize(data);
		}, 100);
	}

	initialize(data) {
		const headerContextMenu = [
			{
				label: 'Hide',
				action: (_e, column) => {
					column.toggle();
				},
			},
		];
		data.forEach((d, i) => {
			if (data[i].lastPlayed) {
				data[i].lastPlayed = data[i].lastPlayed.replace('Z', '+0');
			}
			if (data[i].lastSkipped) {
				data[i].lastSkipped = data[i].lastSkipped.replace('Z', '+0');
			}
			if (data[i].dateAdded) {
				data[i].dateAdded = data[i].dateAdded.replace('Z', '+0');
			}
		});
		const outputFormat = getDatetimeFormat();
		const inputFormat = 'yyyy-MM-dd\'T\'HH:mm:ss.SSSZ';
		const columns = [
			{
				field: 'state',
				formatter: (cell) => {
					const state = cell.getValue();
					if (state === false) {
						return renderToString(<VolumeOffIcon height="16" title="Paused" width="16" />);
					}
					if (state === true) {
						return renderToString(<VolumeHighIcon height="16" title="Playing" width="16" />);
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
				headerContextMenu,
				editor: 'tickCross',
				width: 60,
				resizable: false,
				sorter: 'boolean',
			},
			{
				field: 'title',
				title: 'Title',
				headerContextMenu,
				headerFilter: true,
				sorter: 'string',
				sorterParams: {
					alignEmptyValues: 'bottom',
				},
			},
			{
				field: 'artist',
				title: 'Artist',
				headerContextMenu,
				headerFilter: true,
				sorter: 'string',
				sorterParams: {
					alignEmptyValues: 'bottom',
				},
			},
			{
				field: 'album',
				title: 'Album',
				headerContextMenu,
				headerFilter: true,
				sorter: 'string',
				sorterParams: {
					alignEmptyValues: 'bottom',
				},
			},
			{
				field: 'track',
				title: 'Track',
				headerContextMenu,
				headerFilter: true,
				sorter: 'number',
				sorterParams: {
					alignEmptyValues: 'bottom',
				},
			},
			{
				field: 'year',
				title: 'Year',
				headerContextMenu,
				headerFilter: true,
				sorter: 'number',
			},
			{
				field: 'genre',
				title: 'Genre',
				headerContextMenu,
				headerFilter: true,
				sorter: 'string',
				sorterParams: {
					alignEmptyValues: 'bottom',
				},
			},
			{
				field: 'rating',
				title: 'Rating',
				headerContextMenu,
				formatter: 'star',
				width: 143,
				resizable: false,
				sorter: 'number',
				sorterParams: {
					alignEmptyValues: 'bottom',
				},
			},
			{
				field: 'numPlays',
				title: 'Plays',
				headerContextMenu,
				headerFilter: true,
				sorter: 'number',
			},
			{
				field: 'lastPlayed',
				title: 'Last Played',
				headerContextMenu,
				formatter: 'datetime',
				formatterParams: {
					inputFormat,
					outputFormat,
				},
				sorterParams: {
					alignEmptyValues: 'bottom',
				},
			},
			{
				field: 'numSkips',
				title: 'Skips',
				headerContextMenu,
				headerFilter: true,
				sorter: 'number',
			},
			{
				field: 'lastSkipped',
				title: 'Last Skipped',
				headerContextMenu,
				formatter: 'datetime',
				formatterParams: {
					inputFormat,
					outputFormat,
				},
				sorterParams: {
					alignEmptyValues: 'bottom',
				},
			},
			{
				field: 'dateAdded',
				title: 'Date Added',
				headerContextMenu,
				formatter: 'datetime',
				formatterParams: {
					inputFormat,
					outputFormat,
				},
			},
		];
		const initialSort = Storage.get('tabulator-table-sort', [
			{
				column: 'artist',
				dir: 'asc',
			},
		]);
		const options = {
			columns,
			columnDefaults: {
				resizable: 'header',
			},
			data,
			initialSort,
			layout: 'fitDataFill',
			movableColumns: true,
			persistence: true,
			rowContextMenu: [
				{
					label: 'Edit',
					action: (_e, row) => {
						this.table.selectRow(row._row.data.id);
						store.dispatch(editSong({ id: row._row.data.id }));
					},
				},
				{
					label: 'Play next',
					action: (_e, row) => {
						store.dispatch(playNext({ id: row._row.data.id }));
					},
				},
				{
					label: 'Open file location',
					action: (_e, row) => {
						window.api.openFileLocation(row._row.data.path);
					},
				},
			],
			selectableRows: 1,
		};

		const table = new Tabulator('#table', options);

		table.on('dataSorted', (_, rows) => {
			if (store.getState().app.queue.length <= 0 || !store.getState().app.shuffle) {
				store.dispatch(populateQueue({
					songs: rows.map((song) => song._row.data),
					sort: Storage.get('tabulator-table-sort'),
				}));
			}

			// Calling scrollToRow immediately doesn't seem to work.
			// Maybe related to this: https://github.com/olifolkerd/tabulator/issues/917#issuecomment-368207644
			setTimeout(() => {
				const currentSongId = store.getState().app.currentSongId;
				if (currentSongId) {
					this.table.scrollToRow(currentSongId, 'top', false);
				}
			});
		});

		table.on('rowDblClick', (_e, row) => {
			store.dispatch(chooseSong({ currentSongId: row._row.data.id }));
		});

		table.on('tableBuilt', () => {
			document.querySelector('.tabulator-tableholder').removeAttribute('tabindex');
		});

		return table;
	}
}
