const requestUtil = require('../wx-extend/request');
const config = require('../../config/index');

/**首页显示是否参与打卡， 打卡记录详情 */
var loadPunch = function(callback) {
    let data = [{
        name: "每天6:30起床",
        startTime: "6:30",
        endTime: "7:00",
        startDate: "2018-08-29",
        endDate: "2018-08-05",
        cycle:3,
        status: 1,
        details: [{
            dataIndex:1
        }],
    },]
    callback(null,data)
}



module.exports = { loadPunch, }