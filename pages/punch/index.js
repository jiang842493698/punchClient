// pages/punch/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    punch_pop : false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkLoginStatus();
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
    // let aaa =  Math.floor(Math.random()*8999+1000)
    // console.log(aaa)
  //   wx.requestPayment({
  //     'timeStamp': new Date().getTime(),
  //     'nonceStr': Math.random(8999)+1000,
  //     'package': '',
  //     'signType': 'MD5',
  //     'paySign': '',
  //     'success':function(res){
  //       console.log("1111111111")
  //     },
  //     'fail':function(res){
  //     }
  //  })
  wx.navigateTo({
    url : "./punchDetails/index"
  })
    
  },
})