// pages/indexs/index.js

import Dialog from '../../dist/dialog/dialog';
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // floatBannerShow:true,
    isLogin: "",
    username: "",
    studentID: "",
    currentSemesterWeek: 2,
    semesterWeekTotal: 16
  },
  /**
   * 生命周期函数--监听页面加载
   */
  login: function () {
    wx.navigateTo({
      url: '/pages/login/login',
    });
  },
  loginOut: function () {
    Dialog.confirm({
      title: '注销',
      message: '是否注销？'
    }).then(() => {
      app.globalData.loginStatus = false
      this.setData({
        isLogin: app.globalData.loginStatus,
      })
      wx.setStorage({
        key: "settings",
        data: {
          loginStatus: app.globalData.loginStatus,
          keepPassword: app.globalData.keepPassword,
          onExitClearCache: app.globalData.onExitClearCache,
        }
      });
      wx.removeStorage({
        key: 'grade'
      });
      wx.removeStorage({
        key: 'course'
      });

      wx.removeStorage({
        key: 'exam'
      });
      wx.removeStorage({
        key: 'studentInfo'
      });
      app.globalData.needRelanch = true
    })
  },

  gotoMakepic: function () {
    wx.navigateTo({
      url: '/pages/generate-avatar/product/index'
    });
  },
  delFloatImg: function () {
    this.setData({
      floatBannerShow: false
    })
  },
  onLoad: function (options) {
    this.setData({
      isLogin: app.globalData.loginStatus
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
    let res = wx.getStorageSync("studentInfo");
    this.setData({
      isLogin: app.globalData.loginStatus,
      username: res.name,
      studentID: res.srNum
    })
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
    this.gotoMakepic()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})