import reducer, { initialState, selectRepeat } from './repeat';

describe('repeat', () => {
	describe('initialState', () => {
		it('returns false', async () => {
			expect(initialState).toBe(false);
		});
	});

	describe('toggleRepeat', () => {
		describe('when the state is true', () => {
			it('returns false', async () => {
				expect(reducer(true, { type: 'repeat/toggleRepeat' })).toBe(false);
			});
		});

		describe('when the state is false', () => {
			it('returns true', async () => {
				expect(reducer(false, { type: 'repeat/toggleRepeat' })).toBe(true);
			});
		});
	});

	describe('selectRepeat', () => {
		it('returns value of repeat', async () => {
			expect(selectRepeat({ repeat: 'foo' })).toBe('foo');
		});
	});
});
