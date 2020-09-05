const sortTypes = {
	id: 'string',
	title: 'string',
	artist: 'string',
	album: 'string',
	genre: 'string',
	year: 'number',
	dateAdded: 'string',
	lastPlayed: 'string',
	rating: 'number',
	checked: 'bool',
};

export default (rows, sort) => {
	if (!sort || sort.length <= 0) {
		return rows;
	}
	const key = sort[0].column;
	const direction = sort[0].dir;
	const sortType = sortTypes[key];
	return rows.sort((a, b) => {
		const defaultVal = sortType === 'bool' ? false : '';
		let aVal = a[key] ? a[key] : defaultVal;
		let bVal = b[key] ? b[key] : defaultVal;
		if (aVal === bVal) {
			return 0;
		}
		if (sortType !== 'bool') {
			if (aVal === defaultVal) {
				return 1;
			}
			if (bVal === defaultVal) {
				return -1;
			}
		}

		if (sortType === 'number') {
			if (direction === 'asc') {
				return aVal < bVal ? -1 : 1;
			}
			return aVal > bVal ? -1 : 1;
		}

		aVal = aVal.toString();
		bVal = bVal.toString();
		return direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
	});
};
