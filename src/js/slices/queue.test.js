import reducer, {
	initialState,
	selectCurrentQueueIndex,
	selectCurrentSong,
	selectCurrentSongId,
	selectHasQueue,
	selectShuffle,
	selectSongIds,
	selectSortColumn,
	selectSortDirection,
	selectUpcomingSongs,
} from './queue';

describe('queue', () => {
	describe('initialState', () => {
		it('returns initial state', async () => {
			expect(initialState).toEqual({
				currentQueueIndex: null,
				currentSongId: null,
				ids: [],
				queue: [],
				shuffle: false,
				sortColumn: 'artist',
				sortDirection: 'asc',
			});
		});
	});

	describe('decrementQueueIndex', () => {
		it.todo('TODO');
	});

	describe('incrementQueueIndex', () => {
		it.todo('TODO');
	});

	describe('moveSongToFrontOfQueue', () => {
		it.todo('TODO');
	});

	describe('setCurrentSongId', () => {
		it.todo('TODO');
	});

	describe('setQueue', () => {
		it.todo('TODO');
	});

	describe('sortColumn', () => {
		it.todo('TODO');
	});

	describe('startQueue', () => {
		it.todo('TODO');
	});

	describe('stopQueue', () => {
		it.todo('TODO');
	});

	describe('toggleShuffle', () => {
		it.todo('TODO');
	});

	describe('selectCurrentQueueIndex', () => {
		it('returns value of currentQueueIndex', async () => {
			expect(selectCurrentQueueIndex({ queue: { currentQueueIndex: 'foo' } })).toBe('foo');
		});
	});

	describe('selectCurrentSong', () => {
		it('returns the current song', async () => {
			expect(selectCurrentSong({
				songs: {
					123: { checked: true, id: 123 },
					456: { checked: false, id: 456 },
					789: { checked: true, id: 789 },
				},
				queue: {
					currentSongId: 456,
				},
			})).toEqual({ checked: false, id: 456 });
		});
	});

	describe('selectCurrentSongId', () => {
		it('returns value of currentSongId', async () => {
			expect(selectCurrentSongId({ queue: { currentSongId: 'foo' } })).toBe('foo');
		});
	});

	describe('selectSongIds', () => {
		it('returns value of ids', async () => {
			expect(selectSongIds({ queue: { ids: 'foo' } })).toBe('foo');
		});
	});

	describe('selectHasQueue', () => {
		describe('when the queue is not empty', () => {
			it('returns true', async () => {
				expect(selectHasQueue({ queue: { queue: [1] } })).toBe(true);
			});
		});

		describe('when the queue is empty', () => {
			it('returns false', async () => {
				expect(selectHasQueue({ queue: { queue: [] } })).toBe(false);
			});
		});
	});

	describe('selectUpcomingSongs', () => {
		it('returns upcoming songs', async () => {
			expect(selectUpcomingSongs({
				songs: {
					123: { checked: true, id: 123 },
					456: { checked: false, id: 456 },
					789: { checked: true, id: 789 },
				},
				queue: {
					currentQueueIndex: 1,
					queue: [789, 456, 123],
				},
			})).toEqual([
				{ checked: false, id: 456 },
				{ checked: true, id: 123 },
			]);
		});
	});

	describe('selectSortColumn', () => {
		it('returns value of sortColumn', async () => {
			expect(selectSortColumn({ queue: { sortColumn: 'foo' } })).toBe('foo');
		});
	});

	describe('selectSortDirection', () => {
		it('returns value of sortDirection', async () => {
			expect(selectSortDirection({ queue: { sortDirection: 'foo' } })).toBe('foo');
		});
	});

	describe('selectShuffle', () => {
		it('returns value of shuffle', async () => {
			expect(selectShuffle({ queue: { shuffle: 'foo' } })).toBe('foo');
		});
	});
});
