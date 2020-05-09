// pages/login/login.js
const app = getApp()
const grep = require("../../utils/backGrep.js");
import Notify from '../../dist/notify/notify';
import Toast from '../../dist/toast/toast';
Page({
    /**
     * 页面的初始数据
     */
    data: {
        stid: "",
        stpwd: "",
        btn_load: false,
        loadText: "登录",
        loading: false,
        value: '',
        btnText: "登录",
        stid: "",
        stpwd: ""
    },

    onChangeUser: function(event) {
        this.setData({
            stid: event.detail.value
        })
    },
    onChangePwd: function(event) {
        this.setData({
            stpwd: event.detail.value
        })
    },


    // 表单验证函数
    loginBefore: function(event) {
        if (this.data.stid.length < 7) {
            Notify({ type: 'warning', message: '请检查用户名' });
        } else if (this.data.stid.length == 0) {
            Notify({ type: 'warning', message: '用户名不能为空' });
        } else if (this.data.stpwd.length == 0) {
            Notify({ type: 'warning', message: '密码不能为空' });
        } else {
            this.login(this.data.stid, this.data.stpwd, "info")
        }
    },
    // 登录请求函数
    login: function(stid, stpwd, api) {
        // 加载Toast提示
        Toast.loading({
            mask: true,
            message: '正在执行教务爬虫，请耐心等候...',
            duration: 0
        });
        // 发起请求
        wx.request({
            url: app.globalData.DOMAIN + "api",
            data: {
                "username": stid,
                "password": stpwd,
                "apiname": api
            },
            header: {
                'content-type': 'application/json'
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            // 成功回调
            success: (result) => {
                if (result.statusCode != 200) {
                    Toast.clear()
                    Toast.fail("服务器无法处理你的请求，请联系开发人员")
                    Notify({
                        type: 'warning',
                        message: "错误" + result.statusCode,
                    })
                    wx.reLaunch({
                        url: '../index/index',
                    });
                    return false
                } else {
                    var res = result.data
                    if (res["STATUS"] == "OK") {
                        Toast.clear()
                        Toast.success("请求成功")
                        var stInfo = { stid: stid, stpwd: stpwd }
                        wx.setStorageSync("stInfo", stInfo)
                        app.globalData.LOGIN_FLAG = true
                        var res = result.data["message"]
                        console.log(res)
                        wx.setStorage({
                            key: "infoList",
                            data: result.data["message"]
                        });
                        wx.setStorage({
                            key: "set",
                            data: {
                                LOGIN_FLAG: app.globalData.LOGIN_FLAG,
                                notePWD: app.globalData.notePWD,
                                exitRE: app.globalData.exitRE
                            }
                        });
                        app.globalData.PROCESS = "登陆成功"
                        wx.navigateBack({
                            delta: 1
                        });
                    } else {

                        switch (result.data["message"]) {
                            case "pwdError":
                                Toast.clear()
                                Toast.fail("学号或者办事大厅密码不正确！")
                                    // wx.reLaunch({
                                    //     url: '../index/index',
                                    // });
                                break;
                            case "capError":
                                Toast.clear()
                                Toast.fail({
                                    mask: true,
                                    message: '小程序暂时无法处理验证码，请手动在网页端重新登录后使用！',
                                    duration: 5000
                                });
                                // wx.reLaunch({
                                //     url: '../index/index',
                                // });
                                break;
                        }

                    }

                }

                //请求成功,缓存用户名密码到本地下次免输入

                // 更改登陆状态

                //缓存用户信息列表

            },

            fail: () => {
                Notify({ type: 'danger', message: "网络通讯故障" })
                Toast.clear()
            },
            complete: () => {}
        });
    },


    policy: function(params) {
        wx.navigateTo({
            url: '/pages/page/page?title=隐私政策'
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(app.globalData.notePWD);
        wx.removeStorage({
            key: 'grade',
            success: (result) => {
                console.log("成功删除成绩缓存")
            },
            fail: () => {},
            complete: () => {}
        });
        wx.removeStorage({
            key: 'course',
            success: (result) => {
                console.log("成功删除课表缓存")
            },
            fail: () => {},
            complete: () => {}
        });
        wx.removeStorage({
            key: 'exam',
            success: (result) => {
                console.log("成功删除课表缓存")
            },
            fail: () => {},
            complete: () => {}
        });
        if (app.globalData.notePWD == true) {
            var stInfo = wx.getStorageSync("stInfo");
            if (stInfo) {
                this.setData({ stid: stInfo.stid, stpwd: stInfo.stpwd })
            }
        } else {
            this.setData({ stid: "", stpwd: "" })
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
        if (app.globalData.notePWD == true) {
            var stInfo = wx.getStorageSync("stInfo");
            if (stInfo) {
                this.setData({ stid: stInfo.stid, stpwd: stInfo.stpwd })
            }
        }
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
        grep.login(this.data.stid, this.data.stpwd, "grade")
        grep.login(this.data.stid, this.data.stpwd, "course")
        grep.login(this.data.stid, this.data.stpwd, "exam")
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