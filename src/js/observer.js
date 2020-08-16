import Storage from './helpers/Storage';
import store from './store';
import watch from 'redux-watch';

export default () => {
	const watchCurrentSongId = watch(store.getState, 'app.currentSongId');
	store.subscribe(watchCurrentSongId((currentSongId, oldSongId) => {
		window.table.table.updateData([
			{ id: oldSongId, state: null },
		]);

		if (!currentSongId) {
			return;
		}

		const isPlaying = store.getState().app.isPlaying;
		window.table.table.updateData([
			{ id: currentSongId, state: isPlaying },
		]);

		if (isPlaying) {
			window.currentSongId = currentSongId;
			document.dispatchEvent(new Event('song-change'));
		}

		window.table.table.scrollToRow(currentSongId, 'top', false);
	}));

	const watchShuffle = watch(store.getState, 'app.shuffle');
	store.subscribe(watchShuffle((newVal) => {
		Storage.set('shuffle', newVal);
	}));

	const watchIsPlaying = watch(store.getState, 'app.isPlaying');
	store.subscribe(watchIsPlaying((isPlaying) => {
		const currentSongId = store.getState().app.currentSongId;
		window.table.table.updateData([
			{ id: currentSongId, state: isPlaying },
		]);

		if (isPlaying) {
			document.dispatchEvent(new Event('song-play'));
		} else {
			document.dispatchEvent(new Event('song-pause'));
		}
	}));
};
