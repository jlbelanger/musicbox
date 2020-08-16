const mm = require('music-metadata');
const Musicbox = require('./musicbox');

module.exports = class MusicboxAudio {
	constructor() {
		this.audio = this.initialize();
		this.hasFocus = true;
	}

	static get() {
		if (!window.MusicboxAudio) {
			window.MusicboxAudio = new MusicboxAudio();
		}
		return window.MusicboxAudio;
	}

	initialize() {
		const audio = new Audio();

		const volume = window.localStorage.getItem('volume');
		if (volume) {
			audio.volume = volume;
		}

		audio.addEventListener('timeupdate', MusicboxAudio.onTimeUpdate);
		audio.addEventListener('ended', MusicboxAudio.onEnded);

		return audio;
	}

	setVolume(volume) {
		this.audio.volume = volume;
	}

	setTime(time) {
		this.audio.currentTime = time;
	}

	static onTimeUpdate() {
		const label = document.getElementById('now-playing-time-current');
		const currentTime = MusicboxAudio.get().audio.currentTime * 1000;
		label.innerText = MusicboxAudio.prettyTime(currentTime, Musicbox.get().currentSong.duration);

		const positionAfter = document.getElementById('position-after');
		positionAfter.setAttribute('width', currentTime);
	}

	static onEnded() {
		document.getElementById('next').click();
	}

	play() {
		if (this.audio.src) {
			this.audio.play();
		}
	}

	pause() {
		this.audio.pause();
	}

	changeSong(song) {
		const filePath = song.path;
		const newSrc = `localfile://${filePath}`;
		if (this.audio.src !== newSrc) {
			this.audio.src = newSrc;
			this.audio.play();
		}

		document.getElementById('now-playing-time-total').innerText = MusicboxAudio.prettyTime(song.duration);
		document.getElementById('now-playing-time-current').innerText = MusicboxAudio.prettyTime(0, song.duration);

		document.getElementById('position-input').setAttribute('max', song.duration);
		document.getElementById('position-svg').setAttribute('viewBox', `0 0 ${song.duration} 1`);
		document.getElementById('position-before').setAttribute('width', song.duration);

		document.getElementById('now-playing-img').setAttribute('src', '');
		document.getElementById('now-playing-title').innerText = song.title;
		document.getElementById('now-playing-artist').innerText = song.artist;

		mm.parseFile(filePath)
			.then((metadata) => {
				const pictures = metadata.common.picture;
				let src;
				if (pictures && pictures.length > 0) {
					src = `data:${pictures[0].format};base64,${pictures[0].data.toString('base64')}`;
					document.getElementById('now-playing-img').setAttribute('src', src);
				}

				if (!this.hasFocus) {
					new Notification(song.title, { // eslint-disable-line no-new
						body: song.artist,
						icon: src,
						silent: true,
					});
				}
			});
	}

	static prettyTime(milliseconds, otherMilliseconds = null) {
		const date = new Date(0);
		date.setSeconds(milliseconds / 1000);
		let start;
		const minLength = otherMilliseconds === null ? milliseconds : otherMilliseconds;
		if (minLength < 600000) {
			// x:xx
			start = 15;
		} else if (minLength < 3600000) {
			// xx:xx
			start = 14;
		} else if (minLength < 36000000) {
			// x:xx:xx
			start = 12;
		} else {
			// xx:xx:xx
			start = 11;
		}
		return date.toISOString().substr(start).replace(/\.\d+Z$/, '');
	}
};
