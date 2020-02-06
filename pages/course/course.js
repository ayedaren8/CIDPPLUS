// pages/grade/grade.js
const app = getApp()
const grep = require("../../utils/grep.js");
import Notify from '../../dist/notify/notify';
import Toast from '../../dist/toast/toast';
import Dialog from '../../dist/dialog/dialog';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 1,
        day_lsit: ["一", "二", "三", "四", "五", "六", "日"]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log("sss", app.globalData.LOGIN_FLAG)
        console.log(app.globalData.LOGIN_FLAG)
        if (app.globalData.LOGIN_FLAG == true) {
            Toast({
                type: 'fail',
                message: '请先登录',
                onClose: () => {
                    wx.reLaunch({
                        url: '../index/index',
                    });
                }
            });

        } else {
            var stInfo = wx.getStorageSync("stInfo");
            var that = this
                // 检查缓存 如果存在缓存直接读取 注意此缓存下一次登录会被删除
            wx.getStorage({
                key: 'getCourse',
                success: (result) => {
                    that.setData({ course: result.data["Data"] })
                    console.log(result.data["Data"]);

                },
                fail: () => {
                    grep.login(stInfo.stid, stInfo.stpwd, "getCourse")
                        // 定义回调函数
                    grep.getCourseReady = api => {
                        wx.getStorage({
                            key: 'getCourse',
                            success: (result) => {
                                that.setData({ course: result.data["Data"] })
                                console.log(result.data)
                            },
                            fail: () => {},
                            complete: () => {}
                        });
                    }
                },
                complete: () => {}
            });


        }
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