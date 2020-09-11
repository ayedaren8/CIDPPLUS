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
              
              if (result.statusCode != 200) {
                  
              } else {
                  
                  wx.setStorage({
                      key: api,
                      data: result.data['message']
                  });
              }
          },
          fail: () => {},
          complete: () => { 
      });

  }


  module.exports = {
      login: login
  }