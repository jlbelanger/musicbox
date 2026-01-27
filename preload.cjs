const { contextBridge, ipcRenderer } = require('electron');

let parsedJson;

ipcRenderer.on('hasFocus', (_e, data) => {
	window.hasFocus = data;
});

const readFile = (filePath) => {
	if (!parsedJson) {
		parsedJson = ipcRenderer.invoke('readFile', filePath);
	}
	return parsedJson;
};

contextBridge.exposeInMainWorld('api', {
	addJsonPlay: (id, date, filePath) => {
		readFile(filePath).then((json) => {
			json.plays[date] = id;
			ipcRenderer.send('writeFile', filePath, json);
		});
	},
	addJsonSkip: (id, date, filePath) => {
		readFile(filePath).then((json) => {
			json.skips[date] = id;
			ipcRenderer.send('writeFile', filePath, json);
		});
	},
	allowSuspension: () => {
		ipcRenderer.send('allowSuspension');
	},
	getData: (filePath) => readFile(filePath),
	hasFocus: () => (window.hasFocus === undefined ? true : window.hasFocus),
	openFileLocation: (filePath) => {
		ipcRenderer.send('openFileLocation', filePath);
	},
	preventSuspension: () => {
		ipcRenderer.send('preventSuspension');
	},
	fileExists: (filePath) => ipcRenderer.invoke('fileExists', filePath),
	parseFile: (filePath) => ipcRenderer.invoke('parseFile', filePath),
	saveFile: (fileContents) => {
		ipcRenderer.send('saveFile', { fileContents });
	},
	updateJsonSong: (id, data, filePath) => {
		readFile(filePath).then((json) => {
			Object.keys(data).forEach((key) => {
				json.songs[id][key] = data[key];
			});
			ipcRenderer.send('writeFile', filePath, json);
		});
	},
});

ipcRenderer.on('shortcut', (e, data) => {
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
