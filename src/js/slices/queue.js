import createQueue from '../helpers/queue';
import { createSlice } from '@reduxjs/toolkit';
import sort from '../helpers/sort';
import Storage from '../helpers/Storage';

const findCurrentSongQueueIndex = (queue, currentSongId) => (
	queue.findIndex((id) => (id === currentSongId))
);

const moveToFrontOfQueue = (queue, songId) => {
	const index = findCurrentSongQueueIndex(queue, songId);
	queue = [...queue];
	queue.splice(index, 1);
	queue.unshift(songId);
	return queue;
};

const sortSongIds = (songs, column, direction) => (
	sort(Object.values(songs), column, direction)
		.map((song) => song.id)
);

export const initialState = {
	currentQueueIndex: null,
	currentSongId: null,
	ids: [],
	queue: [],
	shuffle: Storage.get('shuffle', false),
	sortColumn: Storage.get('sortColumn', 'artist'),
	sortDirection: Storage.get('sortDirection', 'asc'),
};

export const queueSlice = createSlice({
	name: 'queue',
	initialState,
	reducers: {
		decrementQueueIndex: (state) => {
			const index = state.currentQueueIndex - 1;
			return {
				...state,
				currentQueueIndex: index,
				currentSongId: state.queue[index],
			};
		},
		incrementQueueIndex: (state) => {
			const index = state.currentQueueIndex + 1;
			return {
				...state,
				currentQueueIndex: index,
				currentSongId: state.queue[index],
			};
		},
		moveSongToFrontOfQueue: (state, action) => {
			const songId = action.payload;
			const queue = moveToFrontOfQueue(state.queue, songId);
			return {
				...state,
				queue,
				currentQueueIndex: 0,
				currentSongId: songId,
			};
		},
		setCurrentSongId: (state, action) => (
			{
				...state,
				currentSongId: action.payload,
				currentQueueIndex: findCurrentSongQueueIndex(state.queue, action.payload),
			}
		),
		setQueue: (state, action) => {
			const ids = sortSongIds(action.payload, state.sortColumn, state.sortDirection);
			let queue = createQueue(
				action.payload,
				{
					shuffle: state.shuffle,
					column: state.sortColumn,
					direction: state.sortDirection,
				}
			);
			if (!state.currentSongId) {
				return {
					...state,
					queue,
					ids,
				};
			}

			if (state.shuffle) {
				queue = moveToFrontOfQueue(queue, state.currentSongId);
				return {
					...state,
					queue,
					currentQueueIndex: 0,
					ids,
				};
			}

			return {
				...state,
				queue,
				currentQueueIndex: findCurrentSongQueueIndex(queue, state.currentSongId),
				ids,
			};
		},
		sortColumn: (state, action) => {
			const sortColumn = action.payload;
			if (state.sortColumn === sortColumn) {
				const sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
				return {
					...state,
					sortDirection,
				};
			}

			return {
				...state,
				sortColumn,
				sortDirection: 'asc',
			};
		},
		startQueue: (state) => (
			{
				...state,
				currentQueueIndex: 0,
				currentSongId: state.queue[0],
			}
		),
		stopQueue: (state, action) => (
			{
				...state,
				currentQueueIndex: null,
				currentSongId: null,
				queue: action.payload,
			}
		),
		toggleShuffle: (state) => (
			{
				...state,
				shuffle: !state.shuffle,
			}
		),
	},
});

export const {
	decrementQueueIndex,
	incrementQueueIndex,
	moveSongToFrontOfQueue,
	setCurrentSongId,
	setQueue,
	sortColumn,
	startQueue,
	stopQueue,
	toggleShuffle,
} = queueSlice.actions;

export const selectCurrentQueueIndex = (state) => state.queue.currentQueueIndex;
export const selectCurrentSong = (state) => state.songs[state.queue.currentSongId];
export const selectCurrentSongId = (state) => state.queue.currentSongId;
export const selectSongIds = (state) => state.queue.ids;
export const selectHasQueue = (state) => (state.queue.queue.length > 0);
export const selectUpcomingSongs = (state) => {
	const index = state.queue.currentQueueIndex;
	const q = state.queue.queue.slice(index, index + 3);
	return q.map((id) => state.songs[id]);
};
export const selectSortColumn = (state) => state.queue.sortColumn;
export const selectSortDirection = (state) => state.queue.sortDirection;
export const selectShuffle = (state) => state.queue.shuffle;

export default queueSlice.reducer;
