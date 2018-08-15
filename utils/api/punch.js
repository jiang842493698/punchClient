const requestUtil = require('../wx-extend/request');
const config = require('../../config/index');

var getMyPunch = function (callback) {
  requestUtil.request({
    url: config.baseUrl + '/api/punches/getMyPunch',
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

var createPunch = function (orderId,callback) {
  requestUtil.request({
    url: config.baseUrl + '/api/punches/createPunch',
    auth: true,
    data: {
      orderId: orderId,
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
  });
}

var updatePunchInfo = function(data,callback){
  requestUtil.request({
    url: config.baseUrl + '/api/punchRecords/'+data.punchRecordsId+'/punch',
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

var updateReservationPunchInfo = function (data, callback){
  requestUtil.request({
    url: config.baseUrl + '/api/punchRecords/'+data.punch+'/reserve',
    auth: true,
    method: 'put',
    
    header: {
      'content-type': 'application/json'
    },
    data: {
      formId: data.formId
    },
    success: function (response) {
      callback(null, response.data);
    },
    fail: function (error) {
      callback(error);
    }
  });
}

var updatePunchStart = function (callback) {
  requestUtil.request({
    url: config.baseUrl + '/api/punchInfo/updatePunchStart',
    auth: true,
    method: 'put',
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

var getPunchCount = function(callback){
  requestUtil.request({
    url: config.baseUrl + '/api/punches/getPunchCount',
    method: 'GET',
    
    success: function (response) {
      callback(null, response.data);
    },
    fail: function (error) {
      callback(error);
    }
  })
}

module.exports = { getMyPunch, createPunch, updatePunchInfo, updateReservationPunchInfo, updatePunchStart, getPunchCount }