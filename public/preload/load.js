const fs = require('fs');

module.exports = (filePath) => {
	const file = fs.readFileSync(filePath, 'utf8');
	window.songs = JSON.parse(file);
};
