const requestUtil = require('../wx-extend/request');
const config = require('../../config/index');

function updatePlayer(userInfo, callback) {
  console.info("userInfo", userInfo)
  requestUtil.request({
    url: config.baseUrl + '/api/gamblers/updateMyInfo',
    auth: true,
    data: {
      userInfo: JSON.stringify(userInfo)
    },
    method: 'PUT',
    header: {
      'content-type': 'application/json'
    },
    success: function(response) {
      callback(null, response.data);
    },
    fail: function(error) {
      callback(error);
    }
  });
}


module.exports = { updatePlayer };