// pages/updatepunch/index.js
const app = getApp();
const punch = require('../../utils/api/punch');
const reserve = require('../../utils/api/reserve');
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
    onPunch: true,
    punchSuccessPop: false,
    punchEvent: false,
    onShowPunchList: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.checkLoginStatus();
    this.loadData();
    this.punchCount();
  },

  // deleteData() {
  //   let _this = this
  //   punch.updatePunchStart(function (err, data) {
  //     _this.loadData()
  //   })
  // },

  /**参与打卡 */
  confirm(){
    var self = this;
    wx.showLoading({
      title: "加载中...",
      mask: true,
    });
    self.setData({
      punchSwitch: false
    })
    order.createOrder({
      body: '7天打卡-确认加入',
      totalFee: 700
    },function(err,order){
      if(err){
        console.error('error: ',err)
      }else{
        wx.hideLoading();
        wx.requestPayment({
          timeStamp: order.timeStamp,
          nonceStr: order.nonceStr,
          package: order.package,
          signType: order.signType,
          paySign: order.paySign,
          success: function(orderPayData){
              let orderId = order.orderId
              // let orderId = "0"
              punch.createPunch(orderId, function (err, data) {
                if (err) {
                  console.error('error: ', err);
                } else {
                  self.loadData()
                  self.setData({
                    punchSwitch: true,
                    punch_pop: !self.data.punch_pop
                  })
                  
                }
              });
           },
          fail: function(){
            self.setData({
              punchSwitch :true,
              punch_pop: !self.data.punch_pop
            })
          },
          complete: function(e){
            console.log(e)
            if(e.errMsg=="requestPayment:fail cancel"){
              self.setData({
                punchSwitch :true,
                punch_pop: !self.data.punch_pop
              })
            }
          }
        })

      }
    })
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

  //点击打卡
  onPunch(e){
    wx.showLoading({
      title: '加载中...',
      mask: true,
    });
    var self = this;
    console.info(e)
    self.setData({
      onPunch: !self.data.onPunch
    })
    let data = {
      dateIndex: e.currentTarget.dataset.index,
      punch: e.currentTarget.dataset.id,
      formId: e.detail.formId,
    }
    let punchs = self.data.data.punch
    //打卡
    punch.createPunchRecord(data, function(err, date){
      if(err){
        console.error(err)
      }else{
        if(date.err){
          wx.showToast({
            title: "超过打卡时间",
            icon: 'none',
            duration: 1500,
            mask: false,
          });
          self.setData({
            onPunch: !self.data.onPunch
          })
        }else{
           //退款
        order.refundOrder({
          refundFee: 100,
          orderId : punchs.order
        },function(err,orders){
          if(err){
            console.error(err)
          }else{
            wx.hideLoading();
            //判断当天是否是最后一天打卡
            if(data.dateIndex==6){
              punch.updatePunchStart(function(err,data){
                if(err){
                }else{
                  self.setData({
                    punchSuccessPop: !self.data.punchSuccessPop,
                    punchEvent: true,
                  })
                }
              })
            }else{
              self.setData({
                punchSuccessPop: !self.data.punchSuccessPop,
                punchEvent: false,
              })
            }
            //预约明天的数据
            reserve.saveReserve(data, function (err, datas) {
              if (err) {
                console.error('error: ', err);
              } else {
                console.info(datas)
                self.loadData()
              }
            });
          }
        })
        }
       

      }
    })
  },

  hasPunchSuccessPop(){
    let self = this
    self.setData({
      punchSuccessPop: !self.data.punchSuccessPop,
    })
  },

  loadData() {
    var self = this;
    if(self.timer){
      clearTimeout(self.timer)
    }
    punch.getMyPunch(function (err, data) {
      if (err) {
        console.error('error: ', err);
      } else {
        
        //当前时间
        let currentTime = moment(data.dateJson.currentTime).valueOf()
        //当天打卡的开始时间
        let punchStartDate = moment(data.dateJson.currentTime).startOf("day").add(6,"hour").add(30,"Minute").valueOf()
        //当天打卡的结束时间
        let punchEndDate = moment(data.dateJson.currentTime).startOf("day").add(7,"hour").add(0,"Minute").valueOf()
        
        //当天的结束时间
        let endDate = moment(data.dateJson.currentTime).endOf("day").valueOf()
        //活动的开始时间
        let activeStartTime = moment(data.punch.startDate).startOf("day").valueOf()
        //当前是哪一天
        let dateIndex = Math.floor((currentTime - activeStartTime)/(24*60*60*1000))
        if(dateIndex > 6 && currentTime > punchEndDate){
          punch.updatePunchStart(function(err,data){
            if(err){
            }else{
              self.loadData()
            }
          })
        }else{
          //活动开始时间的格式化
          data.punch.startDate = moment(data.punch.startDate).format("YYYY-MM-DD")
          //活动结束时间的格式化
          data.punch.endDate = moment(data.punch.endDate).format("YYYY-MM-DD")
          //判断punchRecord中有没有
          let hasPunch = data.punchRecord.filter(e => e.punchDay == dateIndex + 1 )
          let hasReserve = data.reserve.filter(e => e.reserveDay == dateIndex + 1 )
          console.info("dateIndex",dateIndex)
          let punchList = []
          for(let i = 0; i <= dateIndex; i++){
            punchList[i] = false
          }
          for(let p of  data.punchRecord){
            punchList[p.punchDay-1] = true          
          }
          console.log(punchList)
          if(currentTime > punchStartDate){
            self.setData({
              onShowPunchList: false,
            })
          }else{
            self.setData({
              punchList : punchList.splice(punchList.length-1,1),
              onShowPunchList: true,
            })
          }
          self.timeOut(currentTime,punchStartDate,punchEndDate,endDate)
          self.setData({
            dateIndex: dateIndex,
            currentTime,
            punchStartDate,
            punchEndDate,
            endDate,
            activeStartTime,
            punchList,
            data: data,
            hasPunch,
            hasReserve,
            loadingComplete: true,
            onPunch: true,
          })
        }
        
      }
    });
  },

  delete(){
    let _this = this
    punch.updatePunchStart(function(err,data){
      if(err){
      }else{
        _this.loadData()
      }
    })
  },

  timeOut(currentTime, punchStartDate, punchEndDate, endDate){
    var self = this;
   
    if (currentTime < punchStartDate){
      self.timer = setTimeout(function () {
        currentTime = punchStartDate
        self.setData({
          currentTime,
          punchStartDate
        })
      }, punchStartDate - currentTime)
    }
    if (currentTime < punchEndDate) {
      self.timer = setTimeout(function () {
        currentTime = punchEndDate
        self.setData({
          currentTime,
          punchEndDate,
          onShowPunchList: false,
        })
      }, punchEndDate - currentTime)
    }
    if (currentTime < endDate) {
      self.timer = setTimeout(function () {
        currentTime = endDate
        self.setData({
          currentTime,
          endDate
        })
      }, endDate - currentTime)
    }else{
      self.loadData()
    }
  },

  /**
   * 预约
   */
  reservation(e){
    let self = this
    wx.showLoading({
      title: "加载中",
      mask: true,
    });
    
    let data = {
      punch: e.currentTarget.dataset.id,
      formId: e.detail.formId,
      // count: self.data.punchCounts,
      dateIndex: e.currentTarget.dataset.index,
    }
    console.info(data)
    reserve.saveReserve(data, function (err, datas) {
      if (err) {
        console.error('error: ', err);
      } else {
        
        self.loadData()
        wx.hideLoading();
        wx.showToast({
          title: "您已成功预约"
        })
        
      }
    });
  },

  /**
   * 继续打卡
   */
  confirms(){
    this.setData({
      punchSuccessPop: !this.data.punchSuccessPop
    })
    let _this = this
    _this.setData({
      punch_pop: !_this.data.punch_pop
    })
  },

  //参加打卡
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
  
  onShareAppMessage(options) {    // 分享设置
    console.log(options)
    if(options.from == 'button'){
      if(options.target.id == "toDay"){
        return {
          title: '今天我又打卡成功了，来看看我在坚持什么吧~',
          path: `/pages/punch/index`,
          imageUrl: '/images/share_oneday.png', 
        }
      }else if(options.target.id == "sevenDay"){
        return {
          title: '我已坚持打卡7天，你猜我又养成了什么好习惯？',
          path: `/pages/punch/index`,
          imageUrl: '/images/share_sevenday.png', 
        }
      }else{
        return {
          title: '今天我又打卡成功了，来看看我在坚持什么吧~',
          path: `/pages/punch/index`,
          imageUrl: '/images/share_oneday.png', 
        }
      }
      
    }
  },
})