// pages/punch/punchInfoupdate/index.js
const app = getApp();
const gamblerUtil = require('../../../utils/api/gambler');
let activeUtil = require('../../../utils/api/active')

const moment = require('../../../utils/moment.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingComplete: false,
    active:{},
    startDate: moment().add(1,"day").format("YYYY-MM-DD"),
    endDate: moment().add(1,"month").format("YYYY-MM-DD"),
    startDateValue: moment().add(1,"day").format("YYYY-MM-DD"),
    endDate: moment().add(7,"day").format("YYYY-MM-DD"),
    startTime: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let active_id = options.id
    this.loadData(active_id);
    this.checkLoginStatus();
  },

 

  loadData(id){
    let self = this
    activeUtil.getActiveById(id,function(err,activeData){
      if(activeData.err){
        console.error(err)
      }else{
        console.info(activeData)
        let startTime = activeData.active.defaultStartTime
        
        self.setData({
          startTime,
          loadingComplete: true,
          active: activeData.active
        })
        console.info(activeData.active)
      }
    })
  },

  giveUp() {
    console.info("aaaaaaa")
    wx.navigateBack({
      delta: 1
    });
  },
  formSubmit(e) {
    console.info(e.detail.value.startDate)
    let self = this
    wx.showLoading({
      title: "加载中...",
      mask: true,
    });
    self.setData({
      punchSwitch: false
    })
    
    if (e.detail.value.title == "") {
      e.detail.value.title = self.data.active.name
    }



    // order.createOrder({
    //   body: '7天打卡-确认加入',
    //   totalFee: 700
    // },function(err,order){
    //   if(err){
    //     console.error('error: ',err)
    //   }else{
    //     wx.hideLoading();
    //     wx.requestPayment({
    //       timeStamp: order.timeStamp,
    //       nonceStr: order.nonceStr,
    //       package: order.package,
    //       signType: order.signType,
    //       paySign: order.paySign,

    //       success: function(orderPayData){
    let orderId = 1
    
    let dataJson = {
      activeId: self.data.active._id,
      startDate: e.detail.value.startDate,
      endDate: self.data.endDate,
      startTime: e.detail.value.startTime,
      name: e.detail.value.title,
      order: orderId,
    }
    activeUtil.updateActive(dataJson, function (err, data) {
      if (err) {
        console.error('error: ', err);
      } else {
        wx.navigateBack({
          delta: 1
        });
        wx.hideLoading();
        self.setData({
          punchSwitch: true,
          punch_pop: !self.data.punch_pop
        })
      }
    });

    //    },
    //   fail: function(){
    //     self.setData({
    //       punchSwitch :true,
    //       punch_pop: !self.data.punch_pop
    //     })
    //   },
    //   complete: function(e){
    //     console.log(e)
    //     if(e.errMsg=="requestPayment:fail cancel"){
    //       self.setData({
    //         punchSwitch :true,
    //         punch_pop: !self.data.punch_pop
    //       })
    //     }
    //   }
    // })

    // }
    // })


  },

  startDate(e){
    console.info(e.detail.value)
    let startDate = e.detail.value
    let endDate = moment(startDate).add(6,"day").format("YYYY-MM-DD")
    this.setData({
      startDate,
      endDate
    })
  },
  startTime(e){
    console.info(e.detail.value)
    this.setData({
      startTime: e.detail.value
    })
  },

  checkLoginStatus() { // 检查登录状态
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

 
})