const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../songs.json');
const file = fs.readFileSync(filePath, 'utf8');
window.songs = JSON.parse(file);
