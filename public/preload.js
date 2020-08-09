const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../songs.json');
const file = fs.readFileSync(filePath, 'utf8');
window.songs = JSON.parse(file);

const electron = require('electron');
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
