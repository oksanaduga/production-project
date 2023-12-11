const path = require('path');

module.exports = (...serments) => path.resolve(__dirname, '..', '..', ...serments);
