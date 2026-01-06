export default class MusicboxAudio {
	constructor() {
		this.albumArtCache = {};
		this.audio = this.initialize();
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

	getTime() {
		return this.audio.currentTime;
	}

	setIsPlaying(isPlaying) {
		if (isPlaying) {
			this.play();
		} else {
			this.pause();
		}
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

		const duration = MusicboxAudio.calculateDuration(window.audio.song.duration, window.audio.song.startTime, window.audio.song.endTime);
		const currentTime = MusicboxAudio.calculateCurrentTime(window.audio.audio.currentTime * 1000, window.audio.song.startTime);

		document.getElementById('now-playing-time-current').innerText = MusicboxAudio.prettyTime(currentTime, duration);
		document.getElementById('position-after').setAttribute('width', currentTime);
		document.getElementById('position-input').setAttribute('value', currentTime);
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
			document.getElementById('now-playing-info').style.display = 'none';

			document.getElementById('now-playing').removeAttribute('data-id');
			document.getElementById('now-playing-time-total').innerText = '';
			document.getElementById('now-playing-time-current').innerText = '';

			const input = document.getElementById('position-input');
			input.setAttribute('value', 0);
			input.setAttribute('max', 0);
			document.getElementById('position-svg').setAttribute('viewBox', '0 0 0 1');
			document.getElementById('position-before').setAttribute('width', 0);

			const img = document.getElementById('now-playing-img');
			img.setAttribute('src', '');
			img.setAttribute('alt', '');
			img.setAttribute('title', '');

			document.getElementById('now-playing-title').innerText = '';
			document.getElementById('now-playing-artist').innerText = '';
			return;
		}

		window.api.fileExists(song.path)
			.then((fileExists) => {
				if (!fileExists) {
					if (!isPlaying) {
						this.audio.play();
					}
					return;
				}

				const newSrc = `localfile://${song.path.replace(/ /g, '%20')}`;
				if (this.audio.src !== newSrc) {
					this.audio.src = newSrc;
					this.audio.currentTime = song.startTime / 1000;
					if (isPlaying) {
						this.audio.play();
					}
				}

				document.getElementById('now-playing-info').style.display = '';

				const duration = MusicboxAudio.calculateDuration(song.duration, song.startTime, song.endTime);
				document.getElementById('now-playing').setAttribute('data-id', song.id);
				document.getElementById('now-playing-time-total').innerText = MusicboxAudio.prettyTime(duration);
				document.getElementById('now-playing-time-current').innerText = MusicboxAudio.prettyTime(0, duration);

				const input = document.getElementById('position-input');
				input.setAttribute('value', 0);
				input.setAttribute('max', duration);
				document.getElementById('position-svg').setAttribute('viewBox', `0 0 ${duration} 1`);
				document.getElementById('position-before').setAttribute('width', duration);

				const img = document.getElementById('now-playing-img');
				img.setAttribute('src', '');
				img.style.visibility = 'hidden';
				img.setAttribute('alt', song.album ? song.album : '');
				img.setAttribute('title', song.album ? song.album : '');

				document.getElementById('now-playing-title').innerText = song.title;
				document.getElementById('now-playing-artist').innerText = song.artist;

				if (Object.hasOwn(this.albumArtCache, song.path)) {
					const src = this.albumArtCache[song.path];
					this.displayAlbumArt(src);
					this.showNotification(song, src);
				} else {
					window.api.parseFile(song.path, newSrc)
						.then((src) => {
							if (this.audio.src !== newSrc) {
								// A different song has started playing while the metadata was being parsed.
								return;
							}

							this.displayAlbumArt(src);
							this.albumArtCache[song.path] = src;
							this.showNotification(song, src);
						});
				}
			});
	}

	displayAlbumArt(src) {
		const img = document.getElementById('now-playing-img');
		if (src) {
			img.setAttribute('src', src);
			img.style.visibility = '';
		} else {
			img.style.visibility = 'hidden';
		}
	}

	showNotification(song, src) {
		if (!window.api.hasFocus()) {
			Notification.requestPermission().then((permission) => {
				if (permission === 'granted') {
					new Notification(song.title, { // eslint-disable-line no-new
						body: song.artist,
						icon: src,
						silent: true,
					});
				}
			});
		}
	}

	static prettyTime(milliseconds, otherMilliseconds = null) {
		const date = new Date(0);
		date.setSeconds(milliseconds / 1000);
		let start;
		const minLength = otherMilliseconds === null ? milliseconds : otherMilliseconds;
		if (minLength < 600000) {
			// X:XX
			start = 15;
		} else if (minLength < 3600000) {
			// XX:XX
			start = 14;
		} else if (minLength < 36000000) {
			// X:XX:XX
			start = 12;
		} else {
			// XX:XX:XX
			start = 11;
		}
		return date.toISOString().substring(start).replace(/\.\d+Z$/, '');
	}
}
