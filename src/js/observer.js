import { Howl } from 'howler';
import Storage from './helpers/Storage';
import store from './store';
import watch from 'redux-watch';

export default () => {
	const watchIsPlaying = watch(store.getState, 'app.isPlaying');
	store.subscribe(watchIsPlaying((isPlaying) => {
		if (!window.sound) {
			return;
		}

		const currentSongId = store.getState().app.currentSongId;

		if (Object.keys(window.sound).includes(currentSongId.toString())) {
			if (isPlaying) {
				window.sound[currentSongId].play();
			} else {
				window.sound[currentSongId].pause();
			}
		}
	}));

	const watchCurrentSongId = watch(store.getState, 'app.currentSongId');
	store.subscribe(watchCurrentSongId((currentSongId, previousSongId) => {
		const songs = store.getState().songs;
		const currentSong = songs[currentSongId];
		new Notification(currentSong.title, {
			body: currentSong.artist,
			silent: true,
		});

		if (previousSongId) {
			const previousSound = window.sound[previousSongId];
			previousSound.stop();
		}

		if (!window.sound) {
			window.sound = {};
		}

		if (!window.sound[currentSongId]) {
			window.sound[currentSongId] = new Howl({
				src: `http://localhost:2000/?path=${encodeURIComponent(currentSong.path)}`,
				format: 'mp3',
			});
		}

		window.sound[currentSongId].play();
	}));

	const watchSortColumn = watch(store.getState, 'app.sortColumn');
	store.subscribe(watchSortColumn((newVal) => {
		Storage.set('sortColumn', newVal);
	}));

	const watchSortDirection = watch(store.getState, 'app.sortDirection');
	store.subscribe(watchSortDirection((newVal) => {
		Storage.set('sortDirection', newVal);
	}));

	const watchShuffle = watch(store.getState, 'app.shuffle');
	store.subscribe(watchShuffle((newVal) => {
		Storage.set('shuffle', newVal);
	}));
};
