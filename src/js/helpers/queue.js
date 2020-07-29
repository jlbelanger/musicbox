import seedrandom from 'seedrandom';
import sort from './sort';

export default (songs, { shuffle, column, direction }) => {
	const pool = Object.values(songs).filter((song) => song.checked);
	if (!shuffle) {
		return sort(pool, column, direction)
			.map((song) => (song.id));
	}

	const queue = [];
	let numSongs = pool.length;
	let i;
	const rng = seedrandom();

	while (numSongs > 0) {
		i = Math.floor(rng() * numSongs);
		queue.push(pool[i].id);
		pool.splice(i, 1);
		numSongs -= 1;
	}

	return queue;
};
