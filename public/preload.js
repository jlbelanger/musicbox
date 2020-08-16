const electron = require('electron');
const initializeAudio = require('./preload/audio');
const loadSongs = require('./preload/load');
const registerShortcuts = require('./preload/shortcut');

loadSongs('/Users/jenny/Websites/musicbox/songs.json');
initializeAudio();
registerShortcuts();

electron.ipcRenderer.on('hasFocus', (e, data) => {
	window.localStorage.setItem('hasFocus', data);
});
