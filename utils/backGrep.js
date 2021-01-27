const app = getApp();

function login(studentID, studentPassword, api) {
	let result = wx.request({
		url: app.globalData.DOMAIN + `${api}`,
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
		success: (result) => {
			console.log(result.statusCode)
			if (result.statusCode != 200) {
				console.log("后台执行" + api + "失败");
			} else {
				console.log("后台执行" + api + "成功");
				wx.setStorage({
					key: api,
					data: result.data['data']
				});
			}
		},
	});
}
module.exports = {
	login: login
}