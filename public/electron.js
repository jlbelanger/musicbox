const {
	app,
	BrowserWindow,
	dialog,
	globalShortcut,
	ipcMain,
	powerSaveBlocker,
	protocol,
	shell,
	systemPreferences,
} = require('electron'); // eslint-disable-line import/no-extraneous-dependencies
const path = require('path');
const fs = require('fs');
const { loadMusicMetadata } = require('music-metadata'); // eslint-disable-line import/no-unresolved

function createWindow() {
	const mainWindow = new BrowserWindow({
		backgroundColor: '#000',
		title: 'Musicbox',
		x: -1920,
		y: 0,
		webPreferences: {
			contextIsolation: true,
			enableRemoteModule: false,
			nodeIntegration: false,
			preload: path.join(__dirname, 'preload.js'),
		},
	});
	mainWindow.maximize();
	mainWindow.loadURL(
		app.isPackaged
			? `file://${path.join(__dirname, 'index.html')}`
			: 'http://localhost:3000'
	);

	if (!app.isPackaged) {
		mainWindow.webContents.openDevTools();
	}

	return mainWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	let mainWindow = createWindow();

	mainWindow.on('focus', () => {
		mainWindow.webContents.send('hasFocus', true);
	});

	mainWindow.on('blur', () => {
		mainWindow.webContents.send('hasFocus', false);
	});

	app.on('activate', () => {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) {
			mainWindow = createWindow();
		}
	});

	systemPreferences.isTrustedAccessibilityClient(true);
	globalShortcut.register('MediaNextTrack', () => {
		mainWindow.webContents.send('shortcut', 'MediaNextTrack');
	});
	globalShortcut.register('MediaPreviousTrack', () => {
		mainWindow.webContents.send('shortcut', 'MediaPreviousTrack');
	});
	globalShortcut.register('MediaPlayPause', () => {
		mainWindow.webContents.send('shortcut', 'MediaPlayPause');
	});

	ipcMain.handle('fileExists', (_e, filePath) => fs.existsSync(filePath));

	ipcMain.handle('readFile', (_e, filePath) => {
		if (filePath && fs.existsSync(filePath)) {
			const json = fs.readFileSync(filePath, 'utf8');
			return JSON.parse(json);
		}
		return '';
	});

	ipcMain.handle('parseFile', async (_e, filePath) => {
		const mm = await loadMusicMetadata();
		return mm.parseFile(filePath)
			.then((metadata) => {
				const pictures = metadata.common.picture;
				let src;
				if (pictures && pictures.length > 0) {
					const data = Buffer.from(pictures[0].data).toString('base64');
					src = `data:${pictures[0].format};base64,${data}`;
				}
				return src;
			});
	});

	ipcMain.on('saveFile', (_e, { fileContents }) => {
		dialog.showSaveDialog(null, {
			title: 'Choose a location to save the Musicbox library file',
			defaultPath: 'musicbox.json',
		}).then((result) => {
			if (result.filePath) {
				fs.writeFileSync(result.filePath, fileContents, 'utf-8');
				mainWindow.webContents.send('setFileLocation', result.filePath);
			}
		});
	});

	let powerSaveBlockerId;

	ipcMain.on('preventSuspension', () => {
		powerSaveBlockerId = powerSaveBlocker.start('prevent-app-suspension');
	});

	ipcMain.on('allowSuspension', () => {
		powerSaveBlocker.stop(powerSaveBlockerId);
	});

	ipcMain.on('openFileLocation', (_e, filePath) => {
		shell.showItemInFolder(filePath);
	});

	ipcMain.on('writeFile', (_e, filePath, json) => {
		fs.writeFileSync(filePath, JSON.stringify(json, null, '\t'));
	});

	// Allow accessing local files on the dev server.
	protocol.registerFileProtocol('localfile', (request, callback) => {
		const url = request.url.replace('localfile://', '');
		return callback(decodeURIComponent(url));
	});
});

app.on('will-quit', () => {
	globalShortcut.unregisterAll();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
