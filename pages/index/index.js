// pages/indexs/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        welcome: "别来无恙",
        percent: 95,
        dayList: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        monthArr: []
    },

    /**
     * 生命周期函数--监听页面加载
     */


    calender: function(year, month) {
        var d = new Date(2020, 1, 1)
        console.log(d.getDay())
    },


    onLoad: function(options) {
        var year = 2020
        var month = 1
        this.calender()


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
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 2
            })
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