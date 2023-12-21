const fs = require('fs');

const path = require('path');

const pathForRemove = path.join(__dirname, '..', 'node_modules/.cache');

fs.rmSync(pathForRemove, { recursive: true, force: true });
