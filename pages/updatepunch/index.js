// pages/updatepunch/index.js
const app = getApp();
const punch = require('../../utils/api/punch');
const order = require('../../utils/api/order');
const gamblerUtil = require('../../utils/api/gambler');
const sessionUtil = require('../../utils/wx-extend/session');
const utils = require('../../utils/util')
const moment = require('../../utils/moment.js')
const punchCount = require('../../config/punchCount.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loadingComplete: false,
    isParticipatePunch: false,
    punchCounts : 0,
    punchCount : 0,
    punch_pop: false,
    punchSwitch: true,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkLoginStatus();
    this.loadData();
    this.punchCount();
  },

  deleteData() {
    let _this = this
    punch.updatePunchStart(function (err, data) {
      _this.loadData()
    })
  },

  confirm(){
    var self = this;
    self.setData({
      punchSwitch: false
    })
    let orderId = "0"
    punch.createPunch(orderId, function (err, data) {
      if (err) {
        console.error('error: ', err);
      } else {
        console.log(data)
        let dataJson = {
          punch: data.punch,
          punchRecord: data.punchRecords
        }
        
        self.setData({
          data: dataJson,
          punchSwitch: true,
          punch_pop: !self.data.punch_pop
        })
      }
    });
  },

  punchCount() {
    let _this = this
    punch.getPunchCount(function (err, data) {
      if (data) {
        let punchNumber = punchCount.punchCount
        punchNumber = punchNumber + data.punchCount
        _this.setData({
          punchCount: punchNumber
        })
      }
    })
  },

  loadData(options) {
    var self = this;
    punch.getMyPunch(function (err, data) {
      if (err) {
        console.error('error: ', err);
      } else {
        console.info(data)
        
        data.punch.startDate = moment(data.punch.startDate).format("YYYY-MM-DD")
        data.punch.endDate = moment(data.punch.endDate).format("YYYY-MM-DD")
        self.setData({
          data: data,
          loadingComplete: true
        })
      }
    });
  },


  operatingPunch() {
    this.setData({
      punch_pop: !this.data.punch_pop
    })
  },

  checkLoginStatus() {   // 检查登录状态
    console.info(app.globalData.userInfo)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (!this.data.canIUse) {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          sessionUtil.setUserInfo(e.detail.userInfo);
          gamblerUtil.updatePlayer(e.detail.userInfo, function (err, gambler) {
            if (err) {
              console.error('error: ', err);
            }
          });
        }
      })
    }
  },

  getUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      });

      sessionUtil.setUserInfo(e.detail.userInfo);
      console.info(e.detail.userInfo)
      gamblerUtil.updatePlayer(e.detail.userInfo, function (err, gambler) {
        if (err) {
          console.error('error: ', err);
        }
      });
    }
  },
  
  onShareAppMessage: function () {
  
  }
})