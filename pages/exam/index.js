// pages/exam/index.js
const app = getApp();
const grep = require("../../utils/grep.js");
import Toast from '../../dist/toast/toast';
import Dialog from '../../dist/dialog/dialog';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        note_1: "你目前没有考试",
        note_2: "但也不要忘记学习啊",
        exam: '',

    },

    /**
     * 生命周期函数--监听页面加载
     */

    onLoad: function (options) {
        console.log(app.globalData.LOGIN_FLAG);

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
                key: 'exam',
                success: (result) => {
                    that.setData({
                        exam: result.data['b']
                    })
                    if (that.data.exam.length > 0) {
                        that.setData({
                            note_1: "你目前有" + that.data.exam.length + "门考试",
                            note_2: "抓紧时间复习呦"
                        })
                    }
                },
                fail: () => {
                    grep.login(stInfo.stid, stInfo.stpwd, "exam")
                    // 定义回调函数
                    grep.examReady = api => {
                        wx.getStorage({
                            key: api,
                            success: (result) => {
                                that.setData({
                                    exam: result.data['b']
                                })
                                console.log(result.data['b']);
                                if (that.data.exam.length > 0) {
                                    that.setData({
                                        note_1: "你目前有" + that.data.exam.length + "门考试",
                                        note_2: "抓紧时间复习呦"
                                    })
                                }
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

        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            console.log('设置选中项 0')
            this.getTabBar().setData({
                selected: 0
            })
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
      wx.stopPullDownRefresh() 
        Dialog.confirm({
            title:  '更新数据？',
            message: '你确实要更新数据吗?'
        }).then(() => {
            wx.removeStorage({
                key: 'exam',
                success: (result) => {
                    this.onLoad()
                },
                fail: () => {console.log("失败了");
                },
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