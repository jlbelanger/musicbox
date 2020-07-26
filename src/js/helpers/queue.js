import sort from './sort';

export default (songs, { shuffle, column, direction }) => {
	let pool = songs.filter((song) => (song.checked));
	if (!shuffle) {
		pool = sort([...songs], column, direction);
	}
	pool = pool.map((song) => (song.id));
	if (!shuffle) {
		return pool;
	}

	const queue = [];
	let numSongs = pool.length;
	let i;

	while (numSongs > 0) {
		i = Math.floor(Math.random() * numSongs);
		queue.push(pool[i]);
		pool.splice(i, 1);
		numSongs -= 1;
	}

	return queue;
};
