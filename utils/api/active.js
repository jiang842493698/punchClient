const requestUtil = require('../wx-extend/request');
const config = require('../../config/index');

/**查询活动列表 */
var getActive = function (callback) {
    requestUtil.request({
        url: config.baseUrl + '/api/active',
        auth: true,
        method: 'GET',
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

/**新增活动 */
var postActive = function (data, callback) {
    requestUtil.request({
        url: config.baseUrl + '/api/active/',
        auth: true,
        data: { ...data },
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

/**修改活动 */
var updateActive = function (data, callback) {
    requestUtil.request({
        url: config.baseUrl + '/api/active/' + data.activeId + "/updateActive",
        auth: true,
        data: {
            ...data
        },
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

/**活动结束/开始 修改活动状态*/
var updateActiveByStatus = function (data, callback) {
    requestUtil.request({
        url: config.baseUrl + '/api/active/' + data.activeId + "/updateActiveByStatus",
        auth: true,
        data: {
            status: data.status,
            startDate: data.startDate
        },
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

/**修改活动状态 并且新增Punch数据*/
var updateActiveAndInsertPunch = function (data, callback) {
    requestUtil.request({
        url: config.baseUrl + '/api/active/' + data.activeId + "/updateActiveAndInsertPunch",
        auth: true,
        data: {
            order: data.order
        },
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

/**删除活动（将活动的删除状态改为true,所以为put请求） */
var deleteActive = function (activeId, callback) {
    requestUtil.request({
        url: config.baseUrl + '/api/active/' + activeId + "/deleteActive",
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

/**根据id查询活动记录 */
var getActiveById = function (activeId, callback) {
    requestUtil.request({
        url: config.baseUrl + '/api/active/' + activeId + "/getActiveById",
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


module.exports = { getActive, postActive, updateActive, deleteActive, updateActiveByStatus, getActiveById,updateActiveAndInsertPunch }