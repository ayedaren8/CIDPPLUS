// pages/set/index.js
const app = getApp();
import Dialog from '../../dist/dialog/dialog';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        btnSize: "",
        notePWD: '',
        exitRE: '',
        LOGIN_FLAG: '',
        USERNAME: "",
        studentID: "",
        NowWeek: "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    login: function() {
        wx.navigateTo({
            url: '/pages/login/login',
            success: (result) => {

            },
            fail: () => {},
            complete: () => {}
        });
    },
    loginOut: function() {
        Dialog.confirm({
            title: '注销',
            message: '是否注销？'
        }).then(() => {
            app.globalData.LOGIN_FLAG = false
            this.setData({ LOGIN_FLAG: app.globalData.LOGIN_FLAG })
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
        }).catch(() => {
            // on cancel
        });
    },
    onChange_notePWD: function() {
        app.globalData.notePWD = this.data.notePWD == true ? false : true
        console.log(app.globalData.notePWD);
        this.setData({ notePWD: app.globalData.notePWD })
        wx.setStorage({
            key: "set",
            data: {
                LOGIN_FLAG: app.globalData.LOGIN_FLAG,
                notePWD: app.globalData.notePWD,
                exitRE: app.globalData.exitRE
            }
        });
    },
    onChange_exitRE: function() {
        Dialog.confirm({
            title: '确定吗？',
            message: '打开此选项会导致程序加载时间延长，但数据更新会更及时。'
        }).then(() => {
            app.globalData.exitRE = this.data.exitRE == true ? false : true
            this.setData({ exitRE: app.globalData.exitRE })
            wx.setStorage({
                key: "set",
                data: {
                    LOGIN_FLAG: app.globalData.LOGIN_FLAG,
                    notePWD: app.globalData.notePWD,
                    exitRE: app.globalData.exitRE
                }
            });

        }).catch(() => {
            // on cancel
        });
    },
    delREC: function(e) {
        let rec = e.currentTarget.dataset.title
        Dialog.confirm({
            title: '清除缓存',
            message: '清除缓存后会更新此项数据'
        }).then(() => {
            wx.removeStorage({
                key: rec,
                success: (result) => {
                    console.log("成功删除" + rec + "缓存")
                },
                fail: () => {},
                complete: () => {}
            });
            wx.redirectTo({
                url: '/pages/set/index',
                success: (result) => {

                },
                fail: () => {},
                complete: () => {}
            });
        }).catch(() => {
            // on cancel
        });
    },

    onLoad: function(options) {
        this.setData({ notePWD: app.globalData.notePWD })
        this.setData({ exitRE: app.globalData.exitRE })
        this.setData({ btnSize: 48 * app.globalData.RPX })
    },
    toPage: function(data) {
        let title = data.currentTarget.dataset.title
        console.log(data.currentTarget.dataset.title);
        wx.navigateTo({
            url: '/pages/page/page?title=' + title
        })

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
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            console.log('设置选中项 0')
            this.getTabBar().setData({
                selected: 4
            })
        }
        let res = wx.getStorageSync("infoList");
        console.log(res);
        this.setData({
            LOGIN_FLAG: app.globalData.LOGIN_FLAG,
            USERNAME: res.name,
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