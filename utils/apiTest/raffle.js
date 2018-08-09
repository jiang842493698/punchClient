const requestUtil = require('../wx-extend/request');
const config = require('../../config/index');


function fetchList(callback) {
  requestUtil.request({
    url: 'http://result.eolinker.com/ab4WXV99ed5ab5e8655085e5b2a6dc1679d25e361e8b139?uri=/api/raffles',
    // auth: true,
    method: 'GET',
    success: function(response) {
      callback(null, response.data);
    },
    fail: function(error) {
      callback(error);
    }
  });
}

function getBenefit(id, callback) {
  requestUtil.request({
    url: `${config.baseUrl}/api/benefits/${id}`,
    auth: false,
    method: 'GET',
    success: function(response) {
      callback(null, response.data);
    },
    fail: function(error) {
      callback(error);
    }
  });
}

// options - id, page, limit
function getWinners(data, callback) {
  requestUtil.request({
    url: `${config.baseUrl}/api/benefits/${data.id}/getWinners`,
    auth: false,
    data: data,
    method: 'GET',
    success: function(response) {
      callback(null, response.data);
    },
    fail: function(error) {
      callback(error);
    }
  });
}

module.exports = { fetchList, getBenefit, getWinners };