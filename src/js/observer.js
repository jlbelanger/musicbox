import Storage from './helpers/Storage';
import store from './store';
import watch from 'redux-watch';

export default () => {
	const watchSortColumn = watch(store.getState, 'app.sortColumn');
	store.subscribe(watchSortColumn((newVal) => {
		Storage.set('sortColumn', newVal);
	}));

	const watchSortDirection = watch(store.getState, 'app.sortDirection');
	store.subscribe(watchSortDirection((newVal) => {
		Storage.set('sortDirection', newVal);
	}));

	const watchRepeat = watch(store.getState, 'app.repeat');
	store.subscribe(watchRepeat((newVal) => {
		Storage.set('repeat', newVal);
	}));

	const watchShuffle = watch(store.getState, 'app.shuffle');
	store.subscribe(watchShuffle((newVal) => {
		Storage.set('shuffle', newVal);
	}));
};
