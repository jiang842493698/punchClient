const requestUtil = require('../wx-extend/request');
const config = require('../../config/index');

/**首页显示当日打卡记录详情 */
var loadPunch = function(callback) {
    requestUtil.request({
        url: config.baseUrl + '/api/punches/getMyPunch',
        auth: true,
        method: 'get',
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

var savePunchInfo = function(data,callback){
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



module.exports = { loadPunch, savePunchInfo}