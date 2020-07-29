import reducer, {
	selectActiveSongs,
	selectHasSongs,
	selectNumActiveSongs,
	selectSongs,
} from './songs';

describe('songs', () => {
	describe('initialState', () => {
		it.todo('returns the songs');
	});

	describe('setRating', () => {
		it('updates the specified song rating', async () => {
			expect(reducer({
				123: { checked: true, id: 123 },
				456: { checked: false, id: 456 },
				789: { checked: true, id: 789 },
			},
			{
				type: 'songs/setRating',
				payload: {
					id: 456,
					value: 'foo',
				},
			})).toEqual({
				123: { checked: true, id: 123 },
				456: { checked: false, id: 456, rating: 'foo' },
				789: { checked: true, id: 789 },
			});
		});
	});

	describe('toggleChecked', () => {
		describe('when the song is not checked', () => {
			it('unchecks the specified song', async () => {
				expect(reducer({
					123: { checked: true, id: 123 },
					456: { checked: false, id: 456 },
					789: { checked: true, id: 789 },
				},
				{
					type: 'songs/toggleChecked',
					payload: 456,
				})).toEqual({
					123: { checked: true, id: 123 },
					456: { checked: true, id: 456 },
					789: { checked: true, id: 789 },
				});
			});
		});

		describe('when the song is checked', () => {
			it('checks the specified song', async () => {
				expect(reducer({
					123: { checked: true, id: 123 },
					456: { checked: true, id: 456 },
					789: { checked: true, id: 789 },
				},
				{
					type: 'songs/toggleChecked',
					payload: 456,
				})).toEqual({
					123: { checked: true, id: 123 },
					456: { checked: false, id: 456 },
					789: { checked: true, id: 789 },
				});
			});
		});
	});

	describe('selectSongs', () => {
		it('returns songs', async () => {
			expect(selectSongs({
				songs: {
					123: { checked: true, id: 123 },
					456: { checked: false, id: 456 },
					789: { checked: true, id: 789 },
				},
			})).toEqual({
				123: { checked: true, id: 123 },
				456: { checked: false, id: 456 },
				789: { checked: true, id: 789 },
			});
		});
	});

	describe('selectActiveSongs', () => {
		it('returns active songs', async () => {
			expect(selectActiveSongs({
				songs: {
					123: { checked: true, id: 123 },
					456: { checked: false, id: 456 },
					789: { checked: true, id: 789 },
				},
			})).toEqual([
				{ checked: true, id: 123 },
				{ checked: true, id: 789 },
			]);
		});
	});

	describe('selectNumActiveSongs', () => {
		it('returns number of active songs', async () => {
			expect(selectNumActiveSongs({
				songs: {
					123: { checked: true, id: 123 },
					456: { checked: false, id: 456 },
					789: { checked: true, id: 789 },
				},
			})).toBe(2);
		});
	});

	describe('selectHasSongs', () => {
		describe('when there are songs', () => {
			it('returns true', async () => {
				expect(selectHasSongs({
					songs: {
						123: { checked: true, id: 123 },
						456: { checked: false, id: 456 },
						789: { checked: true, id: 789 },
					},
				})).toBe(true);
			});
		});

		describe('when there are no songs', () => {
			it('returns false', async () => {
				expect(selectHasSongs({ songs: {} })).toBe(false);
			});
		});
	});
});
