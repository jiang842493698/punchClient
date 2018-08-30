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
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
    this.checkLoginStatus();
  },

  loadData() {
    let self = this
    activeUtil.getActive(function (err, data) {
      if (err) {
        console.error(err);
      } else {
        console.info(data)
        for (let a of data.active) {
          a.punch = data.punch.filter(p => p.active == a._id)
          a.punch[0].punchRecord = data.punchRecord.filter(pr => pr.punch == a.punch[0]._id)
          a.punch[0].reserve = data.reserve.filter(rs => rs.punch == a.punch[0]._id)
          a.punch[0].punchRecordTheDay = data.punchRecordTheDay.filter(pd => pd.punch == a.punch[0]._id)
          a.punch[0].reserveTheDay = data.reserveTheDay.filter(rd => rd.punch == a.punch[0]._id)
        }
        let currentDate = moment(data.punchInfoJson.currentTime).format("YYYY-MM-DD")
        let currentTime = moment(data.punchInfoJson.currentTime).valueOf()
        console.info("currentTime", currentTime)
        for (let a of data.active) {
          // a.hasPunchTime = moment(currentDate+" "+a.punch[0].startTime).valueOf() <= currentTime && currentTime<=  moment(currentDate+""+a.punch[0].endTime).valueOf()
          // a.hasReserveTime = currentTime >  moment(currentDate+" "+a.punch[0].endTime).valueOf() && currentTime <= moment(currentDate).endOf("day").valueOf()
          a.hasPunchTime = moment(currentDate + " " + "07:00").valueOf() <= currentTime && currentTime <= moment(currentDate + " " + "17:00").valueOf()
          a.hasReserveTime = currentTime > moment(currentDate + " " + "17:00").valueOf() && currentTime <= moment(currentDate).endOf("day").valueOf()
          a.punch[0].dataIndex = Math.floor((currentTime - moment(a.punch[0].startDate).valueOf()) / (24 * 60 * 60 * 1000))
        }

        self.setData({
          data,
          loadingComplete: true,
        })
      }
    })
  },

  /**点击打卡 */
  onPunch(e) {
    let self = this
    self.setData({
      onPunch: false
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
          if (data.dateIndex == 6) {
            punchInfoUtil.updatePunchStart(function (err, data) {
              if (err) {
              } else {
                self.setData({
                  punchSuccessPop: !self.data.punchSuccessPop,
                  punchEvent: true,
                  onPunch: true
                })
              }
            })
          } else {
            self.setData({
              punchSuccessPop: !self.data.punchSuccessPop,
              punchEvent: false,
              onPunch: true
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
    this.loadData();
  },
  savePunchInfo() {
    wx.navigateTo({
      url: "./punchInfo/index",
    });
  },

})