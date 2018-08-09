const env = 'development';
var config = {};
module.exports = Object.assign({}, config, require(`./${env}.js`) || {});