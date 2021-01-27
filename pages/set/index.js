// pages/set/index.js
const app = getApp();
const { removeStorageList } = require("../../utils/util");
import Dialog from '../../dist/dialog/dialog';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		btnSize: "",
		keepPassword: '',
		onExitClearCache: '',
		loginStatus: '',
		studentName: "",
		studentID: ""
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
				loginStatus: app.globalData.loginStatus
			})
			wx.setStorage({
				key: "settings",
				data: {
					loginStatus: false,
					keepPassword: app.globalData.keepPassword,
					onExitClearCache: app.globalData.onExitClearCache,
					currentWeekIndex: '',
					currentWeekIndex: ''
				}
			});

			removeStorageList(['grade', 'course', 'exam', 'studentInfo'])
			wx.removeStorage({
				key: 'grade'
			});
			wx.removeStorage({
				key: 'studentInfo'
			});
			wx.removeStorage({
				key: 'course'
			});
			wx.removeStorage({
				key: 'exam'
			});
			app.globalData.needRelanch = true
		})
	},
	onChange_keepPassword: function () {
		app.globalData.keepPassword = this.data.keepPassword == true ? false : true
		this.setData({
			keepPassword: app.globalData.keepPassword
		})
		wx.setStorage({
			key: "settings",
			data: {
				loginStatus: app.globalData.loginStatus,
				keepPassword: app.globalData.keepPassword,
				onExitClearCache: app.globalData.onExitClearCache,
				currentWeekIndex: ''
			}
		});
	},
	onChange_onExitClearCache: function () {
		Dialog.confirm({
			title: this.data.onExitClearCache == false ? '不推荐的选项' : '很高兴你这么做',
			message: this.data.onExitClearCache == true ? '关闭选项将极大提高程序运行速度，强烈建议,下面也有专门更新数据的选项！' : '打开此选项会导致程序加载时间延长，但数据更新会更及时。'
		}).then(() => {
			app.globalData.onExitClearCache = this.data.onExitClearCache == true ? false : true
			this.setData({
				onExitClearCache: app.globalData.onExitClearCache
			})
			wx.setStorage({
				key: "settings",
				data: {
					loginStatus: app.globalData.loginStatus,
					keepPassword: app.globalData.keepPassword,
					onExitClearCache: app.globalData.onExitClearCache,
					currentWeekIndex: ''
				}
			});
		})
	},
	clearCaches: function (e) {
		let cacheName = e.currentTarget.dataset.title
		Dialog.confirm({
			title: '清除缓存',
			message: '清除缓存后会更新此项数据'
		}).then(() => {
			wx.removeStorage({
				key: cacheName,
				success: () => {
					app.globalData.needRelanch = true
				}
			});
		})
	},

	onLoad: function () {
		this.setData({
			keepPassword: app.globalData.keepPassword
		})
		this.setData({
			onExitClearCache: app.globalData.onExitClearCache
		})
		this.setData({
			btnSize: 48 * app.globalData.RPX
		})
	},
	toPage: function (data) {
		let title = data.currentTarget.dataset.title
		wx.navigateTo({
			url: '/pages/page/page?title=' + title
		})
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
		if (typeof this.getTabBar === 'function' &&
			this.getTabBar()) {

			this.getTabBar().setData({
				selected: 4
			})
		}
		let res = wx.getStorageSync("studentInfo");
		this.setData({
			loginStatus: app.globalData.loginStatus,
			studentName: res.name,
			studentID: res.srNum
		})
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