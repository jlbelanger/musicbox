const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow() {
	const mainWindow = new BrowserWindow({
		backgroundColor: '#000',
		title: 'Musicbox',
		x: -1920,
		y: 0,
		webPreferences: {
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

const http = require('http');
const fs = require('fs');

http.createServer(function(request, response) {
	const params = new URLSearchParams(request.url.replace(/^\/?/, ''));
	const filePath = params.get('path');
	const stat = fs.statSync(filePath);
	const fileSize = stat.size;
	const range = request.headers.range;
	const headers = {
		'Access-Control-Allow-Origin': 'http://localhost:3000',
		'Content-Type': 'audio/mpeg',
	};
	let stream;

	if (range) {
		const parts = range.replace(/bytes=/, '').split('-');
		const start = parseInt(parts[0], 10);
		const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
		const chunkSize = (end - start) + 1;
		headers['Accept-Ranges'] = 'bytes';
		headers['Content-Length'] = chunkSize;
		headers['Content-Range'] = `bytes ${start}-${end}/${fileSize}`;
		response.writeHead(206, headers);

		stream = fs.createReadStream(filePath, { start, end });
	} else {
		headers['Content-Length'] = fileSize;
		response.writeHead(200, headers);

		stream = fs.createReadStream(filePath);
	}
	stream.pipe(response);
})
.listen(2000);
