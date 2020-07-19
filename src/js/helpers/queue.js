export default (shuffle, songs) => {
	const pool = songs.filter((song) => (song.checked))
		.map((song) => (song.id));
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
