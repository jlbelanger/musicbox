import reducer, { initialState, selectIsPlaying } from './isPlaying';

describe('isPlaying', () => {
	describe('initialState', () => {
		it('returns false', async () => {
			expect(initialState).toBe(false);
		});
	});

	describe('startPlaying', () => {
		it('returns true', async () => {
			expect(reducer(null, { type: 'isPlaying/startPlaying' })).toBe(true);
		});
	});

	describe('stopPlaying', () => {
		it('returns false', async () => {
			expect(reducer(null, { type: 'isPlaying/stopPlaying' })).toBe(false);
		});
	});

	describe('selectIsPlaying', () => {
		it('returns value of isPlaying', async () => {
			expect(selectIsPlaying({ isPlaying: 'foo' })).toBe('foo');
		});
	});
});
