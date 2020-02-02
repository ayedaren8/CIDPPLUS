//index.js
//获取应用实例
const app = getApp()
import Dialog from '../../dist/dialog/dialog';
// pages/grade/grade.js
Page({

    /**
     * 页面的初始数据
     */


    data: {
        loginStatu: "点击头像登录",
        fontColor: "#2F2F4F",
        gird: [{ "icon": "/icon/cj.png", "text": "成绩", "type": "navigateTo", "url": "/pages/grade/grade" },
            { "icon": "/icon/keb.png", "text": "课表", "type": "navigateTo", "url": "" },
            { "icon": "/icon/kb.png", "text": "考表", "type": "navigateTo", "url": "" },
            { "icon": "/icon/rl.png", "text": "校历", "type": "navigateTo", "url": "" },
            { "icon": "/icon/wf.png", "text": "网费", "type": "navigateTo", "url": "" },
            { "icon": "/icon/fk.png", "text": "饭卡", "type": "navigateTo", "url": "" },
            { "icon": "/icon/jy.png", "text": "借阅", "type": "navigateTo", "url": "" },
            { "icon": "/icon/tz.png", "text": "通知", "type": "navigateTo", "url": "" },
        ]
    },

    changeLogin: function() {
        if (app.globalData.LOGIN_FLAG) {
            Dialog.confirm({
                title: '注销',
                message: '你已经登录过啦，是否注销？'
            }).then(() => {
                app.globalData.LOGIN_FLAG = false
                this.setData({ LOGIN_FLAG: app.globalData.LOGIN_FLAG, })
            }).catch(() => {
                // on cancel
            });

        } else {
            wx.navigateTo({
                url: '/pages/login/login',
                success: (result) => {
                    app.globalData.PROCESS = "当前正在登录"
                },
                fail: () => {},
                complete: () => {}
            });
        }


    },

    getPhoto: function(stid, stpwd) {
        let request = wx.request({
            url: 'http://127.0.0.1:8000/getPhoto/',
            method: 'POST',
            data: {
                "username": stid,
                "password": stpwd,
            },
            header: {
                'content-type': 'application/json'
            },
            dataType: 'json',
            responseType: 'image/jpeg',
            success: (result) => {
                wx.setStorage({
                    key: "photo",
                    data: result
                })
            },
            fail: () => {},
            complete: () => {}
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            LOGIN_FLAG: app.globalData.LOGIN_FLAG,
            mainColor: app.globalData.theme_main_color,
            secondaryColor: app.globalData.theme_secondary_color,
        })
        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: this.data.mainColor
        });


    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

        // this.setData({"backgroundColor":"green"})
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        let res = wx.getStorageSync("infoList");
        console.log(res.name)
        this.setData({
            LOGIN_FLAG: app.globalData.LOGIN_FLAG,
            USERNAME: res.name,
            PROCESS: app.globalData.PROCESS,
            mainColor: app.globalData.theme_main_color,
            secondaryColor: app.globalData.theme_secondary_color,
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