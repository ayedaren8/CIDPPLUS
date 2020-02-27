  // 登录请求函数
  import Notify from '../dist/notify/notify';
  import Toast from '../dist/toast/toast';
  import Dialog from '../dist/dialog/dialog';
  const app = getApp();

  function login(stid, stpwd, api) {
      // 加载Toast提示
      Toast.loading({
          mask: true,
          message: '加载中，请耐心等候...',
          duration: 0
      });
      // 发起请求
      let result = wx.request({
          url: app.globalData.DOMAIN + "api",
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
              var res = result.data
              console.log(res)
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
                  console.log(res)
                  if (res["STATUS"] == "OK") {
                      Toast.clear()
                      wx.setStorage({
                          key: api,
                          data: result.data["message"]
                      });
                      let _name = api + "Ready"
                      console.log(_name);
                      if (this[_name]) {
                          this[_name](api)
                      } else {
                          switch (res["STATUS"]) {
                              case pwdError:
                                  Toast.clear()
                                  Toast.fail("学号或者办事大厅密码不正确！")
                                  break;
                              case capError:
                                  Toast.clear()
                                  Toast.fail({
                                      mask: true,
                                      message: '小程序暂时无法处理验证码，请手动在网页端重新登录后使用！',
                                      duration: 5000
                                  });
                                  break;
                          }
                          wx.reLaunch({
                              url: '../index/index',
                          });
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
          complete: () => {}
      });

  }

  function getPhoto(stid, stpwd) {
      let request = wx.request({
          url: 'http://127.0.0.1:8000/getPhoto/',
          method: 'POST',
          data: {
              "username": stid,
              "password": stpwd,
          },
          header: {
              'content-type': 'application/json'
          },
          dataType: 'json',
          responseType: 'image/jpeg',
          success: (result) => {
              wx.setStorage({
                  key: stid + "HD",
                  data: result
              })
              app.globalData.HD_IMG = result
              if (this.photoReady) {
                  this.photoReady(result)
              }
          },
          fail: () => {},
          complete: () => {}
      });
  }

  module.exports = {
      login: login,
      getPhoto: getPhoto
  }