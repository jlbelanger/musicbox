const electron = require('electron');
const fs = require('fs');
const MusicboxAudio = require('./preload/audio');
const registerShortcuts = require('./preload/shortcut');

const filePath = window.localStorage.getItem('filePath');
let json;
if (filePath && fs.existsSync(filePath)) {
	json = fs.readFileSync(filePath, 'utf8');
}
window.audio = new MusicboxAudio();

electron.ipcRenderer.on('hasFocus', (_e, data) => {
	audio.hasFocus = data;
});

electron.ipcRenderer.on('setFileLocation', (_e, filePath) => {
	window.localStorage.setItem('filePath', filePath);
	window.location.reload();
});

electron.contextBridge.exposeInMainWorld('api', {
	allowSuspension: () => {
		electron.ipcRenderer.send('allowSuspension');
	},
	getJson: () => {
		return json;
	},
	getTime: () => {
		return window.audio.audio.currentTime;
	},
	hasJson: () => {
		return !!json;
	},
	preventSuspension: () => {
		electron.ipcRenderer.send('preventSuspension');
	},
	saveFile: (fileContents) => {
		electron.ipcRenderer.send('saveFile', { fileContents });
	},
	setPath: (path) => {
		window.localStorage.setItem('filePath', path);
		window.location.reload();
	},
	setSong: (song, isPlaying) => {
		window.audio.setSong(song, isPlaying);
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
