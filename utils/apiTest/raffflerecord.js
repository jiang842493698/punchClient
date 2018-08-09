const requestUtil = require('../wx-extend/request');
const config = require('../../config/index');

function getBargainData(data, callback) {
  let dataJson
  requestUtil.request({
    url: `${config.baseUrl}/api/bargainrecords/getBargainRecords`,
    auth: true,
    data: data,
    method: 'GET',
    success: function (response) {
      callback(null, response.data);
    },
    fail: function (error) {
      callback(error);
    }
  });
}

function getRaffleData(data, callback) {
  requestUtil.request({
    url: `http://result.eolinker.com/ab4WXV99ed5ab5e8655085e5b2a6dc1679d25e361e8b139?uri=/api/tickets/getRaffleData`,
    data: data,
    method: 'GET',
    success: function (response) {
      callback(null, response);
    },
    fail: function (error) {
      callback(error);
    }
  });
  
}

function createBargain(data, callback) {
  requestUtil.request({
    url: `${config.baseUrl}/api/bargainrecords/createBargain`,
    auth: true,
    data: data,
    method: 'POST',
    success: function(response) {
      callback(null, response.data);
    },
    fail: function(error) {
      callback(error);
    }
  });
}

function helpBargain(data, callback) {
  requestUtil.request({
    url: `${config.baseUrl}/api/bargainrecords/helpBargain`,
    auth: true,
    data: data,
    method: 'POST',
    success: function(response) {
      callback(null, response.data);
    },
    fail: function(error) {
      callback(error);
    }
  });
}

module.exports = { 
  getBargainData,
  getRaffleData,
  createBargain,
  helpBargain
};