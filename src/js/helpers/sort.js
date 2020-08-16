const sortTypes = {
	id: 'string',
	title: 'string',
	artist: 'string',
	album: 'string',
	genre: 'string',
	year: 'number',
	date_added: 'string',
	last_played: 'string',
	rating: 'number',
	checked: 'bool',
};

export default (rows, sort) => {
	if (!sort || sort.length <= 0) {
		return rows;
	}
	const { key, direction } = sort[0];
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
