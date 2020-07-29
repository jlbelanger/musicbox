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

	describe('chooseSong', () => {
		describe('when shuffle is on', () => {
			it('moves the song to the front of the queue', async () => {
				expect(reducer({
					currentQueueIndex: 1,
					currentSongId: 5,
					queue: [3, 5, 2, 4, 1],
					shuffle: true,
				}, {
					type: 'queue/chooseSong',
					payload: 4,
				})).toEqual({
					currentQueueIndex: 0,
					currentSongId: 4,
					queue: [4, 3, 5, 2, 1],
					shuffle: true,
				});
			});
		});

		describe('when shuffle is off', () => {
			it('moves the queue to the specified song', async () => {
				expect(reducer({
					currentQueueIndex: 1,
					currentSongId: 5,
					queue: [3, 5, 2, 4, 1],
					shuffle: false,
				}, {
					type: 'queue/chooseSong',
					payload: 4,
				})).toEqual({
					currentQueueIndex: 3,
					currentSongId: 4,
					queue: [3, 5, 2, 4, 1],
					shuffle: false,
				});
			});
		});
	});

	describe('decrementQueueIndex', () => {
		it('decrements the queue index and sets the current song ID', async () => {
			expect(reducer({
				currentQueueIndex: 1,
				currentSongId: 456,
				queue: [789, 456, 123],
			}, {
				type: 'queue/decrementQueueIndex',
			})).toEqual({
				currentQueueIndex: 0,
				currentSongId: 789,
				queue: [789, 456, 123],
			});
		});
	});

	describe('incrementQueueIndex', () => {
		it('increments the queue index and sets the current song ID', async () => {
			expect(reducer({
				currentQueueIndex: 1,
				currentSongId: 456,
				queue: [789, 456, 123],
			}, {
				type: 'queue/incrementQueueIndex',
			})).toEqual({
				currentQueueIndex: 2,
				currentSongId: 123,
				queue: [789, 456, 123],
			});
		});
	});

	describe('setQueue', () => {
		it.todo('TODO');
	});

	describe('sortColumn', () => {
		describe('when the column is already sorted ascending', () => {
			it('changes the direction to descending', async () => {
				expect(reducer({
					sortColumn: 'foo',
					sortDirection: 'asc',
				}, {
					type: 'queue/sortColumn',
					payload: 'foo',
				})).toEqual({
					sortColumn: 'foo',
					sortDirection: 'desc',
				});
			});
		});

		describe('when the column is already sorted descending', () => {
			it('changes the direction to ascending', async () => {
				expect(reducer({
					sortColumn: 'foo',
					sortDirection: 'desc',
				}, {
					type: 'queue/sortColumn',
					payload: 'foo',
				})).toEqual({
					sortColumn: 'foo',
					sortDirection: 'asc',
				});
			});
		});

		describe('when a different column is sorted ascending', () => {
			it('changes the column', async () => {
				expect(reducer({
					sortColumn: 'foo',
					sortDirection: 'asc',
				}, {
					type: 'queue/sortColumn',
					payload: 'bar',
				})).toEqual({
					sortColumn: 'bar',
					sortDirection: 'asc',
				});
			});
		});

		describe('when a different column is sorted descending', () => {
			it('changes the column and direction', async () => {
				expect(reducer({
					sortColumn: 'foo',
					sortDirection: 'desc',
				}, {
					type: 'queue/sortColumn',
					payload: 'bar',
				})).toEqual({
					sortColumn: 'bar',
					sortDirection: 'asc',
				});
			});
		});
	});

	describe('startQueue', () => {
		it.todo('TODO');
	});

	describe('stopQueue', () => {
		it.todo('TODO');
	});

	describe('toggleShuffle', () => {
		describe('when shuffle is off', () => {
			it('enables shuffle', async () => {
				expect(reducer({
					shuffle: false,
				}, {
					type: 'queue/toggleShuffle',
				})).toEqual({
					shuffle: true,
				});
			});
		});

		describe('when shuffle is on', () => {
			it('disables shuffle', async () => {
				expect(reducer({
					shuffle: true,
				}, {
					type: 'queue/toggleShuffle',
				})).toEqual({
					shuffle: false,
				});
			});
		});
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
			expect(selectCurrentSongId({
				queue: {
					currentSongId: 'foo',
				},
			})).toBe('foo');
		});
	});

	describe('selectSongIds', () => {
		it('returns value of ids', async () => {
			expect(selectSongIds({
				queue: {
					ids: 'foo',
				},
			})).toBe('foo');
		});
	});

	describe('selectHasQueue', () => {
		describe('when the queue is not empty', () => {
			it('returns true', async () => {
				expect(selectHasQueue({
					queue: {
						queue: [1],
					},
				})).toBe(true);
			});
		});

		describe('when the queue is empty', () => {
			it('returns false', async () => {
				expect(selectHasQueue({
					queue: {
						queue: [],
					},
				})).toBe(false);
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
			expect(selectSortColumn({
				queue: {
					sortColumn: 'foo',
				},
			})).toBe('foo');
		});
	});

	describe('selectSortDirection', () => {
		it('returns value of sortDirection', async () => {
			expect(selectSortDirection({
				queue: {
					sortDirection: 'foo',
				},
			})).toBe('foo');
		});
	});

	describe('selectShuffle', () => {
		it('returns value of shuffle', async () => {
			expect(selectShuffle({
				queue: {
					shuffle: 'foo',
				},
			})).toBe('foo');
		});
	});
});
