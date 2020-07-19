import dateformat from 'dateformat';

export default (date) => dateformat(new Date(date), 'yyyy-mm-dd, h:MM TT');
