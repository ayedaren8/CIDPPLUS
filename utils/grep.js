  // 登录请求函数
  import Notify from '../dist/notify/notify';
  import Toast from '../dist/toast/toast';
  import Dialog from '../dist/dialog/dialog';

  function login(stid, stpwd, api) {
      // 加载Toast提示
      Toast.loading({
          mask: true,
          message: '加载中，请耐心等候...',
          duration: 0
      });
      // 发起请求
      let result = wx.request({
          url: 'http://127.0.0.1:8000/api/',
          data: {
              "username": stid,
              "password": stpwd,
              "apiname": api
          },
          header: {
              'content-type': 'application/json'
          },
          method: 'POST',
          dataType: 'json',
          responseType: 'text',
          // 成功回调
          success: (result) => {
              // 500为服务器错误 588为自定义错误码 表示用户名或密码出现错误 589表示请求出现了验证码
              console.log(result.statusCode)
              if (result.statusCode != 200) {
                  if (result.statusCode == 588) {
                      Toast.clear()
                      Toast.fail("学号或者办事大厅密码不正确！")
                  } else if (result.statusCode == 589) {
                      Toast.clear()
                      Toast.fail({
                          mask: true,
                          message: '小程序暂时无法处理验证码，请手动在网页端重新登录后使用！',
                          duration: 5000
                      });
                      wx.reLaunch({
                          url: '../index/index',
                      });

                  } else {
                      Toast.clear()
                      Toast.fail("服务器无法处理你的请求，请联系开发人员")
                      wx.reLaunch({
                          url: '../index/index',
                      });
                  }
                  Notify({
                      type: 'warning',
                      message: "错误" + result.statusCode,
                  })
                  wx.reLaunch({
                      url: '../index/index',
                  });
                  return false
              } else {
                  Toast.clear()
                      //   Toast.success("请求成功")
                  var res = result.data
                  console.log(res)
                  wx.setStorage({
                      key: api,
                      data: result.data
                  });
                  if (this.infoReady) {
                      this.infoReady(api)
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
          complete: () => {}
      });

  }

  module.exports = {
      login: login
  }