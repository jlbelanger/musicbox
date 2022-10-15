const electron = require('electron');

module.exports = () => {
	electron.ipcRenderer.on('shortcut', (e, data) => {
		switch (data) { // eslint-disable-line default-case
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
