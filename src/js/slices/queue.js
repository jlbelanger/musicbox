import { createSlice } from '@reduxjs/toolkit';

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

export const queueSlice = createSlice({
	name: 'queue',
	initialState: {
		currentQueueIndex: null,
		currentSongId: null,
		queue: [],
	},
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
		setQueue: (state, action) => (
			{
				...state,
				queue: action.payload,
			}
		),
		setQueueAndPreserveCurrentSong: (state, action) => {
			let queue = action.payload.queue;
			if (!state.currentSongId) {
				return {
					...state,
					queue,
				};
			}

			if (action.payload.shuffle) {
				queue = moveToFrontOfQueue(queue, state.currentSongId);
				return {
					...state,
					queue,
					currentQueueIndex: 0,
				};
			}

			return {
				...state,
				queue,
				currentQueueIndex: findCurrentSongQueueIndex(queue, state.currentSongId),
			};
		},
		setQueueIndexToCurrentSong: (state) => (
			{
				...state,
				currentQueueIndex: findCurrentSongQueueIndex(state.queue, state.currentSongId),
			}
		),
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
	},
});

export const {
	decrementQueueIndex,
	incrementQueueIndex,
	moveSongToFrontOfQueue,
	setCurrentSongId,
	setQueue,
	setQueueAndPreserveCurrentSong,
	setQueueIndexToCurrentSong,
	startQueue,
	stopQueue,
} = queueSlice.actions;

export const selectCurrentQueueIndex = (state) => state.queue.currentQueueIndex;
export const selectCurrentSong = (state) => state.songs[state.queue.currentSongId];
export const selectCurrentSongId = (state) => state.queue.currentSongId;
export const selectHasQueue = (state) => (state.queue.queue.length > 0);
export const selectUpcomingSongs = (state) => {
	const index = state.queue.currentQueueIndex;
	const q = state.queue.queue.slice(index, index + 3);
	return q.map((id) => state.songs[id]);
};

export default queueSlice.reducer;
