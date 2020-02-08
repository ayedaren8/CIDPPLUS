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
        NOW_WEEK: 1,
        colorList: ['#F39D43', '#803FEA', '#FF6C69', '#487BFF', '#FF5656', '#487B9B', '#187F8D', '#2966FF', '#CC4848', '#EB548F'],
        day_list: {
            MON: {
                one: "",
                two: "",
                three: "",
                four: "",
                five: "",
            },
            TUES: {
                one: "",
                two: "",
                three: "",
                four: "",
                five: "",
            },
            WED: {
                one: "",
                two: "",
                three: "",
                four: "",
                five: "",
            },
            THUR: {
                one: "",
                two: "",
                three: "",
                four: "",
                five: "",
            },
            FRI: {
                one: "",
                two: "",
                three: "",
                four: "",
                five: "",
            },
            SAT: {
                one: "",
                two: "",
                three: "",
                four: "",
                five: "",
            },
            SUN: {
                one: "",
                two: "",
                three: "",
                four: "",
                five: "",
            }
        }

    },
    subWeek: function(e) {
        console.log(e.detail);
        if (this.data.NOW_WEEK > 1) {
            this.setData({ NOW_WEEK: this.data.NOW_WEEK - 1 })
        }
    },
    addWeek: function(e) {
        console.log(e.detail);
        if (this.data.NOW_WEEK < 20) {
            this.setData({ NOW_WEEK: this.data.NOW_WEEK + 1 })
        }

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
                    that.clearData(result.data["Data"])
                },
                fail: () => {
                    grep.login(stInfo.stid, stInfo.stpwd, "getCourse")
                        // 定义回调函数
                    grep.getCourseReady = api => {
                        wx.getStorage({
                            key: 'getCourse',
                            success: (result) => {
                                var res = result.data["Data"]
                                that.clearData(res)
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
    clearData: function(res) {
        console.log("清洗！");
        for (const item of res) {
            if (item.OnMonday) {
                this.pushList("MON", item)
            } else if (item.OnTuesday) {
                this.pushList("TUES", item)
            } else if (item.OnWednesday) {
                this.pushList("WED", item)
            } else if (item.OnThursday) {
                this.pushList("THUR", item)
            } else if (item.OnFriday) {
                this.pushList("FRI", item)
            } else if (item.OnSaturday) {
                this.pushList("SAT", item)
            } else if (item.OnSunday) {
                this.pushList("SUN", item)
            }

        }
        console.log(this.data);

    },
    pushList: function(day, item) {
        var num = Math.floor(Math.random() * 9)
        var data = {
            cname: item.LUName,
            location: item.Campus,
            building: item.Building,
            classroom: item.Classroom,
            teacher: item.FullName,
            begin: item.WeekStart,
            end: item.WeekEnd,
            info: item.Remark,
            interval: item.WeekInterval + 1,
            colorid: num
        }
        if (item.TimeSlotStart == 96) {
            var str = "day_list." + day + ".one";
            this.setData({
                [str]: data
            })
        } else if (item.TimeSlotStart == 122) {
            var str = "day_list." + day + ".two"
            this.setData({
                [str]: data
            })
        } else if (item.TimeSlotStart == 168) {
            var str = "day_list." + day + ".three"
            this.setData({
                [str]: data
            })
        } else if (item.TimeSlotStart == 194) {
            var str = "day_list." + day + ".four"
            this.setData({
                [str]: data
            })
        } else if (item.TimeSlotStart == 228) {
            var str = "day_list." + day + ".five"
            this.setData({
                [str]: data
            })
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
        Dialog.confirm({
            title: '重置课表',
            message: '你是否要重置课表？'
        }).then(() => {

        }).catch(() => {
            // on cancel
        });
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