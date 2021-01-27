// pages/exam/index.js
const app = getApp();
const { checkCache } = require("../../utils/request");
const grep = require("../../utils/grep.js");
import Toast from '../../dist/toast/toast';
import Dialog from '../../dist/dialog/dialog';

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		note_1: "你目前没有考试",
		note_2: "但也不要忘记学习啊",
		exam: '',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */

	onLoad: function (options) {
		if (app.globalData.loginStatus == false) {
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
			var _this = this
			checkCache.apply(this, ['exam']).then(() => {
				let examCount = 0
				_this.data.exam.b.forEach((el) => {
					if (!el.IsPass) {
						examCount++
					}
				})
				if (examCount > 0) {
					_this.setData({
						note_1: "你目前有" + examCount + "门考试",
						note_2: "抓紧时间复习呦"
					})
				}
			})
		}
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
		if (app.globalData.needRelanch) {
			this.onLoad()
			app.globalData.needRelanch = false
		}

		if (typeof this.getTabBar === 'function' &&
			this.getTabBar()) {

			this.getTabBar().setData({
				selected: 0
			})
		}
		if (app.globalData.loginStatus == false) {
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
		wx.stopPullDownRefresh()
		Dialog.confirm({
			title: '更新数据？',
			message: '你确实要更新数据吗?'
		}).then(() => {
			wx.removeStorage({
				key: 'exam',
				success: (result) => {
					this.onLoad()
				},
				fail: () => { },
				complete: () => { }
			});
		}).catch(() => {
			// on cancel
		});
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