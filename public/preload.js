const electron = require('electron');
const fs = require('fs');
const MusicboxAudio = require('./preload/audio');
const registerShortcuts = require('./preload/shortcut');

const filePath = window.localStorage.getItem('filePath');
let json;
let parsedJson;
if (filePath && fs.existsSync(filePath)) {
	json = fs.readFileSync(filePath, 'utf8');
	parsedJson = JSON.parse(json);
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
	getSongs: () => {
		return parsedJson;
	},
	getTime: () => {
		return window.audio.audio.currentTime;
	},
	hasJson: () => {
		return !!json;
	},
	incrementPlays: (songId) => {
		parsedJson[songId].numPlays += 1;
		parsedJson[songId].lastPlayed = new Date().toISOString();
		fs.writeFileSync(filePath, JSON.stringify(parsedJson));
		return {
			id: songId,
			numPlays: parsedJson[songId].numPlays,
			lastPlayed: parsedJson[songId].lastPlayed,
		};
	},
	incrementSkips: (songId) => {
		parsedJson[songId].numSkips += 1;
		parsedJson[songId].lastSkipped = new Date().toISOString();
		fs.writeFileSync(filePath, JSON.stringify(parsedJson));
		return {
			id: songId,
			numSkips: parsedJson[songId].numSkips,
			lastSkipped: parsedJson[songId].lastSkipped,
		};
	},
	openFileLocation: (path) => {
		electron.ipcRenderer.send('openFileLocation', path);
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
