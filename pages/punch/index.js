// pages/punch/index.js
const app = getApp();
const punch = require('../../utils/apiTest/punch');
const order = require('../../utils/apiTest/order');
const gamblerUtil = require('../../utils/api/gambler');
const sessionUtil = require('../../utils/wx-extend/session');
const utils = require('../../utils/util')
const moment = require('../../utils/moment.js')

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
    punch : {},
    isPunch : false,
    isReservation : false,
    punchSwitch : true,
    punchRecords : []
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
        console.log(data)
        if (data.punchRecords.length > 0){
          self.isDisplay(data)
        }else{
          self.setData({
            isPunch: false,
            isReservation: false,
            loadingComplete: true,
            punch: data.punch,
            startDate: moment(data.punch.startDate).format("YYYY-MM-DD"),
            endDate: moment(data.punch.endDate).format("YYYY-MM-DD"),
          })
        }
      }
    });
  },
  
  //判断是否显示
  isDisplay(data){
    console.log(data)
    var self = this;
    let isPunch = false
    let isReservations = false
    
    let punchCount = data.punchRecords.filter(e => e.status == true).length//返回的金额
    let currentTime = moment().format("YYYY-MM-DD HH:mm:ss")//当前的时间
    let tomorrowDay = moment().startOf("day").add(1,"day").format("YYYY-MM-DD HH:mm:ss") //明天的时间
    let punchStartDate = moment(data.punch.startDate).format("YYYY-MM-DD HH:mm:ss")//打卡活动开始时间
    let punchEndDate = moment(data.punch.endDate).format("YYYY-MM-DD HH:mm:ss")//打卡活动结束时间
    
    //先判断当前时间是否在开始时间段到结束时间段中
    if (moment(currentTime).isBetween(punchStartDate, punchEndDate)){
      //每天的活动时间
      //显示打卡是否可打卡的状态
      //早上6.30以前显示等待打卡 点击预约明天打卡后会显示等待打卡
      //6.30-7.00显示点击打卡 
      //7.30-12.00显示预约明天打卡 如果时间小于data.punch.startDate也是显示预约明天打卡 
      let punchStartTime = moment().startOf("day").add(6, "hour").add(30, "Minute").format("YYYY-MM-DD HH:mm:ss")//打卡的开始时间
      let punchEndTime = moment().startOf("day").add(7, "hour").add(0, "Minute").format("YYYY-MM-DD HH:mm:ss")//打卡的结束时间
      let currentDate = moment().startOf("day").format("YYYY-MM-DD HH:mm:ss")

      console.log(currentTime)
      let todayData = data.punchRecords.filter(e =>  
        moment(e.punchDate).format("YYYY-MM-DD HH:mm:ss") == currentDate
      )[0] //找到今天的数据
      console.log(todayData)
      if (todayData.status) {//判断当前时间的状态,如果是已打卡则不显示打卡信息
        isPunch = false
        //判断明天的预约数据是否预约
        let tomorrowDate = data.punchRecords.filter(e =>
          moment(e.punchDate).format("YYYY-MM-DD HH:mm:ss") == tomorrowDay
        )[0]
        console.log(tomorrowDate)
        if (!tomorrowDate.isReservation){
          isReservations = true
        }else{
          isReservations = false
        }
      }else{
        isPunch = true    
      }
      // let clickPunchStatus = moment(currentTime).isBetween(punchStartTime, punchEndTime)//点击打卡状态
      wx.hideLoading();
      self.setData({
        punchSwitch: true,
        punchCount,
        punch_pop: false,
        isPunch: isPunch,
        isReservation: isReservations,
        loadingComplete: true,
        punch: data.punch,
        startDate: moment(data.punch.startDate).format("YYYY-MM-DD"),
        endDate: moment(data.punch.endDate).format("YYYY-MM-DD"),
        punchRecords: todayData,
        punchRecordsArray: data.punchRecords,
      }) 
    } else if (moment(currentTime).isBefore(punchStartDate)){
      
      let tomorrowDate = data.punchRecords.filter(e =>
        moment(e.punchDate).format("YYYY-MM-DD HH:mm:ss") == tomorrowDay
      )[0]
      console.log(tomorrowDate)
      if (!tomorrowDate.isReservation) {
        isReservations = true
      }else{
        //如果小于开始时间的话则只能预约
        isReservations = false
      }
      console.log(isReservations)
      wx.hideLoading();
      self.setData({
        punchSwitch: true,
        punchCount,
        punch_pop: false,
        isPunch: isPunch,
        isReservation: isReservations,
        loadingComplete: true,
        punch: data.punch, 
        startDate: moment(data.punch.startDate).format("YYYY-MM-DD"),
        endDate: moment(data.punch.endDate).format("YYYY-MM-DD"),
        punchRecordsArray: data.punchRecords,
      }) 
      console.log(self.data.isReservation)
    }else{
      //如果大于结束时间的话就修改punch状态将抽奖状态改为false
      punch.updatePunchStart(function (err, data){
        if (err) {
          console.error('error: ', err);
        } else {
          self.loadData()
        }
      })

    }
  },

  toogleBargainModal() {
    this.setData({
      showBargainModal: !this.data.showBargainModal
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
      gamblerUtil.updatePlayer(e.detail.userInfo, function (err, gambler) {
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

  //确认参加打卡
  confirm(e){
    var self = this;
    self.setData({
      punchSwitch : false 
    })
    
    //先创建订单
    console.info('formID: ', e.detail.formId)
    var data = {
      body: '7天打卡-确认加入',
      totalFee: 1
    }
    order.createOrder(data,function(err,order){
      if(err){
        console.error('error: ',err)
      }else{
        console.info("order:",order)
        wx.requestPayment({
          timeStamp: order.timeStamp,
          nonceStr: order.nonceStr,
          package: order.package,
          signType: order.signType,
          paySign: order.paySign,
          success: function(orderPayData){
            console.info("orderPayData:",orderPayData)
            // punch.createPunch(function (err, data) {
            //   if (err) {
            //     console.error('error: ', err);
            //   } else {
            //     let dataJson = {
            //       punch: data.savedPunch,
            //       punchRecords: data.punchRecordss
            //     }
            //     self.isDisplay(dataJson)
            //   }
            // });
          },
          fail: function(){
            wx.showModal({
              title: "支付失败",
              content: "支付失败请联系管理员"
            })
          },
          complete: function(e){

          }
        })

      }
    })
   
    
    
    
  },

  //点击打卡
  onPunch(e){
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    let self = this
    
    let data = {
      punchRecordsId: e.currentTarget.dataset.id
    } 
    console.log()
    punch.updatePunchInfo(data,function (err, data) {
      if (err) {
        console.error('error: ', err);
      } else {
        let punch = self.data.punch
        let punchRecordsArray = self.data.punchRecordsArray

        punchRecordsArray = punchRecordsArray.filter(e => e._id != data.updatePunchInfo._id)
        punchRecordsArray = punchRecordsArray.filter(e => e._id != data.punchRecords._id)
        let punchRecordsList = punchRecordsArray
        punchRecordsList.push(data.punchRecords)
        punchRecordsList.push(data.updatePunchInfo)
        
        let dataJson={
          punch: punch,
          punchRecords: punchRecordsList
        }
        self.isDisplay(dataJson)
      }
    });
  },
  //预约明天打卡
  reservation(e){
    console.log(e.detail.formId)
    let self = this
    let currentTime = moment().startOf("day").add(1, "day").toDate()
    let data={
      punchDate :currentTime,
      punch: e.currentTarget.dataset.id
    }

    punch.updateReservationPunchInfo(data, function (err, data) {
      if (err) {
        console.error('error: ', err);
      } else {
        let punch = self.data.punch
        let punchRecordsArray = self.data.punchRecordsArray
        let punchRecordsList = punchRecordsArray.filter(e => e._id != data.updatePunchInfo._id)
        punchRecordsList.push(data.updatePunchInfo)
        
        let dataJson = {
          punch: punch,
          punchRecords: punchRecordsList
        }
        self.isDisplay(dataJson)
      }
    });
  }
})