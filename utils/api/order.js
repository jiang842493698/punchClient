const requestUtil = require('../wx-extend/request');
const config = require('../../config/index');

/**创建订单 */
var createOrder = function(data, callback) {
    requestUtil.request({
        url: config.baseUrl + '/api/orders',
        auth: true,
        method: 'post',
        data: data,
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

/**退款 */
var refundOrder = function(data, callback) {
    requestUtil.request({
        url: config.baseUrl + '/api/orders/' + data.orderId + '/refund',
        auth: true,
        method: 'post',
        data: {
            refundFee: data.refundFee
        },
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


module.exports = { createOrder, refundOrder }