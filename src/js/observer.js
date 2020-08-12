import Storage from './helpers/Storage';
import store from './store';
import watch from 'redux-watch';

export default () => {
	const watchCurrentSongId = watch(store.getState, 'app.currentSongId');
	store.subscribe(watchCurrentSongId((currentSongId) => {
		const currentSong = window.songs[currentSongId];
		if (Storage.get('hasFocus')) {
			return;
		}
		new Notification(currentSong.title, { // eslint-disable-line no-new
			body: currentSong.artist,
			silent: true,
		});
	}));

	const watchShuffle = watch(store.getState, 'app.shuffle');
	store.subscribe(watchShuffle((newVal) => {
		Storage.set('shuffle', newVal);
	}));
};
