import Storage from './helpers/Storage';
import store from './store';
import watch from 'redux-watch';

export default () => {
	const watchSortColumn = watch(store.getState, 'queue.sortColumn');
	store.subscribe(watchSortColumn((newVal) => {
		Storage.set('sortColumn', newVal);
	}));

	const watchSortDirection = watch(store.getState, 'queue.sortDirection');
	store.subscribe(watchSortDirection((newVal) => {
		Storage.set('sortDirection', newVal);
	}));

	const watchRepeat = watch(store.getState, 'queue.repeat');
	store.subscribe(watchRepeat((newVal) => {
		Storage.set('repeat', newVal);
	}));

	const watchShuffle = watch(store.getState, 'queue.shuffle');
	store.subscribe(watchShuffle((newVal) => {
		Storage.set('shuffle', newVal);
	}));
};
