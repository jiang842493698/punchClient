// pages/punch/index.js
const app = getApp();
const gamblerUtil = require('../../utils/api/gambler');
const punchUtil = require('../../utils/api/punch')
const punchInfoUtil = require('../../utils/api/punchInfo')
const sessionUtil = require('../../utils/wx-extend/session');
const activeUtil = require('../../utils/api/active');
const reserveUtil = require('../../utils/api/reserve');
const moment = require('../../utils/moment.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    serInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loadingComplete: false,
    onReserve: true,
    onPunch: true,
    punchSuccessPop: false,
    onMore: false,
    moreId: "",
    onParticipate:true,
    dateIndex : 0,
    punchName: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
    this.checkLoginStatus();
    this.timeOut()
  },
  // onUpdate(){
  //   punchUtil.updateActiveAndPunch(function(err,data){
  //     console.info("gggggggggggggg")
  //   })
  // },

  /**删除数据 */
  delete(e){
    let self = this
    console.info(e.currentTarget.dataset.id)
    wx.showModal({
      title: "提示",
      content: "是否确认删除本条记录",
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: res => {
        if(res.confirm){
          activeUtil.deleteActive(e.currentTarget.dataset.id,function(err,activeData){
            if(err){
              console.error(err)
            }else{
              self.loadData();
              self.setData({
                onMore: !self.data.onMore,
              })
            }
          })
        }
      },
      complete: function(){
        
      }
    });
  },

  /**修改活动数据 */
  update(e){
    console.info(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "/pages/punch/punchInfoupdate/index?id="+e.currentTarget.dataset.id
    });
  },

  /**取消 */
  cancel(){
    let self = this
    self.setData({
      onMore: !self.data.onMore,
    })
  },

  /**点击更多操作 */
  more(e){
    console.info(e.currentTarget.dataset.id)
    console.info(e.currentTarget.dataset.status)
    let moreId = e.currentTarget.dataset.id
    let self = this
    // if(e.currentTarget.dataset.status){
    //   wx.showModal({
    //     title: "提示",
    //     content: "当前活动正在进行中不可删除或修改",
    //     showCancel: true,
    //     cancelText: '取消',
    //     cancelColor: '#000000',
    //     confirmText: '确定',
    //     confirmColor: '#3CC51F',
    //     success: res => {
    //       if(res.confirm){}
    //     }
    //   });
    // }else{
      self.setData({
        onMore: !self.data.onMore,
        moreId
      })
    // }
    
  },

  loadData() {
    let self = this
    activeUtil.getActive(function (err, data) {
      if (err) {
        console.error(err);
      } else {
        console.info(data)
        let currentDate = moment(data.punchInfoJson.currentTime).format("YYYY-MM-DD")
        let currentTime = moment(data.punchInfoJson.currentTime).valueOf()
        console.info("currentTime", currentTime)
        for (let a of data.active) {
          a.punch = data.punch.filter(p => p.active == a._id)
          a.punchCycle = data.getPunchCycle.filter(g => g.active == a._id)
          
          if(a.punch.length==0){
            a.punch[0]={
              startTime: a.defaultStartTime,
              endTime: moment(currentDate+" "+a.defaultStartTime).add(a.timeStatus,"minute").format("HH:mm"),
              startDateFormat: moment(a.defaultStartDate).format("YYYY-MM-DD"),
              endDateFormat: moment(a.defaultStartDate).add(a.dateStatus,"day").format("YYYY-MM-DD"),
            }
            
          }else{
            
            // a.hasReserveTime = currentTime >  moment(currentDate+" "+a.punch[0].endTime).valueOf() && currentTime <= moment(currentDate).endOf("day").valueOf()
            a.hasPunchTime = moment(currentDate + " " + "07:00").valueOf() <= currentTime && currentTime <= moment(currentDate + " " + "22:00").valueOf()
            a.hasReserveTime = currentTime > moment(currentDate + " " + "22:00").valueOf() && currentTime <= moment(currentDate).endOf("day").valueOf()
            a.punch[0].dataIndex = Math.floor((currentTime - moment(a.punch[0].startDate).valueOf()) / (24 * 60 * 60 * 1000))

            //判断是否超时
            if(moment(a.punch[0].endDateFormat+" "+a.punch[0].endTime).valueOf() < currentTime && a.status == true){
              console.info("a.punch[0].endDateFormat",a.punch[0].endDateFormat)
              let datajson = {
                activeId : a._id,
                status: false,
                startDate: moment(currentTime).add(1,"day").toDate()
              }
              console.info("datajson",moment(currentTime).format("YYYY-MM-DD"))
              activeUtil.updateActiveByStatus(datajson,function(err,result){
                if(err){
                  return 
                }else{
                  console.info("result",result)
                  self.onLoad()
                  return
                }
              })
            }
            a.punch[0].punchRecord = data.punchRecord.filter(pr => pr.punch == a.punch[0]._id)
            a.punch[0].reserve = data.reserve.filter(rs => rs.punch == a.punch[0]._id)
            a.punch[0].punchRecordTheDay = data.punchRecordTheDay.filter(pd => pd.punch == a.punch[0]._id)
            a.punch[0].reserveTheDay = data.reserveTheDay.filter(rd => rd.punch == a.punch[0]._id)
            let dataList = [false,false,false,false,false,false,false]
            for(let g of a.punch[0].punchRecord){
              dataList[g.punchDay-1] = true
            }
            a.dataList = dataList.splice(0,a.punch[0].dataIndex+1)
            console.info(moment(a.punch[0].endDateFormat+" "+a.punch[0].endTime).format("YYYY-MM-DD HH:mm:ss"))
            
          }
          
        }

        
       
        console.info(data)
        // self.timeOut(self.data.data)
        self.setData({
          data,
          loadingComplete: true,
        })
      }
    })
  },

  timeOut(){
    let self = this
    // setInterval(function(){
    //   self.loadData()
    // },3000)
  },

  /**点击打卡 */
  onPunch(e) {
    console.info(e)
    let self = this
    self.setData({
      onPunch: false,
      punchName:e.currentTarget.dataset.name,
    })
    wx.showLoading({
      title: "加载中",
      mask: true,
    });
    let data = {
      dateIndex: e.currentTarget.dataset.index,
      punch: e.currentTarget.dataset.id,
      formId: e.detail.formId,
    }
    
    punchInfoUtil.savePunchInfo(data, function (err, punchRecord) {
      if (err) {
        console.error(err)
      } else {
        if (punchRecord.err) {
          wx.showToast({
            title: "超过打卡时间",
            icon: 'none',
            duration: 1500,
            mask: false,
          });
          self.setData({
            onPunch: true
          })
        } else {
          //退款
          // order.refundOrder({
          //   refundFee: 100,
          //   orderId: punchs.order
          // }, function (err, orders) {
          //   if (err) {
          //     console.error(err)
          //   } else {
          wx.hideLoading();
          //判断当天是否是最后一天打卡
          console.info(data.dateIndex)
          if (data.dateIndex == 6) {
            
            let datajson = {
              activeId :  e.currentTarget.dataset.activeid,
              status: false,
              startDate: moment(self.data.data.punchInfoJson.currentTime).add(1,"day").toDate()
            }
            activeUtil.updateActiveByStatus(datajson,function(err,data){
              self.loadData()
              self.setData({
                punchSuccessPop: !self.data.punchSuccessPop,
                punchEvent: true,
                onPunch: true,
                dateIndex: e.currentTarget.dataset.index,
              })
            })

            // punchInfoUtil.updatePunchStart(function (err, data) {
            //   if (err) {
            //   } else {
            //     self.setData({
            //       punchSuccessPop: !self.data.punchSuccessPop,
            //       punchEvent: true,
            //       onPunch: true
            //     })
            //   }
            // })
          } else {
            self.setData({
              punchSuccessPop: !self.data.punchSuccessPop,
              punchEvent: false,
              onPunch: true,
              dateIndex: e.currentTarget.dataset.index,
            })
            console.info(self.data)
          }
          //预约明天的数据
          reserveUtil.saveReserve(data, function (err, datas) {
            if (err) {
              console.error('error: ', err);
            } else {
              console.info(datas)
              self.loadData()
            }
          });
          //   }
          // })
        }
      }
    })
  },

  /**参与打卡 */
  onParticipate(e){
    let self = this
    console.info("gggggggggg",e)
    let order = "1"
    let dataJson = {
      activeId: e.currentTarget.dataset.id,
      formId: e.detail.formId,
      order, 
    }
    activeUtil.updateActiveAndInsertPunch(dataJson,function(err,active){
      if(err){

      }else{
        console.info(active)
        self.loadData()
      }
    })

  },

  /**放弃分享按钮 */
  hasPunchSuccessPop() {
    let self = this
    self.setData({
      punchSuccessPop: !self.data.punchSuccessPop,
    })
  },

  /**预约打卡 */
  onReserve(e) {
    let self = this
    self.setData({
      onReserve: !self.data.onReserve
    })
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
    reserveUtil.saveReserve(data, function (err, datas) {
      if (err) {
        console.error('error: ', err);
      } else {

        self.loadData()
        wx.hideLoading();
        self.setData({
          onReserve: !self.data.onReserve
        })
        wx.showToast({
          title: "您已成功预约"
        })

      }
    });
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


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      onMore: false
    })
    this.loadData();
  },
  savePunchInfo() {
    wx.navigateTo({
      url: "./punchInfo/index",
    });
  },

})