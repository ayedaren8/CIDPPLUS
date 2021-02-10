// pages/indexs/index.js

import Dialog from '../../dist/dialog/dialog';
const { removeStorageList } = require("../../utils/util");
const app = getApp()
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		floatBannerShow: true,
		loginStatus: "",
		username: "",
		studentID: "",
		currentSemesterWeek: '',
		semesterWeekTotal: 16
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	login: function () {
		wx.navigateTo({
			url: '/pages/login/login',
		});
	},
	loginOut: function () {
		Dialog.confirm({
			title: '注销',
			message: '是否注销？'
		}).then(() => {
			app.globalData.loginStatus = false
			this.setData({
				loginStatus: app.globalData.loginStatus,
			})
			wx.setStorage({
				key: "settings",
				data: {
					loginStatus: app.globalData.loginStatus,
					keepPassword: app.globalData.keepPassword,
					onExitClearCache: app.globalData.onExitClearCache,
				}
			});
			removeStorageList(['grade', 'course', 'exam', 'studentInfo'])
			app.globalData.needRelanch = true
		})
	},
	gotoMakepic: function () {
		wx.navigateTo({
			url: '/pages/generate-avatar/product/index'
		});
	},

	delFloatImg: function () {
		this.setData({
			floatBannerShow: false
		})
	},
	onLoad: function () {
		this.setData({
			loginStatus: app.globalData.loginStatus,
			currentSemesterWeek: app.globalData.termWeek,
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		if (typeof this.getTabBar === 'function' && this.getTabBar()) {
			this.getTabBar().setData({
				selected: 2
			})
		}
		let res = wx.getStorageSync("studentInfo");
		this.setData({
			loginStatus: app.globalData.loginStatus,
			username: res.name,
			studentID: res.srNum
		})
	},
	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {
		this.gotoMakepic()
		wx.stopPullDownRefresh()
	},
})