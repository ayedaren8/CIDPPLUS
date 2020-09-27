// pages/indexs/index.js

import Dialog from '../../dist/dialog/dialog';
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        // floatBannerShow:true,
        isLogin:"",
        username: "",
        studentID: "",
        currentSemesterWeek: 2,
        semesterWeekTotal:16  
    },
    /**
     * 生命周期函数--监听页面加载
     */
    login: function () {
        wx.navigateTo({
          url: '/pages/login/login',
          success: (result) => {},
          fail: () => {},
          complete: () => {}
        });
      },
    loginOut: function () {
        Dialog.confirm({
          title: '注销',
          message: '是否注销？'
        }).then(() => {
          app.globalData.LOGIN_FLAG = false
          this.setData({
            isLogin: app.globalData.LOGIN_FLAG,
          })
          wx.removeStorage({
            key: 'grade',
            success: (result) => {
            },
            fail: () => {},
            complete: () => {}
          });
          wx.removeStorage({
            key: 'course',
            success: (result) => {
  
            },
            fail: () => {},
            complete: () => {}
          });
          wx.removeStorage({
            key: 'exam',
            success: (result) => {
  
            },
            fail: () => {},
            complete: () => {}
          });
          app.globalData.needRelanch = true
        }).catch(() => {
          // on cancel
        });
      },  
    
    gotoMakepic:function(){
        wx.navigateTo({url: '/pages/generate-avatar/product/index'});
    },
    delFloatImg:function(){
        this.setData({floatBannerShow:false})
    },
    onLoad: function(options) {
      this.setData({ isLogin: app.globalData.LOGIN_FLAG})
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 2
            })
        }
        let res = wx.getStorageSync("infoList");
        this.setData({
            isLogin: app.globalData.LOGIN_FLAG,
            username: res.name,
            studentID: res.srNum
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
    
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        this.gotoMakepic()
        wx.stopPullDownRefresh()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
    }
})