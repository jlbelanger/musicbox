import Storage from './helpers/Storage';
import store from './store';
import watch from 'redux-watch';

export default () => {
	const watchCurrentSongId = watch(store.getState, 'app.currentSongId');
	store.subscribe(watchCurrentSongId((currentSongId, oldSongId) => {
		const currentSong = window.songs[currentSongId];
		if (!Storage.get('hasFocus')) {
			new Notification(currentSong.title, { // eslint-disable-line no-new
				body: currentSong.artist,
				silent: true,
			});
		}

		window.table.table.updateData([
			{ id: currentSongId, state: store.getState().app.isPlaying },
			{ id: oldSongId, state: null },
		]);
	}));

	const watchShuffle = watch(store.getState, 'app.shuffle');
	store.subscribe(watchShuffle((newVal) => {
		Storage.set('shuffle', newVal);
	}));

	const watchIsPlaying = watch(store.getState, 'app.isPlaying');
	store.subscribe(watchIsPlaying((isPlaying) => {
		window.table.table.updateData([
			{ id: store.getState().app.currentSongId, state: isPlaying },
		]);
	}));
};
