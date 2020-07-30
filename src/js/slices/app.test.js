import reducer, {
	initialState,
	selectCurrentQueueIndex,
	selectCurrentSong,
	selectCurrentSongId,
	selectHasQueue,
	selectIsPlaying,
	selectShuffle,
	selectSongIds,
	selectSortColumn,
	selectSortDirection,
	selectUpcomingSongs,
} from './app';

describe('app', () => {
	describe('initialState', () => {
		it('returns initial state', async () => {
			expect(initialState).toEqual({
				currentQueueIndex: null,
				currentSongId: null,
				ids: [],
				isPlaying: false,
				queue: [],
				shuffle: false,
				sortColumn: 'artist',
				sortDirection: 'asc',
			});
		});
	});

	describe('changeSort', () => {
		describe('when shuffle is on', () => {
			describe('when the column is already sorted ascending', () => {
				it('sorts the ids; changes the direction to descending', async () => {
					expect(reducer({
						ids: [3, 1, 2],
						shuffle: true,
						sortColumn: 'foo',
						sortDirection: 'asc',
					}, {
						type: 'app/changeSort',
						payload: {
							songs: {
								1: { id: 1, foo: 'b', bar: 'a' },
								2: { id: 2, foo: 'c', bar: 'c' },
								3: { id: 3, foo: 'a', bar: 'b' },
							},
							sortColumn: 'foo',
						},
					})).toEqual({
						ids: [2, 1, 3],
						shuffle: true,
						sortColumn: 'foo',
						sortDirection: 'desc',
					});
				});
			});

			describe('when the column is already sorted descending', () => {
				it('sorts the ids; changes the direction to ascending', async () => {
					expect(reducer({
						ids: [2, 1, 3],
						shuffle: true,
						sortColumn: 'foo',
						sortDirection: 'desc',
					}, {
						type: 'app/changeSort',
						payload: {
							songs: {
								1: { id: 1, foo: 'b', bar: 'a' },
								2: { id: 2, foo: 'c', bar: 'c' },
								3: { id: 3, foo: 'a', bar: 'b' },
							},
							sortColumn: 'foo',
						},
					})).toEqual({
						ids: [3, 1, 2],
						shuffle: true,
						sortColumn: 'foo',
						sortDirection: 'asc',
					});
				});
			});

			describe('when a different column is sorted ascending', () => {
				it('sorts the ids; changes the column', async () => {
					expect(reducer({
						ids: [1, 3, 2],
						shuffle: true,
						sortColumn: 'bar',
						sortDirection: 'asc',
					}, {
						type: 'app/changeSort',
						payload: {
							songs: {
								1: { id: 1, foo: 'b', bar: 'a' },
								2: { id: 2, foo: 'c', bar: 'c' },
								3: { id: 3, foo: 'a', bar: 'b' },
							},
							sortColumn: 'foo',
						},
					})).toEqual({
						ids: [3, 1, 2],
						shuffle: true,
						sortColumn: 'foo',
						sortDirection: 'asc',
					});
				});
			});

			describe('when a different column is sorted descending', () => {
				it('sorts the ids; changes the column and direction', async () => {
					expect(reducer({
						ids: [2, 3, 1],
						shuffle: true,
						sortColumn: 'bar',
						sortDirection: 'desc',
					}, {
						type: 'app/changeSort',
						payload: {
							songs: {
								1: { id: 1, foo: 'b', bar: 'a' },
								2: { id: 2, foo: 'c', bar: 'c' },
								3: { id: 3, foo: 'a', bar: 'b' },
							},
							sortColumn: 'foo',
						},
					})).toEqual({
						ids: [3, 1, 2],
						shuffle: true,
						sortColumn: 'foo',
						sortDirection: 'asc',
					});
				});
			});
		});

		describe('when shuffle is off', () => {
			describe('when the column is already sorted ascending', () => {
				it('sorts the ids; updates the queue; changes the direction to descending', async () => {
					expect(reducer({
						currentQueueIndex: null,
						ids: [3, 1, 2],
						queue: [3, 1, 2],
						shuffle: false,
						sortColumn: 'foo',
						sortDirection: 'asc',
					}, {
						type: 'app/changeSort',
						payload: {
							songs: {
								1: { id: 1, foo: 'b', bar: 'a' },
								2: { id: 2, foo: 'c', bar: 'c' },
								3: { id: 3, foo: 'a', bar: 'b' },
							},
							sortColumn: 'foo',
						},
					})).toEqual({
						currentQueueIndex: null,
						ids: [2, 1, 3],
						queue: [2, 1, 3],
						shuffle: false,
						sortColumn: 'foo',
						sortDirection: 'desc',
					});
				});
			});

			describe('when the column is already sorted descending', () => {
				it('sorts the ids; updates the queue; changes the direction to ascending', async () => {
					expect(reducer({
						currentQueueIndex: null,
						ids: [2, 1, 3],
						queue: [2, 1, 3],
						shuffle: false,
						sortColumn: 'foo',
						sortDirection: 'desc',
					}, {
						type: 'app/changeSort',
						payload: {
							songs: {
								1: { id: 1, foo: 'b', bar: 'a' },
								2: { id: 2, foo: 'c', bar: 'c' },
								3: { id: 3, foo: 'a', bar: 'b' },
							},
							sortColumn: 'foo',
						},
					})).toEqual({
						currentQueueIndex: null,
						ids: [3, 1, 2],
						queue: [3, 1, 2],
						shuffle: false,
						sortColumn: 'foo',
						sortDirection: 'asc',
					});
				});
			});

			describe('when a different column is sorted ascending', () => {
				it('sorts the ids; updates the queue; changes the column', async () => {
					expect(reducer({
						currentQueueIndex: null,
						ids: [1, 3, 2],
						queue: [1, 3, 2],
						shuffle: false,
						sortColumn: 'bar',
						sortDirection: 'asc',
					}, {
						type: 'app/changeSort',
						payload: {
							songs: {
								1: { id: 1, foo: 'b', bar: 'a' },
								2: { id: 2, foo: 'c', bar: 'c' },
								3: { id: 3, foo: 'a', bar: 'b' },
							},
							sortColumn: 'foo',
						},
					})).toEqual({
						currentQueueIndex: null,
						ids: [3, 1, 2],
						queue: [3, 1, 2],
						shuffle: false,
						sortColumn: 'foo',
						sortDirection: 'asc',
					});
				});
			});

			describe('when a different column is sorted descending', () => {
				it('sorts the ids; updates the queue; changes the column and direction', async () => {
					expect(reducer({
						currentQueueIndex: null,
						ids: [2, 3, 1],
						queue: [2, 3, 1],
						shuffle: false,
						sortColumn: 'bar',
						sortDirection: 'desc',
					}, {
						type: 'app/changeSort',
						payload: {
							songs: {
								1: { id: 1, foo: 'b', bar: 'a' },
								2: { id: 2, foo: 'c', bar: 'c' },
								3: { id: 3, foo: 'a', bar: 'b' },
							},
							sortColumn: 'foo',
						},
					})).toEqual({
						currentQueueIndex: null,
						ids: [3, 1, 2],
						queue: [3, 1, 2],
						shuffle: false,
						sortColumn: 'foo',
						sortDirection: 'asc',
					});
				});
			});

			describe('when a song is already playing', () => {
				it('moves the queue to the current song', async () => {
					expect(reducer({
						currentQueueIndex: 2,
						currentSongId: 3,
						ids: [2, 1, 3],
						queue: [2, 1, 3],
						shuffle: false,
						sortColumn: 'foo',
						sortDirection: 'desc',
					}, {
						type: 'app/changeSort',
						payload: {
							songs: {
								1: { id: 1, foo: 'b', bar: 'a' },
								2: { id: 2, foo: 'c', bar: 'c' },
								3: { id: 3, foo: 'a', bar: 'b' },
							},
							sortColumn: 'foo',
						},
					})).toEqual({
						currentQueueIndex: 0,
						currentSongId: 3,
						ids: [3, 1, 2],
						queue: [3, 1, 2],
						shuffle: false,
						sortColumn: 'foo',
						sortDirection: 'asc',
					});
				});
			});
		});
	});

	describe('chooseSong', () => {
		describe('when shuffle is on', () => {
			it('moves the song to the front of the queue', async () => {
				expect(reducer({
					currentQueueIndex: 1,
					currentSongId: 5,
					isPlaying: false,
					queue: [3, 5, 2, 4, 1],
					shuffle: true,
				}, {
					type: 'app/chooseSong',
					payload: {
						currentSongId: 4,
					},
				})).toEqual({
					currentQueueIndex: 0,
					currentSongId: 4,
					isPlaying: true,
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
					isPlaying: false,
					queue: [3, 5, 2, 4, 1],
					shuffle: false,
				}, {
					type: 'app/chooseSong',
					payload: {
						currentSongId: 4,
					},
				})).toEqual({
					currentQueueIndex: 3,
					currentSongId: 4,
					isPlaying: true,
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
				type: 'app/decrementQueueIndex',
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
				type: 'app/incrementQueueIndex',
			})).toEqual({
				currentQueueIndex: 2,
				currentSongId: 123,
				queue: [789, 456, 123],
			});
		});
	});

	describe('pausePlayback', () => {
		it.todo('TODO');
	});

	describe('populateQueue', () => {
		describe('when shuffle is off', () => {
			it('populates ids and queue in order', async () => {
				expect(reducer({
					shuffle: false,
					sortColumn: 'foo',
					sortDirection: 'asc',
				}, {
					type: 'app/populateQueue',
					payload: {
						songs: {
							1: { id: 1, foo: 'b', bar: 'a' },
							2: { id: 2, foo: 'c', bar: 'c' },
							3: { id: 3, foo: 'a', bar: 'b' },
						},
					},
				})).toEqual({
					ids: [3, 1, 2],
					queue: [3, 1, 2],
					shuffle: false,
					sortColumn: 'foo',
					sortDirection: 'asc',
				});
			});
		});

		describe('when shuffle is on', () => {
			it.todo('TODO');
		});
	});

	describe('startPlayback', () => {
		it.todo('TODO');
	});

	describe('stopPlayback', () => {
		it.todo('TODO');
	});

	describe('toggleShuffle', () => {
		describe('when shuffle is off', () => {
			it('enables shuffle', async () => {
				expect(reducer({
					currentSongId: null,
					shuffle: false,
				}, {
					type: 'app/toggleShuffle',
					payload: {
						songs: {},
					},
				})).toEqual({
					currentSongId: null,
					queue: [],
					shuffle: true,
				});
			});

			describe('when a song is already playing', () => {
				it('enables shuffle; randomizes the queue with the current song at the front', async () => {
					expect(reducer({
						currentSongId: 3,
						queue: [1, 2, 3, 4, 5],
						shuffle: false,
					}, {
						type: 'app/toggleShuffle',
						payload: {
							seed: 'testseed',
							songs: {
								1: { id: 1, checked: true },
								2: { id: 2, checked: true },
								3: { id: 3, checked: true },
								4: { id: 4, checked: true },
								5: { id: 5, checked: true },
							},
						},
					})).toEqual({
						currentQueueIndex: 0,
						currentSongId: 3,
						queue: [3, 4, 2, 5, 1],
						shuffle: true,
					});
				});
			});
		});

		describe('when shuffle is on', () => {
			it('disables shuffle', async () => {
				expect(reducer({
					currentSongId: null,
					shuffle: true,
				}, {
					type: 'app/toggleShuffle',
					payload: {
						songs: {},
					},
				})).toEqual({
					currentSongId: null,
					queue: [],
					shuffle: false,
				});
			});

			describe('when a song is already playing', () => {
				it('disables shuffle; sorts the queue; moves the queue to the current song', async () => {
					expect(reducer({
						currentSongId: 3,
						queue: [5, 1, 3, 2, 4],
						shuffle: true,
					}, {
						type: 'app/toggleShuffle',
						payload: {
							songs: {
								1: { id: 1, checked: true },
								2: { id: 2, checked: true },
								3: { id: 3, checked: true },
								4: { id: 4, checked: true },
								5: { id: 5, checked: true },
							},
						},
					})).toEqual({
						currentQueueIndex: 2,
						currentSongId: 3,
						queue: [1, 2, 3, 4, 5],
						shuffle: false,
					});
				});
			});
		});
	});

	describe('selectCurrentQueueIndex', () => {
		it('returns value of currentQueueIndex', async () => {
			expect(selectCurrentQueueIndex({
				app: {
					currentQueueIndex: 'foo',
				},
			})).toBe('foo');
		});
	});

	describe('selectCurrentSong', () => {
		it('returns the current song', async () => {
			expect(selectCurrentSong({
				app: {
					currentSongId: 456,
				},
				songs: {
					123: { checked: true, id: 123 },
					456: { checked: false, id: 456 },
					789: { checked: true, id: 789 },
				},
			})).toEqual({ checked: false, id: 456 });
		});
	});

	describe('selectCurrentSongId', () => {
		it('returns value of currentSongId', async () => {
			expect(selectCurrentSongId({
				app: {
					currentSongId: 'foo',
				},
			})).toBe('foo');
		});
	});

	describe('selectSongIds', () => {
		it('returns value of ids', async () => {
			expect(selectSongIds({
				app: {
					ids: 'foo',
				},
			})).toBe('foo');
		});
	});

	describe('selectHasQueue', () => {
		describe('when the queue is not empty', () => {
			it('returns true', async () => {
				expect(selectHasQueue({
					app: {
						queue: [1],
					},
				})).toBe(true);
			});
		});

		describe('when the queue is empty', () => {
			it('returns false', async () => {
				expect(selectHasQueue({
					app: {
						queue: [],
					},
				})).toBe(false);
			});
		});
	});

	describe('selectIsPlaying', () => {
		it('returns value of isPlaying', async () => {
			expect(selectIsPlaying({
				app: {
					isPlaying: 'foo',
				},
			})).toBe('foo');
		});
	});

	describe('selectUpcomingSongs', () => {
		it('returns upcoming songs', async () => {
			expect(selectUpcomingSongs({
				app: {
					currentQueueIndex: 1,
					queue: [789, 456, 123],
				},
				songs: {
					123: { checked: true, id: 123 },
					456: { checked: false, id: 456 },
					789: { checked: true, id: 789 },
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
				app: {
					sortColumn: 'foo',
				},
			})).toBe('foo');
		});
	});

	describe('selectSortDirection', () => {
		it('returns value of sortDirection', async () => {
			expect(selectSortDirection({
				app: {
					sortDirection: 'foo',
				},
			})).toBe('foo');
		});
	});

	describe('selectShuffle', () => {
		it('returns value of shuffle', async () => {
			expect(selectShuffle({
				app: {
					shuffle: 'foo',
				},
			})).toBe('foo');
		});
	});
});
