const electron = require('electron'); // eslint-disable-line import/no-extraneous-dependencies
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
	window.audio.hasFocus = data;
});

electron.ipcRenderer.on('setFileLocation', (_e, newFilePath) => {
	window.localStorage.setItem('filePath', newFilePath);
	window.location.reload();
});

electron.contextBridge.exposeInMainWorld('api', {
	addJsonPlay: (id, date) => {
		parsedJson.plays[date] = id;
		fs.writeFileSync(filePath, JSON.stringify(parsedJson, null, '\t'));
	},
	addJsonSkip: (id, date) => {
		parsedJson.skips[date] = id;
		fs.writeFileSync(filePath, JSON.stringify(parsedJson, null, '\t'));
	},
	allowSuspension: () => {
		electron.ipcRenderer.send('allowSuspension');
	},
	getLastFm: () => (parsedJson.lastfm),
	getSongs: () => (parsedJson.songs),
	getTime: () => (window.audio.audio.currentTime),
	hasJson: () => (!!json),
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
	updateJsonSong: (id, data) => {
		Object.keys(data).forEach((key) => {
			parsedJson.songs[id][key] = data[key];
		});
		fs.writeFileSync(filePath, JSON.stringify(parsedJson, null, '\t'));
	},
});

registerShortcuts();
