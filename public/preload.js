const electron = require('electron');
const registerShortcuts = require('./preload/shortcut');
const Musicbox = require('./preload/musicbox');
const MusicboxAudio = require('./preload/audio');
const MusicboxTable = require('./preload/table');

registerShortcuts();

const musicbox = Musicbox.get();
const audio = MusicboxAudio.get();
const table = new MusicboxTable(musicbox.songs);

electron.ipcRenderer.on('hasFocus', (e, data) => {
	audio.hasFocus = data;
});

electron.contextBridge.exposeInMainWorld('musicbox', {
	audio: musicbox.audio,
	hasSongs: () => { return musicbox.hasSongs(); },
	setCurrentSong: (newSongId, isPlaying) => {
		const oldSongId = musicbox.currentSongId;
		const newData = [];
		if (oldSongId) {
			newData.push({ id: oldSongId, state: null });
		}
		if (newSongId) {
			newData.push({ id: newSongId, state: isPlaying });
		}

		musicbox.setCurrentSong(newSongId);

		table.table.updateData(newData);
		if (newSongId) {
			table.table.scrollToRow(newSongId, 'top', false);
		}

		audio.changeSong(musicbox.currentSong);
	},
	setTime: (time) => {
		audio.setTime(time);
	},
	setVolume: (volume) => {
		audio.setVolume(volume);
	},
	songs: musicbox.songs,
	setIsPlaying: (id, isPlaying) => {
		table.table.updateData([{ id: id, state: isPlaying }]);
		if (isPlaying) {
			audio.play();
		} else {
			audio.pause();
		}
	},
});
