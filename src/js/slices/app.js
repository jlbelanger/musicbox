import {
	createQueue,
	createShuffledQueue,
	findCurrentSongQueueIndex,
	getActiveSongs,
	moveToFrontOfQueue,
} from '../helpers/queue';
import { createSlice } from '@reduxjs/toolkit';
import sort from '../helpers/sort';
import Storage from '../helpers/Storage';

export const initialState = {
	currentQueueIndex: null,
	currentSongId: null,
	ids: [],
	isPlaying: false,
	queue: [],
	shuffle: Storage.get('shuffle', false),
	sortColumn: Storage.get('sortColumn', 'artist'),
	sortDirection: Storage.get('sortDirection', 'asc'),
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		changeSort: (state, action) => {
			const { songs, sortColumn } = action.payload;

			let sortDirection;
			if (state.sortColumn === sortColumn) {
				sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
			} else {
				sortDirection = 'asc';
			}

			const sortedSongs = sort(Object.values(songs), sortColumn, sortDirection);
			const ids = sortedSongs.map((song) => song.id);

			if (state.shuffle) {
				return {
					...state,
					ids,
					sortColumn,
					sortDirection,
				};
			}

			const queue = getActiveSongs(sortedSongs).map((song) => song.id);
			let currentQueueIndex = state.currentQueueIndex;
			if (state.currentSongId) {
				currentQueueIndex = findCurrentSongQueueIndex(queue, state.currentSongId);
			}

			return {
				...state,
				currentQueueIndex,
				ids,
				queue,
				sortColumn,
				sortDirection,
			};
		},
		chooseSong: (state, action) => {
			const { currentSongId } = action.payload;
			let currentQueueIndex, queue;
			if (state.shuffle) {
				queue = moveToFrontOfQueue(state.queue, currentSongId);
				currentQueueIndex = 0;
			} else {
				queue = state.queue;
				currentQueueIndex = findCurrentSongQueueIndex(state.queue, currentSongId);
			}

			return {
				...state,
				currentSongId,
				currentQueueIndex,
				isPlaying: true,
				queue,
			};
		},
		nextSong: (state, action) => {
			if (state.currentQueueIndex === null) {
				return state;
			}

			if (state.currentQueueIndex < (state.queue.length - 1)) {
				const index = state.currentQueueIndex + 1;
				return {
					...state,
					currentQueueIndex: index,
					currentSongId: state.queue[index],
				};
			}

			const { seed, songs } = action.payload;
			const queue = createQueue(
				songs,
				{
					column: state.sortColumn,
					direction: state.sortDirection,
					seed,
					shuffle: state.shuffle,
				}
			);
			return {
				...state,
				currentQueueIndex: null,
				currentSongId: null,
				isPlaying: false,
				queue,
			};
		},
		populateQueue: (state, action) => {
			const { seed, songs } = action.payload;
			const sortedSongs = sort(Object.values(songs), state.sortColumn, state.sortDirection);
			const ids = sortedSongs.map((song) => song.id);
			let queue;
			if (state.shuffle) {
				queue = createShuffledQueue(songs, seed);
			} else {
				queue = getActiveSongs(sortedSongs).map((song) => song.id);
			}
			return {
				...state,
				ids,
				queue,
			};
		},
		previousSong: (state, action) => {
			if (state.currentQueueIndex === null) {
				return state;
			}

			if (state.currentQueueIndex > 0) {
				const index = state.currentQueueIndex - 1;
				return {
					...state,
					currentQueueIndex: index,
					currentSongId: state.queue[index],
				};
			}

			const { seed, songs } = action.payload;
			const queue = createQueue(
				songs,
				{
					column: state.sortColumn,
					direction: state.sortDirection,
					seed,
					shuffle: state.shuffle,
				}
			);
			return {
				...state,
				currentQueueIndex: null,
				currentSongId: null,
				isPlaying: false,
				queue,
			};
		},
		togglePlayback: (state) => {
			if (state.isPlaying) {
				// Pause.
				return {
					...state,
					isPlaying: false,
				};
			}

			if (state.currentQueueIndex !== null) {
				// Resume.
				return {
					...state,
					isPlaying: true,
				};
			}

			// Start.
			return {
				...state,
				currentQueueIndex: 0,
				currentSongId: state.queue[0],
				isPlaying: true,
			};
		},
		toggleShuffle: (state, action) => {
			const { seed, songs } = action.payload;
			const shuffle = !state.shuffle;
			let queue = createQueue(
				songs,
				{
					column: state.sortColumn,
					direction: state.sortDirection,
					seed,
					shuffle,
				}
			);

			if (!state.currentSongId) {
				return {
					...state,
					queue,
					shuffle,
				};
			}

			let currentQueueIndex;
			if (shuffle) {
				// TODO: But now the previous button is broken.
				queue = moveToFrontOfQueue(queue, state.currentSongId);
				currentQueueIndex = 0;
			} else {
				currentQueueIndex = findCurrentSongQueueIndex(queue, state.currentSongId);
			}

			return {
				...state,
				currentQueueIndex,
				queue,
				shuffle,
			};
		},
	},
});

export const {
	changeSort,
	chooseSong,
	nextSong,
	populateQueue,
	previousSong,
	togglePlayback,
	toggleShuffle,
} = appSlice.actions;

export const selectCurrentQueueIndex = (state) => state.app.currentQueueIndex;
export const selectCurrentSong = (state) => state.songs[state.app.currentSongId];
export const selectCurrentSongId = (state) => state.app.currentSongId;
export const selectIsPlaying = (state) => state.app.isPlaying;
export const selectSongIds = (state) => state.app.ids;
export const selectHasQueue = (state) => (state.app.queue.length > 0);
export const selectUpcomingSongs = (state) => {
	const index = state.app.currentQueueIndex;
	const q = state.app.queue.slice(index, index + 3);
	return q.map((id) => state.songs[id]);
};
export const selectSortColumn = (state) => state.app.sortColumn;
export const selectSortDirection = (state) => state.app.sortDirection;
export const selectShuffle = (state) => state.app.shuffle;

export default appSlice.reducer;
