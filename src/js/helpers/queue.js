import seedrandom from 'seedrandom';
import sortRows from './sort';

export const getActiveSongs = (songs) => (
	Object.values(songs).filter((song) => song.checked)
);

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

export const createQueue = (songs, {
	seed,
	shuffle,
	sort,
}) => {
	if (!shuffle) {
		let activeSongs = getActiveSongs(songs);
		if (sort && sort.length > 0) {
			activeSongs = sortRows(songs, sort);
		}
		return activeSongs.map((song) => song.id);
	}

	return createShuffledQueue(songs, seed);
};

export const findCurrentSongQueueIndex = (queue, currentSongId) => (
	queue.findIndex((id) => (id === currentSongId))
);

export const moveToFrontOfQueue = (queue, currentQueueIndex, songId) => {
	const index = findCurrentSongQueueIndex(queue, songId);
	queue = [...queue];
	if (index > -1) {
		queue.splice(index, 1);
	}
	const newIndex = currentQueueIndex === null ? 0 : currentQueueIndex + 1;
	queue.splice(newIndex, 0, songId);
	return queue;
};
