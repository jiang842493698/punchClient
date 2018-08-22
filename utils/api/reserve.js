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

var saveReserve = function(data, callback){
  requestUtil.request({
    url: config.baseUrl + '/api/reserve/saveReserve',
    auth: true,
    data: {
      punchId: data.punch,
      formId: data.formId,
      dateIndex: data.dateIndex,
      // count: data.count,
    },
    method: 'post',
    header: {
      'content-type': 'application/json'
    },
    success: function (response) {
      callback(null, response.data);
    },
    fail: function (error) {
      callback(error);
    }
  })
}

module.exports = { getReserve, saveReserve }