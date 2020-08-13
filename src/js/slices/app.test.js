/* eslint-disable object-curly-newline */
import reducer, {
	initialState,
	selectCurrentQueueIndex,
	selectCurrentSong,
	selectCurrentSongId,
	selectHasQueue,
	selectIsPlaying,
	selectShuffle,
	selectSongIds,
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
			});
		});
	});

	describe('chooseSong', () => {
		describe('when shuffle is on', () => {
			it('moves the song to be next in the queue', async () => {
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
					currentQueueIndex: 2,
					currentSongId: 4,
					isPlaying: true,
					queue: [3, 5, 4, 2, 1],
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

	describe('nextSong', () => {
		describe('when no song is active', () => {
			it('does nothing', async () => {
				expect(reducer({
					currentQueueIndex: null,
				}, {
					type: 'app/nextSong',
				})).toEqual({
					currentQueueIndex: null,
				});
			});
		});

		describe('when the last song in the queue is playing', () => {
			it('stops playback and resets the queue', async () => {
				expect(reducer({
					currentQueueIndex: 4,
					currentSongId: 1,
					isPlaying: true,
					queue: [5, 4, 2, 1],
				}, {
					type: 'app/nextSong',
					payload: {
						songs: {
							1: { id: 1, foo: 'b', bar: 'b', checked: true },
							2: { id: 2, foo: 'c', bar: 'a', checked: true },
							3: { id: 3, foo: 'd', bar: 'c', checked: false },
							4: { id: 4, foo: 'a', bar: 'e', checked: true },
							5: { id: 5, foo: 'e', bar: 'd', checked: true },
						},
					},
				})).toEqual({
					currentQueueIndex: null,
					currentSongId: null,
					isPlaying: false,
					queue: [1, 2, 4, 5],
				});
			});
		});

		describe('when a song other than the last song in the queue is playing', () => {
			it('increments the queue index and sets the current song ID', async () => {
				expect(reducer({
					currentQueueIndex: 0,
					currentSongId: 1,
					queue: [1, 2, 4, 5],
				}, {
					type: 'app/nextSong',
					payload: {
						songs: {
							1: { id: 1, foo: 'b', bar: 'b', checked: true },
							2: { id: 2, foo: 'c', bar: 'a', checked: true },
							3: { id: 3, foo: 'd', bar: 'c', checked: false },
							4: { id: 4, foo: 'a', bar: 'e', checked: true },
							5: { id: 5, foo: 'e', bar: 'd', checked: true },
						},
					},
				})).toEqual({
					currentQueueIndex: 1,
					currentSongId: 2,
					queue: [1, 2, 4, 5],
				});
			});
		});
	});

	describe('populateQueue', () => {
		describe('when shuffle is off', () => {
			it('populates ids and queue in order', async () => {
				expect(reducer({
					shuffle: false,
				}, {
					type: 'app/populateQueue',
					payload: {
						songs: {
							1: { id: 1, foo: 'b', bar: 'b', checked: true },
							2: { id: 2, foo: 'c', bar: 'a', checked: true },
							3: { id: 3, foo: 'd', bar: 'c', checked: false },
							4: { id: 4, foo: 'a', bar: 'e', checked: true },
							5: { id: 5, foo: 'e', bar: 'd', checked: true },
						},
						sortColumn: 'foo',
						sortDirection: 'asc',
					},
				})).toEqual({
					ids: [4, 1, 2, 3, 5],
					queue: [4, 1, 2, 5],
					shuffle: false,
				});
			});
		});

		describe('when shuffle is on', () => {
			it('populates ids in order and randomizes queue', async () => {
				expect(reducer({
					shuffle: true,
				}, {
					type: 'app/populateQueue',
					payload: {
						seed: 'testseed',
						songs: {
							1: { id: 1, foo: 'b', bar: 'b', checked: true },
							2: { id: 2, foo: 'c', bar: 'a', checked: true },
							3: { id: 3, foo: 'd', bar: 'c', checked: false },
							4: { id: 4, foo: 'a', bar: 'e', checked: true },
							5: { id: 5, foo: 'e', bar: 'd', checked: true },
						},
						sortColumn: 'foo',
						sortDirection: 'asc',
					},
				})).toEqual({
					ids: [4, 1, 2, 3, 5],
					queue: [4, 2, 5, 1],
					shuffle: true,
				});
			});
		});
	});

	describe('previousSong', () => {
		describe('when no song is active', () => {
			it('does nothing', async () => {
				expect(reducer({
					currentQueueIndex: null,
				}, {
					type: 'app/previousSong',
				})).toEqual({
					currentQueueIndex: null,
				});
			});
		});

		describe('when the first song in the queue is playing', () => {
			it('stops playback and resets the queue', async () => {
				expect(reducer({
					currentQueueIndex: 0,
					currentSongId: 5,
					isPlaying: true,
					queue: [5, 4, 2, 1],
				}, {
					type: 'app/previousSong',
					payload: {
						songs: {
							1: { id: 1, foo: 'b', bar: 'b', checked: true },
							2: { id: 2, foo: 'c', bar: 'a', checked: true },
							3: { id: 3, foo: 'd', bar: 'c', checked: false },
							4: { id: 4, foo: 'a', bar: 'e', checked: true },
							5: { id: 5, foo: 'e', bar: 'd', checked: true },
						},
					},
				})).toEqual({
					currentQueueIndex: null,
					currentSongId: null,
					isPlaying: false,
					queue: [1, 2, 4, 5],
				});
			});
		});

		describe('when a song other than the first song in the queue is playing', () => {
			it('decrements the queue index and sets the current song ID', async () => {
				expect(reducer({
					currentQueueIndex: 3,
					currentSongId: 5,
					queue: [1, 2, 4, 5],
				}, {
					type: 'app/previousSong',
					payload: {
						songs: {
							1: { id: 1, foo: 'b', bar: 'b', checked: true },
							2: { id: 2, foo: 'c', bar: 'a', checked: true },
							3: { id: 3, foo: 'd', bar: 'c', checked: false },
							4: { id: 4, foo: 'a', bar: 'e', checked: true },
							5: { id: 5, foo: 'e', bar: 'd', checked: true },
						},
					},
				})).toEqual({
					currentQueueIndex: 2,
					currentSongId: 4,
					queue: [1, 2, 4, 5],
				});
			});
		});
	});

	describe('togglePlayback', () => {
		describe('when a song is playing', () => {
			it('pauses playback', async () => {
				expect(reducer({
					isPlaying: true,
				}, {
					type: 'app/togglePlayback',
				})).toEqual({
					isPlaying: false,
				});
			});
		});

		describe('when no song is playing', () => {
			describe('when playback has not started', () => {
				it('starts playback at the beginning of the queue', async () => {
					expect(reducer({
						currentQueueIndex: null,
						currentSongId: null,
						isPlaying: false,
						queue: [2, 3, 1],
					}, {
						type: 'app/togglePlayback',
					})).toEqual({
						currentQueueIndex: 0,
						currentSongId: 2,
						isPlaying: true,
						queue: [2, 3, 1],
					});
				});
			});

			describe('when playback is paused', () => {
				it('resumes playback', async () => {
					expect(reducer({
						currentQueueIndex: 1,
						currentSongId: 3,
						isPlaying: false,
						queue: [2, 3, 1],
					}, {
						type: 'app/togglePlayback',
					})).toEqual({
						currentQueueIndex: 1,
						currentSongId: 3,
						isPlaying: true,
						queue: [2, 3, 1],
					});
				});
			});
		});
	});

	describe('toggleShuffle', () => {
		describe('when shuffle is off', () => {
			it('enables shuffle; randomizes the queue', async () => {
				expect(reducer({
					currentSongId: null,
					queue: [1, 2, 4, 5],
					shuffle: false,
				}, {
					type: 'app/toggleShuffle',
					payload: {
						seed: 'testseed',
						songs: {
							1: { id: 1, foo: 'b', bar: 'b', checked: true },
							2: { id: 2, foo: 'c', bar: 'a', checked: true },
							3: { id: 3, foo: 'd', bar: 'c', checked: false },
							4: { id: 4, foo: 'a', bar: 'e', checked: true },
							5: { id: 5, foo: 'e', bar: 'd', checked: true },
						},
					},
				})).toEqual({
					currentSongId: null,
					queue: [4, 2, 5, 1],
					shuffle: true,
				});
			});

			describe('when a song is already playing', () => {
				it('enables shuffle; randomizes the queue with the current song at the front', async () => {
					expect(reducer({
						currentSongId: 2,
						queue: [1, 2, 4, 5],
						shuffle: false,
					}, {
						type: 'app/toggleShuffle',
						payload: {
							seed: 'testseed',
							songs: {
								1: { id: 1, foo: 'b', bar: 'b', checked: true },
								2: { id: 2, foo: 'c', bar: 'a', checked: true },
								3: { id: 3, foo: 'd', bar: 'c', checked: false },
								4: { id: 4, foo: 'a', bar: 'e', checked: true },
								5: { id: 5, foo: 'e', bar: 'd', checked: true },
							},
						},
					})).toEqual({
						currentQueueIndex: 0,
						currentSongId: 2,
						queue: [2, 4, 5, 1],
						shuffle: true,
					});
				});
			});
		});

		describe('when shuffle is on', () => {
			it('disables shuffle; sorts the queue', async () => {
				expect(reducer({
					currentSongId: null,
					queue: [2, 4, 5, 1],
					shuffle: true,
				}, {
					type: 'app/toggleShuffle',
					payload: {
						songs: {
							1: { id: 1, foo: 'b', bar: 'b', checked: true },
							2: { id: 2, foo: 'c', bar: 'a', checked: true },
							3: { id: 3, foo: 'd', bar: 'c', checked: false },
							4: { id: 4, foo: 'a', bar: 'e', checked: true },
							5: { id: 5, foo: 'e', bar: 'd', checked: true },
						},
					},
				})).toEqual({
					currentSongId: null,
					queue: [1, 2, 4, 5],
					shuffle: false,
				});
			});

			describe('when a song is already playing', () => {
				it('disables shuffle; sorts the queue; moves the queue to the current song', async () => {
					expect(reducer({
						currentSongId: 4,
						queue: [2, 4, 5, 1],
						shuffle: true,
					}, {
						type: 'app/toggleShuffle',
						payload: {
							songs: {
								1: { id: 1, foo: 'b', bar: 'b', checked: true },
								2: { id: 2, foo: 'c', bar: 'a', checked: true },
								3: { id: 3, foo: 'd', bar: 'c', checked: false },
								4: { id: 4, foo: 'a', bar: 'e', checked: true },
								5: { id: 5, foo: 'e', bar: 'd', checked: true },
							},
						},
					})).toEqual({
						currentQueueIndex: 2,
						currentSongId: 4,
						queue: [1, 2, 4, 5],
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
					currentSongId: 2,
				},
				songs: {
					1: { id: 1, foo: 'b', bar: 'b', checked: true },
					2: { id: 2, foo: 'c', bar: 'a', checked: true },
					3: { id: 3, foo: 'd', bar: 'c', checked: false },
					4: { id: 4, foo: 'a', bar: 'e', checked: true },
					5: { id: 5, foo: 'e', bar: 'd', checked: true },
				},
			})).toEqual({ id: 2, foo: 'c', bar: 'a', checked: true });
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
					currentQueueIndex: 2,
					queue: [1, 2, 4, 5],
				},
				songs: {
					1: { id: 1, foo: 'b', bar: 'b', checked: true },
					2: { id: 2, foo: 'c', bar: 'a', checked: true },
					3: { id: 3, foo: 'd', bar: 'c', checked: false },
					4: { id: 4, foo: 'a', bar: 'e', checked: true },
					5: { id: 5, foo: 'e', bar: 'd', checked: true },
				},
			})).toEqual([
				{ id: 4, foo: 'a', bar: 'e', checked: true },
				{ id: 5, foo: 'e', bar: 'd', checked: true },
			]);
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
