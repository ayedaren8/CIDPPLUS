// pages/login/login.js
const app = getApp()
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
        mainColor: app.globalData.theme_main_color,
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
        console.log(event.detail)
    },


    // 表单验证函数
    loginBefore: function(event) {
        console.log(this.data.stid.length)
        if (this.data.stid.length < 7) {
            Notify({ type: 'warning', message: '请检查用户名' });
        } else if (this.data.stid.length == 0) {
            Notify({ type: 'warning', message: '用户名不能为空' });
        } else if (this.data.stpwd.length == 0) {
            Notify({ type: 'warning', message: '密码不能为空' });
        } else {
            this.login(this.data.stid, this.data.stpwd, "getInfo")
        }
    },
    // 登录请求函数
    login: function(stid, stpwd, api) {
        // 加载Toast提示
        Toast.loading({
            mask: true,
            message: '加载中，请耐心等候...',
            duration: 0
        });
        // 发起请求
        wx.request({
            url: 'http://127.0.0.1:8000/api/',
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
                // 500为服务器错误 588为自定义错误码 表示用户名或密码出现错误 589表示请求出现了验证码
                console.log(result.statusCode)
                if (result.statusCode != 200) {
                    if (result.statusCode == 588) {
                        Toast.clear()
                        Toast.fail("学号或者办事大厅密码不正确！")
                    } else if (result.statusCode == 589) {
                        Toast.clear()
                        Toast.fail({
                            mask: true,
                            message: '小程序暂时无法处理验证码，请手动在网页端重新登录后使用！',
                            duration: 5000
                        });

                    } else {
                        Toast.clear()
                        Toast.fail("服务器无法处理你的请求，请联系开发人员")
                    }
                    app.globalData.LOGIN_FLAG = false
                    Notify({ type: 'warning', message: "错误" + result.statusCode, })
                    return false
                } else {
                    Toast.clear()
                    Toast.success("请求成功")
                        //请求成功,缓存用户名密码到本地下次免输入
                    var stInfo = { stid: stid, stpwd: stpwd }
                    wx.setStorageSync("stInfo", stInfo)
                        // 更改登陆状态
                    app.globalData.LOGIN_FLAG = true
                        //缓存用户信息列表
                    var res = result.data
                    console.log(res)
                    wx.setStorage({
                        key: "infoList",
                        data: result.data
                    });
                    app.globalData.PROCESS = "登陆成功"
                    wx.navigateBack({
                        delta: 1
                    });
                }
            },

            fail: () => {
                Notify({ type: 'danger', message: "网络通讯故障" })
                Toast.clear()
            },
            complete: () => {}
        });
    },





    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var stInfo = wx.getStorageSync("stInfo");
        console.log("stInfo")
        console.log(stInfo)
        if (stInfo) {
            this.setData({ stid: stInfo.stid, stpwd: stInfo.stpwd })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        wx.removeStorage({
            key: 'grade',
            success: (result) => {
                console.log("成功删除成绩缓存")
            },
            fail: () => {},
            complete: () => {}
        });
        wx.removeStorage({
            key: 'class',
            success: (result) => {
                console.log("成功删除成绩缓存")
            },
            fail: () => {},
            complete: () => {}
        });

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        var stInfo = wx.getStorageSync("stInfo");
        console.log("stInfo")
        console.log(stInfo)
        if (stInfo) {
            this.setData({ stid: stInfo.stid, stpwd: stInfo.stpwd })
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