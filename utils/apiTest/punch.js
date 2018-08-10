const requestUtil = require('../wx-extend/request');
const config = require('../../config/index');

var getMyPunch = function (callback) {
  requestUtil.request({
    url: config.baseUrl + '/api/punch/getMyPunch',
    auth: true,
    
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

var createPunch = function (callback) {
  requestUtil.request({
    url: config.baseUrl + '/api/punch/createPunch',
    auth: true,

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
  });
}

var updatePunchInfo = function(data,callback){
  requestUtil.request({
    url: config.baseUrl + '/api/punchInfo/updatePunchInfo',
    auth: true,

    method: 'put',
    header: {
      'content-type': 'application/json'
    },
    data: data,
    success: function (response) {
      callback(null, response.data);
    },
    fail: function (error) {
      callback(error);
    }
  });
}

module.exports = { getMyPunch, createPunch, updatePunchInfo }