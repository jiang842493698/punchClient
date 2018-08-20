const requestUtil = require('../wx-extend/request');
const config = require('../../config/index');

var getReserve = function (data,callback) {
  requestUtil.request({
    url: config.baseUrl + '/api/reserve/getReserve',
    auth: true,
    data: {
      punchId: data.punchId
    },
    method: 'get',
    header: {
      'content-type': 'application/json'
    },
    success: function (response) {
      callback(null, response.data);
    },
    fail: function (error) {
      callback(error);
    }
  });
}

module.exports = {  }