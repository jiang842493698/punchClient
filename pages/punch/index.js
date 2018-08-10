// pages/punch/index.js
const app = getApp();
const punch = require('../../utils/apiTest/punch');
const playerUtil = require('../../utils/api/player');
const sessionUtil = require('../../utils/wx-extend/session');
const utils = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    punch_pop : false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loadingComplete : false,
    isParticipatePunch : false,
    startAt:"",
    endAt: "",
    punch : {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkLoginStatus();
    this.loadData()
    
  },
  loadData(options) {
    var self = this;

    punch.getMyPunch(function (err, data) {
      if (err) {
        console.error('error: ', err);
      } else {
        data.punch.startDate = utils.formatTime(new Date(data.punch.startDate))
        data.punch.endDate = utils.formatTime(new Date(data.punch.endDate))
        //显示打卡是否可打卡的状态
        //早上6.30以前显示等待打卡 点击预约明天打卡后会显示等待打卡
        //6.30-7.00显示点击打卡 
        //7.30-12.00显示预约明天打卡 如果时间小于data.punch.startDate也是显示预约明天打卡 



        self.setData({
          loadingComplete : true,
          punch: data.punch,
          punchInfo: data.punchInfo,
        })
      }
    });
  },
  checkLoginStatus() {   // 检查登录状态
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
          playerUtil.updatePlayer(e.detail.userInfo, function (err, player) {
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
      playerUtil.updatePlayer(e.detail.userInfo, function (err, player) {
        if (err) {
          console.error('error: ', err);
        }
      });
    }
  },
  operatingPunch(){
    this.setData({
      punch_pop : !this.data.punch_pop
    })
  },

  confirm(){
    
    var self = this;
    punch.createPunch(function (err, data) {
      if (err) {
        console.error('error: ', err);
      } else {
        console.log(data)
      }
    });
    
  },
  onPunch(){
    let data = {
      punchInfoId:"5b6d52ba46fedf51f8cc19a0"
    }
    punch.updatePunchInfo(data,function (err, data) {
      if (err) {
        console.error('error: ', err);
      } else {
        console.log(data)
        self.setData({
          isParticipatePunch: data.isParticipatePunch,
          loadingComplete: true,
          startAt: data.startAt,
          endAt: data.endAt,
        })
      }
    });
  },

})