//app.js
App({
	onLaunch: function () {
		wx.cloud.init({
			env: 'cidpplus-ke5cs',
			traceUser: true,
		})
		var that = this;
		var settings = wx.getStorageSync("settings"); //读取配置文件
		if (settings) {
			that.globalData.loginStatus = settings['loginStatus']
			that.globalData.keepPassword = settings['keepPassword']
			that.globalData.onExitClearCache = settings['onExitClearCache']
			that.globalData.termWeek = settings['currentWeekIndex'] || 19
		}
		if (this.globalData.onExitClearCache == true) {
			wx.removeStorage({
				key: 'grade'
			});
			wx.removeStorage({
				key: 'course'
			});
			wx.removeStorage({
				key: 'exam'
			});
		}
		wx.getSystemInfo({
			success: function (e) {
				var a = e.model;
				// 
				if (a.indexOf("iPhone") != -1 && a.indexOf("X") != -1 || a.indexOf("iPhone") != -1 && a.indexOf("11") != -1) { //是不是包含iphoneX
					that.globalData.isIphoneX = true
				} else {
					that.globalData.isIphoneX = false
				}
			}
		})
	},
	globalData: {
		studentName: "",
		loginStatus: false,
		isIphoneX: false,
		DOMAIN: "https://ayedaren.cn/api/",
		TermStartMonth: 9,
		TermStartDay: 17,
		NowWeeK: '1',
		termWeek: '',
		overWeek: '16',
		onExitClearCache: false,
		keepPassword: true,
		needrelanch: false
	},
})