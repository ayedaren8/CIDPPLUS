// pages/login/login.js
const app = getApp()

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
        mainColor: app.globalData.theme_main_color
    },
    login: function(res) {
        this.setData({
                loading: true,
                loadText: "加载中，请稍后..."
            })
            // console.log(res)
        let request = wx.request({
            url: 'http://127.0.0.1:8000/grade',
            data: {},
            header: {
                'content-type': 'application/json'
            },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                if (result.statusCode != 200) {
                    console.log('某个地方出错了')
                    this.setData({
                        loading: false,
                        btnType: "warning",
                        btnText: "某个地方出错了" + result.statusCode
                    })
                } else {
                    this.setData({
                        loading: false,
                        btnText: "成功登录",
                        grade: result.data
                    })
                    wx.setStorage({
                        key: "student",
                        data: this.data
                    })
                    wx.navigateTo({
                        url: '../grade/grade',
                        success: (result) => {},
                        fail: () => {},
                        complete: () => {}
                    });

                }
            },
            fail: () => {},
            complete: () => {}
        });
    },
    onChangeUser: function(event) {
        this.setData({
            stid: event.detail
        })
        console.log(this.data.stid)
    },
    onChangePwd: function(event) {
        this.setData({
            stpwd: event.detail
        })
        console.log(this.data.stid)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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