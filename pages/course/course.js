// pages/grade/grade.js
const app = getApp()
const grep = require("../../utils/grep.js");
import Toast from '../../dist/toast/toast';
import Dialog from '../../dist/dialog/dialog';
Page({

    /**
     * 页面的初始数据
     */ ///
    data: {
        active: 1,
        NOW_WEEK: 1,
        TERM_WEEK:'',
        colorList: ['#F39D43', '#803FEA', '#FF6C69', '#487BFF', '#FF5656', '#487B9B', '#187F8D', '#2966FF', '#CC4848', '#EB548F'],
        day_list: {
            MON: [],
            TUES: [],
            WED: [],
            THUR: [],
            FRI: [],
            SAT: [],
            SUN: []
        },
        slotStart: {
            96: 0,
            106: 83,
            122: 174,
            134: 257,
            168: 348,
            180: 431,
            194: 522,
            206: 605,
            228: 696,
            240: 779
        },
        noData:false,
        show: false,
        showPopinfo:""
    },


    showPopup() {
        this.setData({
            show: true
        });
    },

    onClose() {
        this.setData({
            show: false
        });
    },
    subWeek: function (e) {
        console.log(e.detail);
        if (this.data.NOW_WEEK > 1) {
            this.setData({
                NOW_WEEK: this.data.NOW_WEEK - 1
            })
        }
    },
    addWeek: function (e) {
        console.log(e.detail);
        if (this.data.NOW_WEEK < 20) {
            this.setData({
                NOW_WEEK: this.data.NOW_WEEK + 1
            })
        }

    },
    clearData: function (res) {
        for (const item of res) {
            item.OnMonday?this.pushList("MON", item):null
            item.OnTuesday? this.pushList("TUES", item):null
            item.OnWednesday?this.pushList("WED", item):null
            item.OnThursday? this.pushList("THUR", item):null
            item.OnFriday?this.pushList("FRI", item):null
            item.OnSaturday?this.pushList("SAT", item):null
            item.OnSunday?this.pushList("SUN", item):null
        }
        console.log(this.data);
    },
    pushList: function (day, item) {
        let solt = item.TimeSlotEnd - item.TimeSlotStart
        let length
        switch (solt) {
            case 10:
                length = 1
                break;
            case 22:
                length = 2
                break;
            case 36:
                length = 3
                break;
            case 48:
                length = 4
                break;
            default:
                break;
        }
        console.log();
        var datas = {
            cname: item.LUName,
            location: item.Campus,
            building: item.Building,
            classroom: item.Classroom,
            teacher: item.FullName,
            begin: item.WeekStart,
            end: item.WeekEnd,
            info: item.Remark,
            interval: item.WeekInterval == 0 ? item.WeekInterval + 1 :item.WeekInterval + 1 - (item.WeekStart%2),
            colorid: item.LUCode % 7,
            Y: this.data.slotStart[item.TimeSlotStart],
            len: length
        }
        this.data.day_list[day].push(datas)
        var list = this.data.day_list
        this.setData({
            day_list: list
        })
    },

    showDetail: function (e) {
        var datas=e.currentTarget.dataset.set
        console.log(datas);
        this.setData({showPopinfo:datas})
        this.showPopup();

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            NOW_WEEK: app.globalData.termWeek
        })
        this.setData({
            TERM_WEEK: app.globalData.termWeek
        })
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
                key: 'course',
                success: (result) => {
                    that.clearData(result.data["Data"])
                },
                fail: () => {
                    grep.login(stInfo.stid, stInfo.stpwd, "course")
                    // 定义回调函数
                    grep.courseReady = api => {
                        wx.getStorage({
                            key: 'course',
                            success: (result) => {
                                var res = result.data["Data"]
                                that.clearData(res)
                            }
                        });
                    }
                },
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
        if(app.globalData.needRelanch){
            this.onLoad()
            app.globalData.needRelanch=false
        }
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                selected: 1
            })
        }
        this.setData({
            NOW_WEEK: app.globalData.termWeek
        })
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
                key: 'course',
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