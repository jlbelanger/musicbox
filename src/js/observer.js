import Storage from './helpers/Storage';
import store from './store';
import watch from 'redux-watch';

export default () => {
	const watchCurrentSongId = watch(store.getState, 'app.currentSongId');
	store.subscribe(watchCurrentSongId((currentSongId) => {
		const isPlaying = store.getState().app.isPlaying;
		window.musicbox.setCurrentSong(currentSongId, isPlaying);
	}));

	const watchShuffle = watch(store.getState, 'app.shuffle');
	store.subscribe(watchShuffle((newVal) => {
		Storage.set('shuffle', newVal);
	}));

	const watchIsPlaying = watch(store.getState, 'app.isPlaying');
	store.subscribe(watchIsPlaying((isPlaying) => {
		const currentSongId = store.getState().app.currentSongId;
		window.musicbox.setIsPlaying(currentSongId, isPlaying);
	}));
};
