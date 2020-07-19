import createQueue from './queue';
import sort from './sort';
import Storage from './Storage';

export const fetchSongs = () => {
	const songs = require('../../data/songs.json'); // eslint-disable-line global-require
	const sortColumn = Storage.get('sortColumn', 'artist');
	const sortDirection = Storage.get('sortDirection', 'asc');
	return sort(songs, sortColumn, sortDirection);
};

export const startPlaying = (state) => {
	// Create a queue if it doesn't already exist.
	if (state.queue.length <= 0) {
		state.queue = createQueue(state.shuffle, state.songs);
	}

	// If no song is playing, start from the beginning of the queue.
	if (state.currentQueueIndex === null) {
		state.currentQueueIndex = 0;
		state.currentSongId = state.queue[0];
	}
};

export const moveToFrontOfQueue = (state, index) => {
	state.queue = state.queue.splice(index, 1);
	state.queue.unshift(state.currentSongId);
	state.currentQueueIndex = 0;
};

export const startShuffle = (state) => {
	if (!state.currentSongId) {
		return;
	}

	moveToFrontOfQueue(state, state.currentQueueIndex);
};

export const findCurrentSongQueueIndex = (state) => (
	state.queue.findIndex((id) => (id === state.currentSongId))
);

export const setQueuePositionToCurrentSong = (state) => {
	if (!state.currentSongId) {
		return;
	}

	state.currentQueueIndex = findCurrentSongQueueIndex(state);
};

export const stopShuffle = (state) => {
	if (!state.currentSongId) {
		return;
	}

	setQueuePositionToCurrentSong(state);
};

export const sortSongs = (state) => {
	state.songs = sort(state.songs, state.sortColumn, state.sortDirection);

	if (!state.shuffle) {
		state.queue = createQueue(state.shuffle, state.songs);

		setQueuePositionToCurrentSong(state);
	}
};
