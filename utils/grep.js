  // 登录请求函数
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
    wx.reLaunch({
      url: '../index/index',
    });
  }

  function login(studentID, studentPassword, path) {
    let api = path
    // 加载Toast提示
    Toast.loading({
      mask: true,
      message: '加载中，请耐心等候...',
      duration: 0
    });
    // 发起请求
    let result = wx.request({
      url: `http://ayedaren.cn:3000/api/${path}`,
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
          return false
        } else {
          var res = result.data
          if (res["data"]) {
            Toast.clear()
            wx.setStorage({
              key: api,
              data: res["data"]
            });
            let _name = api + "Ready"
            if (this[_name]) {
              this[_name](api)
            } else {
              resErrorHandler(res)
            }
          }
        }
      },
      fail: () => {
        Toast.clear()
        Notify({
          type: 'danger',
          message: "网络通讯故障"
        })
        wx.reLaunch({
          url: '../index/index',
        });

      },
    });

  }


  module.exports = {
    login: login
  }