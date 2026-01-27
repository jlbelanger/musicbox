import seedrandom from 'seedrandom';

export const getActiveSongs = (songs) => Object.values(songs).filter((song) => song.checked);

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

export const createQueue = (songs, { seed, shuffle }) => {
	if (!shuffle) {
		return getActiveSongs(songs).map((song) => song.id);
	}

	return createShuffledQueue(songs, seed);
};

export const findCurrentSongQueueIndex = (queue, currentSongId) => queue.findIndex((id) => id === currentSongId);

export const moveToFrontOfQueue = (queue, currentQueueIndex, songId) => {
	const previousIndex = findCurrentSongQueueIndex(queue, songId);
	queue = [...queue];
	if (previousIndex > -1) {
		queue.splice(previousIndex, 1);
	}
	let newIndex;
	if (currentQueueIndex === null) {
		newIndex = 0;
	} else if (previousIndex <= currentQueueIndex) {
		newIndex = currentQueueIndex;
		currentQueueIndex -= 1;
	} else {
		newIndex = currentQueueIndex + 1;
	}
	queue.splice(newIndex, 0, songId);
	return {
		queue,
		currentQueueIndex,
	};
};
