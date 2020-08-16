const fs = require('fs');

module.exports = class Musicbox {
	constructor() {
		this.currentSong = null;
		this.currentSongId = null;
		this.songs = this.loadSongs('/Users/jenny/Websites/musicbox/songs.json');
	}

	static get() {
		if (!window.Musicbox) {
			window.Musicbox = new Musicbox();
		}
		return window.Musicbox;
	}

	hasSongs() {
		return Object.keys(this.songs).length > 0;
	}

	loadSongs(filePath) {
		const file = fs.readFileSync(filePath, 'utf8');
		return JSON.parse(file);
	}

	setCurrentSong(newSongId) {
		this.currentSongId = newSongId;
		this.currentSong = this.songs[newSongId];
	}
};
