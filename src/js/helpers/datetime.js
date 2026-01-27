import { DateTime } from 'luxon';

// eslint-disable-next-line new-cap
export const getTimezone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

export const getDatetimeFormat = () => 'yyyy-MM-dd h:mm a ZZZZ';

export const prettyDatetime = (datetime) => {
	if (!datetime) {
		return '';
	}
	return DateTime.fromISO(datetime.replace('+0', 'Z')).toFormat(getDatetimeFormat());
};

export const prettyTime = (milliseconds, otherMilliseconds = null) => {
	const date = new Date(0);
	date.setSeconds(milliseconds / 1000);
	let start;
	const minLength = otherMilliseconds === null ? milliseconds : otherMilliseconds;
	if (minLength < 600000) {
		// X:XX
		start = 15;
	} else if (minLength < 3600000) {
		// XX:XX
		start = 14;
	} else if (minLength < 36000000) {
		// X:XX:XX
		start = 12;
	} else {
		// XX:XX:XX
		start = 11;
	}
	return date
		.toISOString()
		.substring(start)
		.replace(/\.\d+Z$/, '');
};
