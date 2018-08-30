// pages/punch/punchInfo/index.js
const moment = require('../../../utils/moment')
const active = require('../../../utils/api/active')

const order = require('../../../utils/api/order')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate: moment().add(1, "day").format("YYYY-MM-DD"),
    endDate: moment().add(7, "day").format("YYYY-MM-DD"),
    startTime: "00:00",
    endTime: "00:00"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      wx.showModal({
        title: "警告",
        content: "打卡主题不能为空",
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
      });
      return
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
    wx.hideLoading();
    let dataJson = {
      startDate: e.detail.value.startDate,
      endDate: self.data.endDate,
      startTime: e.detail.value.startTime,
      name: e.detail.value.title,
      order: orderId,
    }
    active.postActive(dataJson, function (err, data) {
      if (err) {
        console.error('error: ', err);
      } else {
        wx.navigateBack({
          delta: 1
        });
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

  startDate(e) {
    console.info(e.detail.value)
    let startDate = e.detail.value
    let endDate = moment(startDate).add(6, "day").format("YYYY-MM-DD")
    this.setData({
      startDate,
      endDate
    })

  },

  startTime(e) {
    console.info(e.detail.value)
    this.setData({
      startTime: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})