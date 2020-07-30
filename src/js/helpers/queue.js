import seedrandom from 'seedrandom';
import sort from './sort';

export const getActiveSongs = (songs) => {
	return Object.values(songs).filter((song) => song.checked);
};

export const createShuffledQueue = (songs, seed) => {
	const pool = getActiveSongs(songs);
	const queue = [];
	let numSongs = pool.length;
	let i;
	const rng = seedrandom(seed);

	while (numSongs > 0) {
		i = Math.floor(rng() * numSongs);
		queue.push(pool[i].id);
		pool.splice(i, 1);
		numSongs -= 1;
	}

	return queue;
};

export const createQueue = (songs, { column, direction, seed, shuffle }) => {
	if (!shuffle) {
		return sortSongs(getActiveSongs(songs), column, direction);
	}

	return createShuffledQueue(songs, seed);
};

export const findCurrentSongQueueIndex = (queue, currentSongId) => (
	queue.findIndex((id) => (id === currentSongId))
);

export const moveToFrontOfQueue = (queue, songId) => {
	const index = findCurrentSongQueueIndex(queue, songId);
	queue = [...queue];
	queue.splice(index, 1);
	queue.unshift(songId);
	return queue;
};

export const sortSongs = (songs, column, direction) => (
	sort(songs, column, direction)
		.map((song) => song.id)
);
