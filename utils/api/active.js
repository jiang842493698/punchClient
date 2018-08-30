const requestUtil = require('../wx-extend/request');
const config = require('../../config/index');

/**查询活动列表 */
var getActive = function(callback) {
    requestUtil.request({
        url: config.baseUrl + '/api/active',
        auth: true,
        method: 'GET',
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

/**新增活动 */
var postActive = function(data, callback) {
    requestUtil.request({
        url: config.baseUrl + '/api/active/',
        auth: true,
        data: {...data },
        method: 'post',
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

/**修改活动 */
var updateActive = function(data, callback) {
    requestUtil.request({
        url: config.baseUrl + '/api/active/' + activeId,
        auth: true,
        data: {...data },
        method: 'put',
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

/**删除活动 */
var updateActive = function(activeId, callback) {
    requestUtil.request({
        url: config.baseUrl + '/api/active/' + activeId,
        auth: true,

        method: 'put',
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



module.exports = { getActive, postActive, updateActive }