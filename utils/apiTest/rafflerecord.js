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
  let dataJson={
    "master": {
      "id": "5b62cb93a063073884f278fe",
      "nickName": "江超",
      "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
    },
    "bettor": {
      "id": "5b62cb93a063073884f278fe",
      "nickName": "江超",
      "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
    },
    winnerList:[{
      nickName : "江超",
      "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132",
      "code":123
    },{
      nickName : "江超",
      "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132",
      "code":123
    },{
      nickName : "江超1111111111111111111",
      "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132",
      "code":123
    },
    {
      nickName : "江超",
      "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132",
      "code":123
    },
    {
      nickName : "江超",
      "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132",
      "code":123
    },
    {
      nickName : "江超",
      "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132",
      "code":123
    },{
      nickName : "江超",
      "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132",
      "code":123
    },  
    ],
    "raffle": {
      "status": 1,
      "isActive": true,
      "_id": "5b604b93a420866e50aaf2e7",
      "title": "别摸我",
      "giftName": "BMW x 1",
      "giftTotalCount": 1,
      "bannerUrl": "https://res.wofangyou.cn/test_1533037268259.jpg",
      "headerUrl": "https://res.wofangyou.cn/test_1533037268259.jpg",
      "ruleContent": "宝马X5\n\n宝马X5是宝马品牌的第一款四轮驱动SUV车型，该车于1999年底在美国上市。该款汽车轴距2933mm，车重2200公斤，最高时速250千米每小时，为前置四驱驱动，排量为2.9L，目前在销售的是第三代产品。\n\n宝马X5最大优点是外观延续了宝马suv的家族特色，处处展示着宝马的设计元素，全景天窗、天使眼设计出色。内饰简洁大方，但稍欠精细。",
      "rule": "<p>宝马X5</p>\n<p>宝马X5是宝马品牌的第一款四轮驱动SUV车型，该车于1999年底在美国上市。该款汽车轴距2933mm，车重2200公斤，最高时速250千米每小时，为前置四驱驱动，排量为2.9L，目前在销售的是第三代产品。</p>\n<p>宝马X5最大优点是外观延续了宝马suv的家族特色，处处展示着宝马的设计元素，全景天窗、天使眼设计出色。内饰简洁大方，但稍欠精细。</p>",
      "normalShareTitle": "分享抽奖",
      "normalShareUrl": "https://res.wofangyou.cn/bmw-icon-2_1533037411552.jpg",
      "helpShareTitle": "帮我抽车，带你兜风",
      "helpShareUrl": "https://res.wofangyou.cn/bmw-icon-2_1533037442793.jpg",
      "startDate": "2018-07-31T16:00:00.000Z",
      "endDate": "2018-08-05T07:00:00.000Z",
      "autoReply": "兑奖回复\"bmw\"",
      "createdAt": "2018-07-31T11:44:19.423Z",
      "__v": 0
    },
    "masterTickets": [{
      "code": 5,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 54,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 2,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 36,
      "isWinner": false,
      "bettor": {
        "id": "5b63ed1f9026bd19407cb81c",
        "nickName": "我的好友",
        "avatarUrl": "https://res.wofangyou.cn/defaut_avatar.png"
      }
    }, {
      "code": 30,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 27,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 14,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 41,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 47,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 45,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 4,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 43,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 29,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 1,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 6,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 52,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 48,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 28,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 49,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 13,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 24,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 3,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 40,
      "isWinner": false,
      "bettor": {
        "id": "5b63ed1f9026bd19407cb81c",
        "nickName": "我的好友",
        "avatarUrl": "https://res.wofangyou.cn/defaut_avatar.png"
      }
    }, {
      "code": 9,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 22,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 7,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 16,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 34,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 55,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 19,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 20,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 42,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 51,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 21,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 18,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 23,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 26,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 39,
      "isWinner": false,
      "bettor": {
        "id": "5b63ed1f9026bd19407cb81c",
        "nickName": "我的好友",
        "avatarUrl": "https://res.wofangyou.cn/defaut_avatar.png"
      }
    }, {
      "code": 11,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 38,
      "isWinner": false,
      "bettor": {
        "id": "5b63ed1f9026bd19407cb81c",
        "nickName": "我的好友",
        "avatarUrl": "https://res.wofangyou.cn/defaut_avatar.png"
      }
    }, {
      "code": 17,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 12,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 37,
      "isWinner": false,
      "bettor": {
        "id": "5b63ed1f9026bd19407cb81c",
        "nickName": "我的好友",
        "avatarUrl": "https://res.wofangyou.cn/defaut_avatar.png"
      }
    }, {
      "code": 50,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 10,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 25,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 8,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 46,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 44,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 15,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 35,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }, {
      "code": 53,
      "isWinner": false,
      "bettor": {
        "id": "5b62cb93a063073884f278fe",
        "nickName": "江超",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132"
      }
    }],
    "codeTotalCount": 55,
    "gamblerCount": 2,
    "gamblerList": ["https://wx.qlogo.cn/mmopen/vi_32/dVfNDZrxLgZ8sJcPIRbSicyhxUCosrIAGAdM176ZlDnWTGNX4jCm2N8AiaCibPM9yRwcTicVwAwic8oaDUtgT2Hmxibg/132", "https://res.wofangyou.cn/defaut_avatar.png"]
  }
  callback(null,dataJson)
  
}

// function getRaffleData(data, callback) {
//   requestUtil.request({
//     url: `http://result.eolinker.com/ab4WXV99ed5ab5e8655085e5b2a6dc1679d25e361e8b139?uri=/api/tickets/getRaffleData`,
//     data: data,
//     method: 'GET',
//     success: function (response) {
//       callback(null, response);
//     },
//     fail: function (error) {
//       callback(error);
//     }
//   });
  
// }

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