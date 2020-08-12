const fs = require('fs');
const path = require('path');
const electron = require('electron');

const filePath = path.join(__dirname, '../songs.json');
const file = fs.readFileSync(filePath, 'utf8');
window.songs = JSON.parse(file);

electron.ipcRenderer.on('shortcut', (e, data) => {
	switch (data) {
		case 'MediaPreviousTrack':
			document.getElementById('previous').click();
			break;

		case 'MediaPlayPause':
			document.getElementById('play-pause').click();
			break;

		case 'MediaNextTrack':
			document.getElementById('next').click();
			break;
	}
});

electron.ipcRenderer.on('hasFocus', (e, data) => {
	window.localStorage.setItem('hasFocus', data);
});
