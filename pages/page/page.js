// pages/page/page.js
import privacyPolicy from '../../store/privacyPolicy'
import insructions from './instructions'
import versionDescription from './versionDescription'
import author from './author' 
Page({
    /**
     * 页面的初始数据
     */
    data: {
        title: "",
        textBody: ""

    },
    /**
     * 生命周期函数--监听页面加载
     */
    start: function() {
        let textBody
        switch (this.data.title) {
            case "隐私政策":
                textBody =privacyPolicy
                break;
            case "使用说明":
                textBody =insructions
                break;
            case "版本说明":
                textBody = versionDescription
                break;
            case "关于作者":
                textBody =author
                break;
            default:
                break;
        }
        this.setData({
            textBody: textBody
        })
    },

    onLoad: function (options) {
        
        this.setData({
            title: options.title
        })
        this.start()
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