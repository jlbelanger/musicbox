import MusicboxAudio from './audio';

describe('prettyTime', () => {
	describe('with no minimum length', () => {
		it('returns the formatted time', async () => {
			expect(MusicboxAudio.prettyTime(0)).toEqual('0:00');
			expect(MusicboxAudio.prettyTime(1000)).toEqual('0:01');

			expect(MusicboxAudio.prettyTime(9999)).toEqual('0:09');
			expect(MusicboxAudio.prettyTime(10000)).toEqual('0:10');

			expect(MusicboxAudio.prettyTime(59999)).toEqual('0:59');
			expect(MusicboxAudio.prettyTime(60000)).toEqual('1:00');

			expect(MusicboxAudio.prettyTime(599999)).toEqual('9:59');
			expect(MusicboxAudio.prettyTime(600000)).toEqual('10:00');

			expect(MusicboxAudio.prettyTime(3599999)).toEqual('59:59');
			expect(MusicboxAudio.prettyTime(3600000)).toEqual('1:00:00');

			expect(MusicboxAudio.prettyTime(35999999)).toEqual('9:59:59');
			expect(MusicboxAudio.prettyTime(36000000)).toEqual('10:00:00');
		});
	});

	describe('with minimum length', () => {
		it('returns the formatted time', async () => {
			expect(MusicboxAudio.prettyTime(0, 0)).toEqual('0:00');
			expect(MusicboxAudio.prettyTime(0, 1000)).toEqual('0:00');

			expect(MusicboxAudio.prettyTime(0, 9999)).toEqual('0:00');
			expect(MusicboxAudio.prettyTime(0, 10000)).toEqual('0:00');

			expect(MusicboxAudio.prettyTime(0, 59999)).toEqual('0:00');
			expect(MusicboxAudio.prettyTime(0, 60000)).toEqual('0:00');

			expect(MusicboxAudio.prettyTime(0, 599999)).toEqual('0:00');
			expect(MusicboxAudio.prettyTime(0, 600000)).toEqual('00:00');

			expect(MusicboxAudio.prettyTime(0, 3599999)).toEqual('00:00');
			expect(MusicboxAudio.prettyTime(0, 3600000)).toEqual('0:00:00');

			expect(MusicboxAudio.prettyTime(0, 35999999)).toEqual('0:00:00');
			expect(MusicboxAudio.prettyTime(0, 36000000)).toEqual('00:00:00');
		});
	});
});

describe('calculateDuration', () => {
	it('returns the duration', async () => {
		expect(MusicboxAudio.calculateDuration(100, 0, 0)).toEqual(100);
		expect(MusicboxAudio.calculateDuration(100, 10, 0)).toEqual(90);
		expect(MusicboxAudio.calculateDuration(100, 0, 90)).toEqual(90);
		expect(MusicboxAudio.calculateDuration(100, 10, 90)).toEqual(80);
	});
});
