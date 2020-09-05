const mm = require('music-metadata');

module.exports = class MusicboxAudio {
	constructor() {
		this.albumArtCache = {};
		this.audio = this.initialize();
		this.hasFocus = true;
		this.song = null;
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
		if (!window.audio.song) {
			return;
		}

		const duration = MusicboxAudio.calculateDuration(window.audio.song.duration, window.audio.song.start_time, window.audio.song.end_time);
		const currentTime = MusicboxAudio.calculateCurrentTime(window.audio.audio.currentTime * 1000, window.audio.song.start_time);

		document.getElementById('now-playing-time-current').innerText = MusicboxAudio.prettyTime(currentTime, duration);
		document.getElementById('position-after').setAttribute('width', currentTime);
		document.getElementById('position-input').setAttribute('value', currentTime);

		if (currentTime > duration) {
			MusicboxAudio.onEnded();
		}
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

	static calculateDuration(duration, startTime, endTime) {
		return duration - startTime - (endTime ? duration - endTime : 0);
	}

	static calculateCurrentTime(currentTime, startTime) {
		return currentTime - startTime;
	}

	setSong(song, isPlaying) {
		this.song = song;
		if (!song) {
			document.getElementById('now-playing').removeAttribute('data-id');
			document.getElementById('now-playing-time-total').innerText = '';
			document.getElementById('now-playing-time-current').innerText = '';

			const input = document.getElementById('position-input');
			input.setAttribute('value', 0);
			input.setAttribute('max', 0);
			document.getElementById('position-svg').setAttribute('viewBox', '0 0 0 1');
			document.getElementById('position-before').setAttribute('width', 0);

			document.getElementById('now-playing-img').setAttribute('src', 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=');
			document.getElementById('now-playing-title').innerText = '';
			document.getElementById('now-playing-artist').innerText = '';
			return;
		}

		const filePath = song.path;
		const newSrc = `localfile://${filePath}`;
		if (this.audio.src !== newSrc) {
			this.audio.src = newSrc;
			this.audio.currentTime = song.start_time / 1000;
			if (isPlaying) {
				this.audio.play();
			}
		}

		const duration = MusicboxAudio.calculateDuration(song.duration, song.start_time, song.end_time);
		document.getElementById('now-playing').setAttribute('data-id', song.id);
		document.getElementById('now-playing-time-total').innerText = MusicboxAudio.prettyTime(duration);
		document.getElementById('now-playing-time-current').innerText = MusicboxAudio.prettyTime(0, duration);

		const input = document.getElementById('position-input');
		input.setAttribute('value', 0);
		input.setAttribute('max', duration);
		document.getElementById('position-svg').setAttribute('viewBox', `0 0 ${duration} 1`);
		document.getElementById('position-before').setAttribute('width', duration);

		document.getElementById('now-playing-img').setAttribute('src', '');
		document.getElementById('now-playing-title').innerText = song.title;
		document.getElementById('now-playing-artist').innerText = song.artist;

		if (this.albumArtCache.hasOwnProperty(filePath)) {
			const src = this.albumArtCache[filePath];
			this.displayAlbumArt(src);
			this.showNotification(song, src);
		} else {
			mm.parseFile(filePath)
				.then((metadata) => {
					if (this.audio.src !== newSrc) {
						// A different song has started playing while the metadata was being parsed.
						return;
					}

					const pictures = metadata.common.picture;
					let src;
					if (pictures && pictures.length > 0) {
						src = `data:${pictures[0].format};base64,${pictures[0].data.toString('base64')}`;
						this.displayAlbumArt(src);
					}
					this.albumArtCache[filePath] = src;

					this.showNotification(song, src);
				});
		}
	}

	displayAlbumArt(src) {
		document.getElementById('now-playing-img').setAttribute('src', src);
	}

	showNotification(song, src) {
		if (!this.hasFocus) {
			new Notification(song.title, { // eslint-disable-line no-new
				body: song.artist,
				icon: src,
				silent: true,
			});
		}
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
