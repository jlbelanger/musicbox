import Storage from './helpers/Storage';
import store from './store';
import watch from 'redux-watch';

export default () => {
	const watchCurrentSongId = watch(store.getState, 'app.currentSongId');
	store.subscribe(watchCurrentSongId((currentSongId, oldSongId) => {
		const isPlaying = store.getState().app.isPlaying;

		const newData = [];
		if (oldSongId) {
			newData.push({ id: oldSongId, state: null });
		}
		if (currentSongId) {
			newData.push({ id: currentSongId, state: isPlaying });
		}

		window.musicboxTable.table.updateData(newData);
		if (currentSongId) {
			window.musicboxTable.table.scrollToRow(currentSongId, 'top', false);
		}

		window.audio.setSong(window.songs[currentSongId], isPlaying);
	}));

	const watchShuffle = watch(store.getState, 'app.shuffle');
	store.subscribe(watchShuffle((newVal) => {
		Storage.set('shuffle', newVal);
	}));

	const watchIsPlaying = watch(store.getState, 'app.isPlaying');
	store.subscribe(watchIsPlaying((isPlaying) => {
		const currentSongId = store.getState().app.currentSongId;
		window.musicboxTable.table.updateData([{ id: currentSongId, state: isPlaying }]);
		window.audio.setIsPlaying(isPlaying);
		if (isPlaying) {
			window.api.preventSuspension();
		} else {
			window.api.allowSuspension();
		}
	}));
};
