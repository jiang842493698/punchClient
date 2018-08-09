const requestUtil = require('../wx-extend/request');
const config = require('../../config/index');


function fetchList(callback) {
  requestUtil.request({
    url: 'http://mock.eolinker.com/hTZnj4Hfa0706688b50625ca0689df0098bd0acb1ca4dba?uri=/api/raffles',
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