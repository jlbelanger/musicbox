import { prettyDate, prettyTime } from './datetime';

describe('prettyDate', () => {
	it('returns the formatted date', async () => {
		expect(prettyDate('2001-02-03T12:05:06Z')).toEqual('2001-02-03, 7:05 AM');
	});
});

describe('prettyTime', () => {
	describe('with no minimum length', () => {
		it('returns the formatted time', async () => {
			expect(prettyTime(0)).toEqual('0:00');
			expect(prettyTime(1000)).toEqual('0:01');

			expect(prettyTime(9999)).toEqual('0:09');
			expect(prettyTime(10000)).toEqual('0:10');

			expect(prettyTime(59999)).toEqual('0:59');
			expect(prettyTime(60000)).toEqual('1:00');

			expect(prettyTime(599999)).toEqual('9:59');
			expect(prettyTime(600000)).toEqual('10:00');

			expect(prettyTime(3599999)).toEqual('59:59');
			expect(prettyTime(3600000)).toEqual('1:00:00');

			expect(prettyTime(35999999)).toEqual('9:59:59');
			expect(prettyTime(36000000)).toEqual('10:00:00');
		});
	});

	describe('with minimum length', () => {
		it('returns the formatted time', async () => {
			expect(prettyTime(0, 0)).toEqual('0:00');
			expect(prettyTime(0, 1000)).toEqual('0:00');

			expect(prettyTime(0, 9999)).toEqual('0:00');
			expect(prettyTime(0, 10000)).toEqual('0:00');

			expect(prettyTime(0, 59999)).toEqual('0:00');
			expect(prettyTime(0, 60000)).toEqual('0:00');

			expect(prettyTime(0, 599999)).toEqual('0:00');
			expect(prettyTime(0, 600000)).toEqual('00:00');

			expect(prettyTime(0, 3599999)).toEqual('00:00');
			expect(prettyTime(0, 3600000)).toEqual('0:00:00');

			expect(prettyTime(0, 35999999)).toEqual('0:00:00');
			expect(prettyTime(0, 36000000)).toEqual('00:00:00');
		});
	});
});
