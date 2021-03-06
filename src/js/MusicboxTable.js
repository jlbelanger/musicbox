import {
	chooseSong,
	editSong,
	playNext,
	populateQueue,
} from './slices/app';
import { getDatetimeFormat, getTimezone } from './helpers/datetime';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Storage from './helpers/Storage';
import store from './store';
import Tabulator from 'tabulator-tables';
import { ReactComponent as VolumeHighIcon } from '../svg/volume-high.svg';
import { ReactComponent as VolumeOffIcon } from '../svg/volume-off.svg';

// Required for Tabulator.
window.moment = require('moment');
window.momentTimezone = require('moment-timezone');

export default class MusicboxTable {
	constructor(data) {
		const int = setInterval(() => {
			const elem = document.getElementById('table');
			if (!elem || elem.length <= 0) {
				return;
			}
			clearInterval(int);
			this.table = this.initialize(data);
			document.querySelector('.tabulator-tableHolder').removeAttribute('tabindex');
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
		const timezone = getTimezone();
		const outputFormat = getDatetimeFormat();
		const inputFormat = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
		const columns = [
			{
				field: 'state',
				formatter: (cell) => {
					const state = cell.getValue();
					if (state === false) {
						return renderToString(<VolumeOffIcon title="Paused" height="16" width="16" />);
					}
					if (state === true) {
						return renderToString(<VolumeHighIcon title="Playing" height="16" width="16" />);
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
				sorter: 'string',
				sorterParams: {
					alignEmptyValues: 'bottom',
				},
			},
			{
				field: 'artist',
				title: 'Artist',
				headerContextMenu,
				sorter: 'string',
				sorterParams: {
					alignEmptyValues: 'bottom',
				},
			},
			{
				field: 'album',
				title: 'Album',
				headerContextMenu,
				sorter: 'string',
				sorterParams: {
					alignEmptyValues: 'bottom',
				},
			},
			{
				field: 'track',
				title: 'Track',
				headerContextMenu,
				sorter: 'number',
				sorterParams: {
					alignEmptyValues: 'bottom',
				},
			},
			{
				field: 'year',
				title: 'Year',
				headerContextMenu,
				sorter: 'number',
			},
			{
				field: 'genre',
				title: 'Genre',
				headerContextMenu,
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
					timezone,
				},
				sorterParams: {
					alignEmptyValues: 'bottom',
				},
			},
			{
				field: 'numSkips',
				title: 'Skips',
				headerContextMenu,
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
					timezone,
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
					timezone,
				},
			},
		];
		const options = {
			columns,
			data,
			dataSorted: (_, rows) => {
				store.dispatch(populateQueue({
					songs: rows.map((song) => song._row.data),
					sort: Storage.get('tabulator-table-sort'),
				}));

				// Calling scrollToRow immediately doesn't seem to work.
				// Maybe related to this: https://github.com/olifolkerd/tabulator/issues/917#issuecomment-368207644
				setTimeout(() => {
					const currentSongId = store.getState().app.currentSongId;
					if (currentSongId) {
						this.table.scrollToRow(currentSongId, 'top', false);
					}
				});
			},
			initialSort: [
				{
					column: 'artist',
					dir: 'asc',
				},
			],
			layout: 'fitDataFill',
			movableColumns: true,
			persistence: true,
			resizableColumns: 'header',
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
			rowDblClick: (_e, row) => {
				store.dispatch(chooseSong({ currentSongId: row._row.data.id }));
			},
			selectable: 1,
		};
		return new Tabulator('#table', options);
	}
}
