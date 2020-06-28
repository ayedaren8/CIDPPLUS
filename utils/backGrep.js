  const app = getApp();
  function login(stid, stpwd, api) {
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
          success: (result) => {
              console.log(result.statusCode)
              if (result.statusCode != 200) {
                  console.log("后台执行" + api + "失败");
              } else {
                  console.log("后台执行" + api + "成功");
                  wx.setStorage({
                      key: api,
                      data: result.data['message']
                  });
              }
          },
          fail: () => {},
          complete: () => { console.log("后台执行" + api + "!"); }
      });

  }


  module.exports = {
      login: login
  }