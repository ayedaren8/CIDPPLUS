// pages/grade/grade.js
const app = getApp()
// const grep = require("../../utils/grep.js");
const { checkCache } = require("../../utils/request");
import Toast from '../../dist/toast/toast';
import Dialog from '../../dist/dialog/dialog';
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		active: 1,
		grade: ""
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {
		if (app.globalData.loginStatus === false) {
			Toast({
				type: 'fail',
				message: '请先登录',
				duration: 1000,
				onClose: () => {
					wx.switchTab({
						url: '/pages/index/index',
					})
				}
			});
		} else {
			checkCache.apply(this, ['grade'])
		}
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		if (app.globalData.needRelanch) {
			this.onLoad()
			app.globalData.needRelanch = false
		}
		if (app.globalData.loginStatus === false) {
			Toast({
				type: 'fail',
				message: '请先登录',
				duration: 1000,
				onClose: () => {
					wx.switchTab({
						url: '../index/index',
					});
				}
			});
		}
		if (typeof this.getTabBar === 'function' &&
			this.getTabBar()) {
			this.getTabBar().setData({
				selected: 3
			})
		}

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {
		wx.stopPullDownRefresh(() => { })
		Dialog.confirm({
			title: '更新数据？',
			message: '你确实要更新数据吗?'
		}).then(() => {
			wx.removeStorage({
				key: 'grade',
				success: () => {
					this.onLoad()
				}
			});
		}).catch(() => {
			// on cancel
		});
	}
})