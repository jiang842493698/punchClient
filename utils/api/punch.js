const requestUtil = require('../wx-extend/request');
const config = require('../../config/index');

/** */
var savePunch = function(data,callback) {
    requestUtil.request({
        url: config.baseUrl + '/api/punchRecords/savePunch',
        auth: true,
        method: 'post',
        data: {
          dateIndex: data.dateIndex+1,
          punch: data.punch
        },
        success: function (response) {
          callback(null, response.data);
        },
        fail: function (error) {
          callback(error);
        }
    })
}

/** */
var updatePunchTime = function(callback) {
  requestUtil.request({
      url: config.baseUrl + '/api/punches/updatePunchTime',
      auth: true,
      method: 'put',
      success: function (response) {
        callback(null, response.data);
      },
      fail: function (error) {
        callback(error);
      }
  })
}

/** */
var updateActiveAndPunch = function(callback) {
  requestUtil.request({
      url: config.baseUrl + '/api/punches/updateActiveAndPunch',
      auth: true,
      method: 'put',
      success: function (response) {
        callback(null, response.data);
      },
      fail: function (error) {
        callback(error);
      }
  })
}

var getPunch = function(callback){
  requestUtil.request({
    url: config.baseUrl + '/api/punches/getPunch',
    auth: true,
    method: 'get',
    success: function (response) {
      callback(null, response.data);
    },
    fail: function (error) {
      callback(error);
    }
})
}



module.exports = { savePunch,updatePunchTime,updateActiveAndPunch,getPunch }