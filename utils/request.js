const app = getApp();
import Notify from '../dist/notify/notify';
import Toast from '../dist/toast/toast';
function MyRequest(studentID, studentPassword, path) {
	Toast.loading({
		mask: true,
		message: '加载中，请耐心等候...',
		duration: 0
	});
	return new Promise((resolve, reject) => {
		wx.request({
			url: `${app.globalData.DOMAIN}${path}`,
			data: {
				"username": studentID,
				"password": studentPassword,
			},
			timeout: 15000,
			header: {
				'content-type': 'application/json'
			},
			method: 'POST',
			dataType: 'json',
			// 成功回调
			success: (result) => {
				var res = result.data
				if (result.statusCode != 200) {
					Toast.clear()
					Toast.fail("服务器无法处理你的请求，请联系开发人员")
					Notify({
						type: 'warning',
						message: "错误" + result.statusCode,
					})
					reject(result)
				} else {
					if (res["data"]) {
						Toast.clear()
						wx.setStorage({
							key: path,
							data: res["data"]
						});
						resolve(path)
					} else if (res['code']) {

						Toast.clear()
						Toast.fail({
							mask: true,
							message: result.data["desc"],
							duration: 5000,
							onClose: () => {
								wx.switchTab({
									url: '../index/index',
								});
							}
						});
						reject(res)
					}
				}
			},
			fail: () => {
				Toast.clear()
				Notify({
					type: 'danger',
					message: "网络通讯故障"
				})
				wx.switchTab({
					url: '../index/index',
				});
			},
		});
	})
}



function checkCache(path) {
	var that = this
	var accountInfo = wx.getStorageSync("accountInfo");
	return new Promise((resolve, reject) => {
		// 检查缓存 如果存在缓存直接读取 注意此缓存下一次登录会被删除
		wx.getStorage({
			key: path,
			success(result) {
				that.setData({
					[path]: result.data
				})
				resolve(result.data)
			},
			fail() {
				MyRequest(accountInfo.studentID, accountInfo.studentPassword, path)
					.then((path) => {
						wx.getStorage({
							key: path,
							success(result) {
								that.setData({
									[path]: result.data
								})
								resolve(result.data)
							},
						});
					})
			},
		});
	})

}

module.exports = {
	MyRequest,
	checkCache
}