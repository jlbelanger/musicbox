import {
	fetchSongs,
	findCurrentSongQueueIndex,
	moveToFrontOfQueue,
	setQueuePositionToCurrentSong,
	sortSongs,
	startPlaying,
	startShuffle,
	stopShuffle,
} from './helpers/controls';
import createQueue from './helpers/queue';
import { createSlice } from '@reduxjs/toolkit';
import Storage from './helpers/Storage';

export const appSlice = createSlice({
	name: 'app',
	initialState: {
		currentQueueIndex: null,
		currentSongId: null,
		isPlaying: false,
		queue: [],
		repeat: Storage.get('repeat', false),
		shuffle: Storage.get('shuffle', false),
		songs: fetchSongs(),
		sortColumn: Storage.get('sortColumn', 'artist'),
		sortDirection: Storage.get('sortDirection', 'asc'),
	},
	reducers: {
		setCurrentQueueIndex: (state, action) => {
			state.currentQueueIndex = action.payload;

			if (state.currentQueueIndex === null) {
				// We've reached the end of the queue.
				state.isPlaying = false;
				state.currentSongId = null;
				state.queue = [];
			} else {
				state.currentSongId = state.queue[state.currentQueueIndex];
			}
		},
		setCurrentSongId: (state, action) => {
			state.currentSongId = action.payload;

			state.queue = createQueue(state.shuffle, state.songs);
			if (state.shuffle) {
				moveToFrontOfQueue(state, findCurrentSongQueueIndex(state));
			} else {
				setQueuePositionToCurrentSong(state);
			}
		},
		setSongRating: (state, action) => {
			state.songs[action.payload.index].rating = action.payload.value;
		},
		setSortColumn: (state, action) => {
			state.sortColumn = action.payload;
			Storage.set('sortColumn', state.sortColumn);

			state.sortDirection = 'asc';
			Storage.set('sortDirection', state.sortDirection);

			sortSongs(state);
		},
		toggleIsPlaying: (state) => {
			state.isPlaying = !state.isPlaying;

			if (state.isPlaying) {
				startPlaying(state);
			}
		},
		toggleRepeat: (state) => {
			state.repeat = !state.repeat;
			Storage.set('repeat', state.repeat);
		},
		toggleShuffle: (state) => {
			state.shuffle = !state.shuffle;
			Storage.set('shuffle', state.shuffle);

			state.queue = createQueue(state.shuffle, state.songs);

			if (state.shuffle) {
				startShuffle(state);
			} else {
				stopShuffle(state);
			}
		},
		toggleSongChecked: (state, action) => {
			state.songs[action.payload].checked = !state.songs[action.payload].checked;

			// TODO: Add to queue.
		},
		toggleSortDirection: (state) => {
			state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
			Storage.set('sortDirection', state.sortDirection);

			sortSongs(state);
		},
	},
});

export const {
	setCurrentQueueIndex,
	setCurrentSongId,
	setSongRating,
	setSortColumn,
	toggleIsPlaying,
	toggleRepeat,
	toggleShuffle,
	toggleSongChecked,
	toggleSortDirection,
} = appSlice.actions;

export const selectCurrentQueueIndex = (state) => state.app.currentQueueIndex;
export const selectCurrentSong = (state) => (
	state.app.songs.find((song) => (song.id === state.app.currentSongId))
);
export const selectCurrentSongId = (state) => state.app.currentSongId;
export const selectIsPlaying = (state) => state.app.isPlaying;
export const selectNumSongs = (state) => (state.app.songs.filter((song) => (song.checked)).length);
export const selectRepeat = (state) => state.app.repeat;
export const selectShuffle = (state) => state.app.shuffle;
export const selectSongs = (state) => state.app.songs;
export const selectSortColumn = (state) => state.app.sortColumn;
export const selectSortDirection = (state) => state.app.sortDirection;

export default appSlice.reducer;
