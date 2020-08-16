const electron = require('electron');

module.exports = () => {
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
};
