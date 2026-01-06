/**
 * @jest-environment jsdom
 */
import reducer, {
	initialState,
	selectCurrentQueueIndex,
	selectHasQueue,
	selectIsPlaying,
	selectShuffle,
	selectUpcomingSongs,
} from './app.js';

describe('app', () => {
	describe('initialState', () => {
		it('returns initial state', () => {
			expect(initialState).toEqual({
				currentQueueIndex: null,
				currentSongId: null,
				editSongId: null,
				isPlaying: false,
				queue: [],
				search: false,
				shuffle: false,
			});
		});
	});

	describe('chooseSong', () => {
		describe('when shuffle is on', () => {
			it('moves the song to be next in the queue', () => {
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
			it('moves the queue to the specified song', () => {
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
			it('does nothing', () => {
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
			it('stops playback and resets the queue', () => {
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
			it('increments the queue index and sets the current song ID', () => {
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

	describe('playNext', () => {
		it('moves the song to the front of the queue', () => {
			expect(reducer({
				currentQueueIndex: 1,
				queue: [1, 2, 4, 5],
			}, {
				type: 'app/playNext',
				payload: {
					id: 5,
				},
			})).toEqual({
				currentQueueIndex: 1,
				queue: [1, 2, 5, 4],
			});
		});
	});

	describe('populateQueue', () => {
		describe('when shuffle is off', () => {
			it('populates queue in order', () => {
				expect(reducer({
					currentQueueIndex: null,
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
						sort: [{ column: 'foo', dir: 'asc' }],
					},
				})).toEqual({
					currentQueueIndex: null,
					queue: [4, 1, 2, 5],
					shuffle: false,
				});
			});
		});

		describe('when shuffle is on', () => {
			it('randomizes queue', () => {
				expect(reducer({
					currentQueueIndex: null,
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
						sort: [{ column: 'foo', dir: 'asc' }],
					},
				})).toEqual({
					currentQueueIndex: null,
					queue: [4, 2, 5, 1],
					shuffle: true,
				});
			});
		});
	});

	describe('previousSong', () => {
		describe('when no song is active', () => {
			it('does nothing', () => {
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
			it('stops playback and resets the queue', () => {
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
			it('decrements the queue index and sets the current song ID', () => {
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

	describe('removeFromQueue', () => {
		it('removes the song from the queue', () => {
			expect(reducer({
				queue: [1, 2, 4, 5],
			}, {
				type: 'app/removeFromQueue',
				payload: {
					id: 4,
				},
			})).toEqual({
				queue: [1, 2, 5],
			});
		});
	});

	describe('togglePlayback', () => {
		describe('when a song is playing', () => {
			it('pauses playback', () => {
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
				it('starts playback at the beginning of the queue', () => {
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
				it('resumes playback', () => {
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
			it('enables shuffle; randomizes the queue', () => {
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
				it('enables shuffle; randomizes the queue with the current song at the front', () => {
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
			it('disables shuffle; sorts the queue', () => {
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
				it('disables shuffle; sorts the queue; moves the queue to the current song', () => {
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
		it('returns value of currentQueueIndex', () => {
			expect(selectCurrentQueueIndex({
				app: {
					currentQueueIndex: 'foo',
				},
			})).toBe('foo');
		});
	});

	describe('selectHasQueue', () => {
		describe('when the queue is not empty', () => {
			it('returns true', () => {
				expect(selectHasQueue({
					app: {
						queue: [1],
					},
				})).toBe(true);
			});
		});

		describe('when the queue is empty', () => {
			it('returns false', () => {
				expect(selectHasQueue({
					app: {
						queue: [],
					},
				})).toBe(false);
			});
		});
	});

	describe('selectIsPlaying', () => {
		it('returns value of isPlaying', () => {
			expect(selectIsPlaying({
				app: {
					isPlaying: 'foo',
				},
			})).toBe('foo');
		});
	});

	describe('selectUpcomingSongs', () => {
		it('returns upcoming songs', () => {
			window.songs = {
				1: { id: 1, foo: 'b', bar: 'b', checked: true },
				2: { id: 2, foo: 'c', bar: 'a', checked: true },
				3: { id: 3, foo: 'd', bar: 'c', checked: false },
				4: { id: 4, foo: 'a', bar: 'e', checked: true },
				5: { id: 5, foo: 'e', bar: 'd', checked: true },
			};
			expect(selectUpcomingSongs({
				app: {
					currentQueueIndex: 1,
					queue: [1, 2, 4, 5],
				},
			})).toEqual([
				{ id: 4, foo: 'a', bar: 'e', checked: true },
				{ id: 5, foo: 'e', bar: 'd', checked: true },
			]);
		});
	});

	describe('selectShuffle', () => {
		it('returns value of shuffle', () => {
			expect(selectShuffle({
				app: {
					shuffle: 'foo',
				},
			})).toBe('foo');
		});
	});
});
