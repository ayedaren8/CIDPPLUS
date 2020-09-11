// pages/grade/grade.js
const app = getApp()
const grep = require("../../utils/grep.js");
import Toast from '../../dist/toast/toast';
import Dialog from '../../dist/dialog/dialog';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 1,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (app.globalData.LOGIN_FLAG == false) {
            Toast({
                type: 'fail',
                message: '请先登录',
                duration: 1000,
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
                key: 'grade',
                success: (result) => {
                    that.setData({
                        grade: result.data
                    })
                },
                fail: () => {
                    grep.login(stInfo.stid, stInfo.stpwd, "grade")
                    // 定义回调函数
                    grep.gradeReady = api => {
                        wx.getStorage({
                            key: api,
                            success: (result) => {
                                that.setData({
                                    grade: result.data
                                })
                            },
                            fail: () => {

                            },
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
    onReady: function () {


    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if (app.globalData.needRelanch) {
            this.onLoad()
            app.globalData.needRelanch = false
        }
        if (app.globalData.LOGIN_FLAG == false) {
            Toast({
                type: 'fail',
                message: '请先登录',
                duration: 1000,
                onClose: () => {
                    wx.reLaunch({
                        url: '../index/index',
                    });
                }
            });

        }
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                selected: 3
            })
        }

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
        wx.stopPullDownRefresh((e) => {
            console.log(e)
        })
        Dialog.confirm({
            title: '更新数据？',
            message: '你确实要更新数据吗?'
        }).then(() => {
            wx.removeStorage({
                key: 'grade',
                success: (result) => {
                    this.onLoad()
                },
                fail: () => {},
                complete: () => {}
            });
        }).catch(() => {
            // on cancel
        });
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