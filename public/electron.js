const { app, BrowserWindow, globalShortcut, protocol } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow() {
	const mainWindow = new BrowserWindow({
		backgroundColor: '#000',
		title: 'Musicbox',
		x: -1920,
		y: 0,
		webPreferences: {
			contextIsolation: true,
			preload: path.join(__dirname, 'preload.js'),
		},
	});
	mainWindow.maximize();
	mainWindow.loadURL(
		isDev
			? 'http://localhost:3000'
			: `file://${path.join(__dirname, 'index.html')}`,
	);

	if (isDev) {
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

	globalShortcut.register('MediaNextTrack', () => {
		mainWindow.webContents.send('shortcut', 'MediaNextTrack');
	});
	globalShortcut.register('MediaPreviousTrack', () => {
		mainWindow.webContents.send('shortcut', 'MediaPreviousTrack');
	});
	globalShortcut.register('MediaPlayPause', () => {
		mainWindow.webContents.send('shortcut', 'MediaPlayPause');
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
