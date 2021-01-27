// 登录请求函数
const app = getApp();
import Notify from '../dist/notify/notify';
import Toast from '../dist/toast/toast';
let resErrorHandler = function (error) {
	switch (error.code) {
		case "user:badPassword":
			Toast.clear()
			Toast.fail(result.data["desc"])
			break;
		case "user:needCaptcha":
			Toast.clear()
			Toast.fail({
				mask: true,
				message: result.data["desc"],
				duration: 5000
			});
			break;
	}
	wx.switchTab({
		url: '../index/index',
	});
}

function login(studentID, studentPassword, path) {
	let api = path
	// 加载Toast提示

	// 发起请求
	wx.request({
		url: `${app.globalData.DOMAIN}${path}`,
		data: {
			"username": studentID,
			"password": studentPassword,
		},
		header: {
			'content-type': 'application/json'
		},
		method: 'POST',
		dataType: 'json',
		responseType: 'text',
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
				return
			} else {
				var res = result.data
				if (res["data"]) {
					Toast.clear()
					wx.setStorage({
						key: path,
						data: res["data"]
					});
					let _name = path + "Ready"
					if (this[_name]) {
						this[_name](path)
					}
				} else {

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

}


module.exports = {
	login: login
}