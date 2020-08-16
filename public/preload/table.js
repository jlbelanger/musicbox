const Tabulator = require('tabulator-tables');

// Required for Tabulator.
const moment = require('moment');
window.moment = moment;

module.exports = class MusicboxTable {
	constructor(songs) {
		const int = setInterval(() => {
			const elem = document.getElementById('table');
			if (!elem || elem.length <= 0) {
				return;
			}
			clearInterval(int);
			this.table = this.initialize(songs);
		}, 100);
	}

	initialize(songs) {
		const columns = [
			{
				field: 'state',
				formatter: (cell) => {
					const state = cell.getValue();
					if (state === false) {
						return '||';
						// return renderToString(<VolumeOffIcon height="16" width="16" />); // TODO
					}
					if (state === true) {
						return '|>';
						// return renderToString(<VolumeHighIcon height="16" width="16" />); // TODO
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
		const options = {
			columns,
			data: Object.values(songs),
			initialSort: [
				{
					column: 'artist',
					dir: 'asc',
				},
			],
			layout: 'fitDataFill',
			movableColumns: true,
			resizableColumns: 'header',
			persistence: true,
			rowContextMenu: [
				{
					label: 'Play next',
					action: (_e, row) => {
						console.log('row', row);
						// dispatch(playNext({ id: row._row.data.id })); // TODO
					},
				},
			],
			rowDblClick: (_e, row) => {
				console.log('row', row);
				// dispatch(chooseSong({ currentSongId: row._row.data.id })); // TODO
			},
		};
		return new Tabulator('#table', options);
	}
};
