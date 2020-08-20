const electron = require('electron');
const fs = require('fs');
const MusicboxAudio = require('./preload/audio');
const registerShortcuts = require('./preload/shortcut');

const json = fs.readFileSync('/Users/jenny/Websites/musicbox/songs.json', 'utf8');
window.audio = new MusicboxAudio();

electron.ipcRenderer.on('hasFocus', (_e, data) => {
	audio.hasFocus = data;
});

electron.contextBridge.exposeInMainWorld('api', {
	getJson: () => {
		return json;
	},
	hasJson: () => {
		return !!json;
	},
	setSong: (song) => {
		window.audio.setSong(song);
	},
	setTime: (time) => {
		window.audio.setTime(time);
	},
	setVolume: (volume) => {
		window.audio.setVolume(volume);
	},
	setIsPlaying: (isPlaying) => {
		if (isPlaying) {
			window.audio.play();
		} else {
			window.audio.pause();
		}
	},
});

registerShortcuts();
