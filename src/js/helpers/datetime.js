import moment from 'moment';

export const getTimezone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

export const getDatetimeFormat = () => 'YYYY-MM-DD h:mm a z';

export const prettyDatetime = (datetime) => {
	if (!datetime) {
		return '';
	}
	return moment(datetime).tz(getTimezone()).format(getDatetimeFormat());
};

export const prettyTime = (milliseconds, otherMilliseconds = null) => {
	const date = new Date(0);
	date.setSeconds(milliseconds / 1000);
	let start;
	const minLength = otherMilliseconds === null ? milliseconds : otherMilliseconds;
	if (minLength < 600000) {
		// x:xx
		start = 15;
	} else if (minLength < 3600000) {
		// xx:xx
		start = 14;
	} else if (minLength < 36000000) {
		// x:xx:xx
		start = 12;
	} else {
		// xx:xx:xx
		start = 11;
	}
	return date.toISOString().substr(start).replace(/\.\d+Z$/, '');
};
