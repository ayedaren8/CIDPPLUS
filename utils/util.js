function removeStorageList(arr) {
	return new Promise((resolve, reject) => {
		if (typeof (arr) !== Array) {
			reject()
		}
		arr.forEach((el) => {
			wx.removeStorage({
				key: el
			});
		})
		resolve()
	})
}

module.exports = {
	removeStorageList
}
