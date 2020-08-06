const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow() {
	const mainWindow = new BrowserWindow({
		backgroundColor: '#000',
		title: 'Musicbox',
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
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
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
	const headers = {
		'Content-Type': 'audio/mpeg',
		'Content-Length': stat.size,
		'Access-Control-Allow-Origin': 'http://localhost:3000',
	};

	response.writeHead(200, headers);

	var stream = fs.createReadStream(filePath);
	stream.pipe(response);
})
.listen(2000);
