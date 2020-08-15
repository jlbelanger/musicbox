import {
	createQueue,
	createShuffledQueue,
	findCurrentSongQueueIndex,
	getActiveSongs,
	moveToFrontOfQueue,
} from '../helpers/queue';
import { createSlice } from '@reduxjs/toolkit';
import sortRows from '../helpers/sort';
import Storage from '../helpers/Storage';

export const initialState = {
	currentQueueIndex: null,
	currentSongId: null,
	ids: [],
	isPlaying: false,
	queue: [],
	shuffle: Storage.get('shuffle', false),
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		chooseSong: (state, action) => {
			const { currentSongId } = action.payload;
			let currentQueueIndex;
			let queue;
			if (state.shuffle) {
				queue = moveToFrontOfQueue(state.queue, state.currentQueueIndex, currentSongId);
				currentQueueIndex = state.currentQueueIndex === null ? 0 : state.currentQueueIndex + 1;
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

			const {
				seed,
				songs,
				sort,
			} = action.payload;
			const queue = createQueue(
				songs,
				{
					seed,
					shuffle: state.shuffle,
					sort,
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
			const {
				seed,
				songs,
				sort,
			} = action.payload;
			const sortedSongs = sortRows(Object.values(songs), sort[0].column, sort[0].dir);
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

			const {
				seed,
				songs,
				sort,
			} = action.payload;
			const queue = createQueue(
				songs,
				{
					seed,
					shuffle: state.shuffle,
					sort,
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
		removeFromQueue: (state, action) => {
			const { id } = action.payload;
			const queue = [...state.queue];
			const index = findCurrentSongQueueIndex(queue, id);
			queue.splice(index, 1);
			return {
				...state,
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
			const {
				seed,
				songs,
				sort,
			} = action.payload;
			const shuffle = !state.shuffle;
			let queue = createQueue(
				songs,
				{
					seed,
					shuffle,
					sort,
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
				queue = moveToFrontOfQueue(queue, -1, state.currentSongId);
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
	chooseSong,
	nextSong,
	populateQueue,
	previousSong,
	removeFromQueue,
	togglePlayback,
	toggleShuffle,
} = appSlice.actions;

export const selectCurrentQueueIndex = (state) => state.app.currentQueueIndex;
export const selectCurrentSong = (state) => window.songs[state.app.currentSongId];
export const selectCurrentSongId = (state) => state.app.currentSongId;
export const selectIsPlaying = (state) => state.app.isPlaying;
export const selectSongIds = (state) => state.app.ids;
export const selectHasQueue = (state) => (state.app.queue.length > 0);
export const selectUpcomingSongs = (state) => {
	const index = state.app.currentQueueIndex === null ? 0 : state.app.currentQueueIndex + 1;
	const q = state.app.queue.slice(index, index + 2);
	return q.map((id) => window.songs[id]);
};
export const selectShuffle = (state) => state.app.shuffle;

export default appSlice.reducer;
