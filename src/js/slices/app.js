import {
	createQueue,
	findCurrentSongQueueIndex,
	moveToFrontOfQueue,
} from '../helpers/queue';
import { createSlice } from '@reduxjs/toolkit';
import Storage from '../helpers/Storage';

export const initialState = {
	currentQueueIndex: null,
	currentSongId: null,
	editSongId: null,
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
		playNext: (state, action) => {
			const { id } = action.payload;
			const queue = moveToFrontOfQueue(state.queue, state.currentQueueIndex, id);
			return {
				...state,
				queue,
			};
		},
		populateQueue: (state, action) => {
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
	editSong,
	nextSong,
	playNext,
	populateQueue,
	previousSong,
	removeFromQueue,
	togglePlayback,
	toggleShuffle,
} = appSlice.actions;

export const selectCurrentQueueIndex = (state) => state.app.currentQueueIndex;
export const selectEditSongId = (state) => state.app.editSongId;
export const selectIsPlaying = (state) => state.app.isPlaying;
export const selectHasQueue = (state) => (state.app.queue.length > 0);
export const selectUpcomingSongs = (state) => {
	const index = state.app.currentQueueIndex === null ? 0 : state.app.currentQueueIndex + 1;
	const q = state.app.queue.slice(index, index + 10);
	return q.map((id) => window.songs[id]);
};
export const selectShuffle = (state) => state.app.shuffle;

export default appSlice.reducer;
