const electron = require('electron'); // eslint-disable-line import/no-extraneous-dependencies

const filePath = window.localStorage.getItem('filePath');
const parsedJson = electron.ipcRenderer.invoke('readFile', filePath);

electron.ipcRenderer.on('hasFocus', (_e, data) => {
	window.hasFocus = data;
});

electron.ipcRenderer.on('setFileLocation', (_e, newFilePath) => {
	window.localStorage.setItem('filePath', newFilePath);
	window.location.reload();
});

electron.contextBridge.exposeInMainWorld('api', {
	addJsonPlay: (id, date) => {
		parsedJson.then((json) => {
			json.plays[date] = id;
			electron.ipcRenderer.send('writeFile', filePath, json);
		});
	},
	addJsonSkip: (id, date) => {
		parsedJson.then((json) => {
			json.skips[date] = id;
			electron.ipcRenderer.send('writeFile', filePath, json);
		});
	},
	allowSuspension: () => {
		electron.ipcRenderer.send('allowSuspension');
	},
	getData: async () => (parsedJson),
	hasFocus: () => (window.hasFocus === undefined ? true : window.hasFocus),
	hasJson: async () => (!!parsedJson),
	openFileLocation: (path) => {
		electron.ipcRenderer.send('openFileLocation', path);
	},
	preventSuspension: () => {
		electron.ipcRenderer.send('preventSuspension');
	},
	fileExists: (path) => (electron.ipcRenderer.invoke('fileExists', path)),
	parseFile: (path) => (electron.ipcRenderer.invoke('parseFile', path)),
	saveFile: (fileContents) => {
		electron.ipcRenderer.send('saveFile', { fileContents });
	},
	updateJsonSong: (id, data) => {
		parsedJson.then((json) => {
			Object.keys(data).forEach((key) => {
				json.songs[id][key] = data[key];
			});
			electron.ipcRenderer.send('writeFile', filePath, json);
		});
	},
});

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
