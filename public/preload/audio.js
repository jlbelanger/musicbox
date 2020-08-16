const mm = require('music-metadata');

const initialize = () => {
	window.audio = new Audio();

	const volume = window.localStorage.getItem('volume');
	if (volume) {
		window.audio.volume = volume;
	}

	window.audio.addEventListener('timeupdate', (e) => {
		const label = document.getElementById('now-playing-time-current');
		label.innerText = window.audio.currentTime; // TODO: prettyTime(window.audio.currentTime, window.currentSong.duration);

		const position = document.getElementById('position-after');
		position.setAttribute('width', window.audio.currentTime * 1000);
	});

	window.audio.addEventListener('ended', (e) => {
		document.getElementById('next').click();
	});

	document.addEventListener('song-play', onSongPlay);
	document.addEventListener('song-pause', onSongPause);
	document.addEventListener('song-change', onSongChange);
};

const onSongPlay = () => {
	if (window.audio.src) {
		window.audio.play();
	}
};

const onSongPause = () => {
	window.audio.pause();
};

const onSongChange = () => {
	window.currentSong = window.songs[window.currentSongId];
	const filePath = window.currentSong.path;

	const newSrc = `localfile://${filePath}`;
	if (window.audio.src !== newSrc) {
		window.audio.src = newSrc;
		window.audio.play();
	}

	const img = document.getElementById('now-playing-img');
	if (img) {
		img.setAttribute('src', '');
	}

	mm.parseFile(filePath)
		.then((metadata) => {
			const pictures = metadata.common.picture;
			let src;
			if (pictures && pictures.length > 0) {
				src = `data:${pictures[0].format};base64,${pictures[0].data.toString('base64')}`;
				const img = document.getElementById('now-playing-img');
				img.setAttribute('src', src);
			}

			if (window.localStorage.getItem('hasFocus') !== '1') {
				new Notification(window.currentSong.title, { // eslint-disable-line no-new
					body: window.currentSong.artist,
					icon: src,
					silent: true,
				});
			}
		});
};

module.exports = initialize;
