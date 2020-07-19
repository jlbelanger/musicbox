export default class Storage {
	static get(key, defaultValue) {
		const value = window.localStorage.getItem(key);
		if (value === null) {
			return defaultValue;
		}

		return JSON.parse(value);
	}

	static set(key, value) {
		return window.localStorage.setItem(key, JSON.stringify(value));
	}
}
