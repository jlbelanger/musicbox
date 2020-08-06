import dateformat from 'dateformat';

export const prettyDate = (date) => dateformat(new Date(date), 'yyyy-mm-dd, h:MM TT');

export const prettyTime = (milliseconds) => {
	const date = new Date(0);
	date.setSeconds(milliseconds / 1000);
	return date.toISOString().substr(11, 8).replace(/^[0:]+/, '');
};
