import { createQueue, findCurrentSongQueueIndex, moveToFrontOfQueue } from '../helpers/queue.js';
import { createSlice } from '@reduxjs/toolkit';
import Storage from '../helpers/Storage.js';

export const initialState = {
	currentQueueIndex: null,
	currentSongId: null,
	editSongId: null,
	isPlaying: false,
	queue: [],
	search: Storage.get('search', false),
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
				const newData = moveToFrontOfQueue(state.queue, state.currentQueueIndex, currentSongId);
				queue = newData.queue;
				currentQueueIndex = state.currentQueueIndex === null ? 0 : state.currentQueueIndex + 1;
			} else {
				queue = [...state.queue];
				currentQueueIndex = findCurrentSongQueueIndex(queue, currentSongId);
			}

			return {
				...state,
				currentSongId,
				currentQueueIndex,
				isPlaying: true,
				queue,
			};
		},
		editSong: (state, action) => {
			const { id } = action.payload;
			return {
				...state,
				editSongId: id,
			};
		},
		nextSong: (state, action) => {
			if (state.currentQueueIndex === null) {
				return state;
			}

			if (state.currentQueueIndex < state.queue.length - 1) {
				const index = state.currentQueueIndex + 1;
				return {
					...state,
					currentQueueIndex: index,
					currentSongId: state.queue[index],
				};
			}

			const { seed, songs } = action.payload;
			const queue = createQueue(songs, {
				seed,
				shuffle: state.shuffle,
			});
			return {
				...state,
				currentQueueIndex: null,
				currentSongId: null,
				isPlaying: false,
				queue,
			};
		},
		playNext: (state, action) => {
			const { id } = action.payload;
			const newData = moveToFrontOfQueue(state.queue, state.currentQueueIndex, id);
			return {
				...state,
				currentQueueIndex: newData.currentQueueIndex,
				queue: newData.queue,
			};
		},
		populateQueue: (state, action) => {
			const { seed, songs } = action.payload;
			const queue = createQueue(songs, {
				seed,
				shuffle: state.shuffle,
			});
			let currentQueueIndex = state.currentQueueIndex;
			if (currentQueueIndex !== null) {
				currentQueueIndex = findCurrentSongQueueIndex(queue, state.currentSongId);
			}
			return {
				...state,
				currentQueueIndex,
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
			const queue = createQueue(songs, {
				seed,
				shuffle: state.shuffle,
			});
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
		toggleSearch: (state) => ({
			...state,
			search: !state.search,
		}),
		toggleShuffle: (state, action) => {
			const { seed, songs } = action.payload;
			const shuffle = !state.shuffle;
			let queue = createQueue(songs, {
				seed,
				shuffle,
			});

			if (!state.currentSongId) {
				return {
					...state,
					queue,
					shuffle,
				};
			}

			let currentQueueIndex;
			if (shuffle) {
				const newData = moveToFrontOfQueue(queue, -1, state.currentSongId);
				queue = newData.queue;
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
	editSong,
	nextSong,
	playNext,
	populateQueue,
	previousSong,
	removeFromQueue,
	togglePlayback,
	toggleSearch,
	toggleShuffle,
} = appSlice.actions;

export const selectCurrentQueueIndex = (state) => state.app.currentQueueIndex;
export const selectEditSongId = (state) => state.app.editSongId;
export const selectIsPlaying = (state) => state.app.isPlaying;
export const selectHasQueue = (state) => state.app.queue.length > 0;
export const selectUpcomingSongs = (state) => {
	const index = state.app.currentQueueIndex === null ? 0 : state.app.currentQueueIndex + 1;
	const q = state.app.queue.slice(index, index + 15);
	return q.map((id) => window.songs[id]);
};
export const selectSearch = (state) => state.app.search;
export const selectShuffle = (state) => state.app.shuffle;

export default appSlice.reducer;
