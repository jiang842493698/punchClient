// const env = 'test';
// const env = 'development';
const env = 'production';
var config = {};
module.exports = Object.assign({}, config, require(`./${env}.js`) || {});
