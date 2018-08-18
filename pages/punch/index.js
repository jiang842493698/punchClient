// pages/punch/index.js
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
    punch_pop : false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    onPunch: true,
    loadingComplete : false,
    isParticipatePunch : false,
    startAt:"",
    endAt: "",
    punch : {},
    isPunch : false,
    hasPunched : false,
    punchSwitch : true,
    punchRecords : {},
    punchCount: 0 ,
    punchCounts:0,
    punchSuccessPop: false ,
    punchEvent: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.info(moment().startOf("day").add(6, "hour").add(30, "Minute").format("YYYY-MM-DD HH:mm:ss"))
    this.checkLoginStatus();
    this.loadData();
    this.punchCount();
  },
  onShow(){
    this.timer = setInterval(this.interval, 1000);
  },
  onHide(){
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  punchCount(){
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
        self.isDisplay(data)
       
      }
    });
  },

  interval(){
    var self = this;
    let currentDate = moment().add(0,"day").valueOf()
    let minPunchDate = new Date(punch.startDate).getTime()
    let maxPunchDate = new Date(punch.endDate).getTime()
    let punchRecords = self.data.punchRecords
    let dataIndex = Math.floor((currentDate - minPunchDate)/(24*60*60*1000))
    if(dataIndex >= 0){
      let punchStartDate = moment(punchRecords[dataIndex].punchDate).startOf("day").add(6,"hour").add(30,"Minutes").valueOf()
      let punchEndDate = moment(punchRecords[dataIndex].punchDate).startOf("day").add(7,"hour").add(0,"Minutes").valueOf()
     
      let punchEndReserved = moment(punchRecords[dataIndex].punchDate).endOf("day").valueOf()
      self.setData({
        punch: self.data.punch,
        currentDate: currentDate,
        minPunchDate: minPunchDate,
        maxPunchDate: maxPunchDate,
        punchStartDate: punchStartDate,
        punchEndDate: punchEndDate,
        punchRecords: punchRecords,
        punchEndReserved: punchEndReserved,
      })
    }else{
      self.setData({
        punch: self.data.punch,
        currentDate: currentDate,
        minPunchDate: minPunchDate,
        maxPunchDate: maxPunchDate,
        punchRecords: punchRecords,
      })
    }
  },

  //显示加载数据
  isDisplay(data){
    var self = this;
    console.info(data)
    let punchCounts = data.punchRecords.filter(e => e.hasPunched == true).length//返回金额
    let punch = data.punch
    if(data.punchRecords.length > 0){
      let punchRecords = data.punchRecords.sort((a,b) => a.punchDate > b.punchDate)
      let currentDate = moment().add(0,"day").valueOf()  //当前时间的时间戳
      let minPunchDate = new Date(punch.startDate).getTime()
      let maxPunchDate = new Date(punch.endDate).getTime()
      let dataIndex = Math.floor((currentDate - minPunchDate)/(24*60*60*1000))
      if(dataIndex >= 0){
        console.log(moment(punchRecords[dataIndex].punchDate).startOf("day").add(6, "hour").add(30, "Minute"))
        //如果当前时间（currentDate）在punchStartDate和punchEndDate之间则说明是打卡时间
        let punchStartDate = moment(punchRecords[dataIndex].punchDate).startOf("day").add(6,"hour").add(30,"Minute").valueOf()
        let punchEndDate = moment(punchRecords[dataIndex].punchDate).startOf("day").add(7,"hour").add(0,"Minute").valueOf()
        let punchEndReserved = moment(punchRecords[dataIndex].punchDate).endOf("day").valueOf()
        self.setData({
          punchSwitch: true,
          punchCounts,
          punch_pop: false,
          dataIndex : dataIndex,
          loadingComplete: true,
          punch: data.punch,
          currentDate: currentDate,
          minPunchDate: minPunchDate,
          maxPunchDate:maxPunchDate,
          punchStartDate: punchStartDate,
          punchEndDate: punchEndDate,
          punchRecords: punchRecords,
          punchEndReserved:punchEndReserved,
          onPunch : true,
          startDate: moment(data.punch.startDate).format("YYYY-MM-DD"),
          endDate: moment(data.punch.endDate).format("YYYY-MM-DD"),
        })
      }else{
        self.setData({
          punchSwitch: true,
          onPunch : true,
          punchCounts,
          punch_pop: false,
          dataIndex : dataIndex,
          loadingComplete: true,
          punch: data.punch,
          currentDate: currentDate,
          minPunchDate: minPunchDate,
          maxPunchDate:maxPunchDate,
          punchRecords: punchRecords,
          startDate: moment(data.punch.startDate).format("YYYY-MM-DD"),
          endDate: moment(data.punch.endDate).format("YYYY-MM-DD"),
        })
      }
    }else{
      self.setData({
        isPunch: false,
        hasPunched: false,
        onPunch : true,
        loadingComplete: true,
        punch: data.punch,
        punchRecords: data.punchRecords,
        startDate: moment(data.punch.startDate).format("YYYY-MM-DD"),
        endDate: moment(data.punch.endDate).format("YYYY-MM-DD"),
      })
    }
  },
    
  toogleBargainModal() {
    this.setData({
      showBargainModal: !this.data.showBargainModal
    });
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
    
    order.createOrder({
      body: '7天打卡-确认加入',
      totalFee: 700
    },function(err,order){
      if(err){
        console.error('error: ',err)
      }else{
        console.info(order)
        wx.requestPayment({
          timeStamp: order.timeStamp,
          nonceStr: order.nonceStr,
          package: order.package,
          signType: order.signType,
          paySign: order.paySign,
          success: function(orderPayData){
              let orderId = order.orderId
    // let orderId = "0"
            punch.createPunch(orderId,function (err, data) {
              if (err) {
                console.error('error: ', err);
              } else {
                let dataJson = {
                  punch: data.punch,
                  punchRecords: data.punchRecords
                }
                self.isDisplay(dataJson)
              }
            });
          },
          fail: function(){
            // wx.showModal({
            //   title: "支付失败",
            //   content: "支付失败请联系管理员"
            // })
            self.setData({
              punchSwitch :true,
            })
          },
          complete: function(e){
            console.log(e)
            if(e.errMsg=="requestPayment:fail cancel"){
              self.setData({
                punchSwitch :true,
              })
            }
          }
        })

      }
    })
  },

  //点击打卡
  onPunch(e){
    
    let self = this
    self.setData({
      onPunch: false,
    })
    //获取今天的Id
    let data = {
      punchRecordsId: e.currentTarget.dataset.id
    } 
    //获取明天的Id
    let punchRecordsData ={
      punch : e.currentTarget.dataset.nextid,
      formId: e.detail.formId,
      count: self.data.punchCounts
    }
    //修改今天的打卡信息
    punch.updatePunchInfo(data,function (err, data) {
      if (err) {
        console.error('error: ', err);
      } else {
        let punchs = self.data.punch
        let todayPunchRecord = data.punchRecord
        let punchRecords = self.data.punchRecords
        punchRecords = punchRecords.filter(e => e._id != todayPunchRecord._id)
        punchRecords.push(todayPunchRecord)
        // wx.showToast({
        //   title : "您已成功打卡"
        // })
        //发送退款请求

        order.refundOrder({
          refundFee: 100,
          orderId : punchs.order
        },function(err,data){
          //修改明天的预约数据
          if(self.data.dataIndex>=6){
            let dataJson = {
              punch: punchs,
              punchRecords: punchRecords
            }
            self.setData({
              punchSuccessPop: true,
              punchEvent : true,
            })
            self.isDisplay(dataJson)
          }else{
            self.setData({
              punchSuccessPop: true,
              punchEvent : false,
            })
            
            punch.updateReservationPunchInfo(punchRecordsData, function (err, datas) {
              if (err) {
                console.error('error: ', err);
              } else {
                console.info(datas)
                punchRecords = punchRecords.filter(e => e._id != datas.punchRecord._id)
                punchRecords.push(datas.punchRecord)
                let dataJson = {
                  punch: punchs,
                  punchRecords: punchRecords
                }
                self.isDisplay(dataJson)
              }
            });
          }
         

        })
      }
    });
  },

  //预约明天打卡
  reservation(e){
    
    let self = this
    let data={
      punch: e.currentTarget.dataset.id,
      formId: e.detail.formId,
      count:self.data.punchCounts
    }
    console.log(self.data.punchCounts)
    punch.updateReservationPunchInfo(data, function (err, datas) {
      if (err) {
        console.error('error: ', err);
      } else {
        let punch = self.data.punch
        let punchRecordsArray = self.data.punchRecords
        let punchRecordsList = punchRecordsArray.filter(e => e._id != datas.punchRecord._id)
        punchRecordsList.push(datas.punchRecord)
        let dataJson = {
          punch: punch,
          punchRecords: punchRecordsList
        }
        wx.showToast({
          title: "您已成功预约"
        })
        self.isDisplay(dataJson)
      }
    });
  },

  fukuan(){
    let _this = this
    var data = {
      body: '7天打卡-确认加入',
      totalFee: 1
    }
    order.createOrder(data,function(err,order){
      wx.requestPayment({
        timeStamp: order.timeStamp,
        nonceStr: order.nonceStr,
        package: order.package,
        signType: order.signType,
        paySign: order.paySign,
        success: function(orderPayData){
          _this.setData({
            orderId: order.orderId
          })
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
    })
  },

  tuikuan(){
    let _this = this
    var data = {
      refundFee: 1,
      orderId : _this.data.orderId
    }
    order.refundOrder(data,function(err,data){
    })
  },

  deleteData(){
    let _this = this
    punch.updatePunchStart(function(err,data){
      _this.loadData()
    })
  },

  hasPunchSuccessPop(){
    let self = this
    self.setData({
      punchSuccessPop: !self.data.punchSuccessPop,
    })
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