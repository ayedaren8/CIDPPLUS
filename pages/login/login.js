// pages/login/login.js
const app = getApp()
const grep = require("../../utils/backGrep.js");
import Notify from '../../dist/notify/notify';
import Toast from '../../dist/toast/toast';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    studentID: "",
    studentPassword: "",
    btn_load: false,
    loadText: "登录",
    loading: false,
    value: '',
    btnText: "登录",
    studentID: "",
    studentPassword: ""
  },
  onChangeUser: function (event) {
    this.setData({
      studentID: event.detail.value
    })
  },
  onChangePwd: function (event) {
    this.setData({
      studentPassword: event.detail.value
    })
  },
  // 表单验证函数
  loginBefore: function () {
    if (this.data.studentID.length < 7) {
      Notify({
        type: 'warning',
        message: '请检查用户名'
      });
    } else if (this.data.studentID.length == 0) {
      Notify({
        type: 'warning',
        message: '用户名不能为空'
      });
    } else if (this.data.studentPassword.length == 0) {
      Notify({
        type: 'warning',
        message: '密码不能为空'
      });

    } else {
      this.login(this.data.studentID, this.data.studentPassword, "info")
    }
  },
  // 登录请求函数
  login: function (studentID, studentPassword) {
    // 加载Toast提示
    Toast.loading({
      mask: true,
      message: '正在执行教务爬虫，请耐心等候...',
      duration: 30000
    });
    // 发起请求
    wx.request({
      url: `http://ayedaren.cn:3000/api/info`,
      data: {
        username: studentID,
        password: studentPassword,
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: (result) => {
        console.log(result);
        if (result.statusCode != 200) {
          Toast.fail("服务器无法处理你的请求，请联系开发人员")
          Notify({
            type: 'warning',
            message: "错误" + result.statusCode,
            onClose: () => {
              wx.switchTab({
                url: '/pages/index/index',
              })
            }
          })
          return
        } else {
          var res = result.data
          if (res["data"]) {
            Toast.clear()
            Toast.success({
              message: "请求成功",
              onClose: () => {
                wx.switchTab({
                  url: '/pages/index/index',
                })
              }
            })
            var accountInfo = {
              studentID: studentID,
              studentPassword: studentPassword
            }
            wx.setStorageSync("accountInfo", accountInfo)
            app.globalData.loginStatus = true
            var res = result.data["data"]
            wx.setStorage({
              key: "studentInfo",
              data: result.data["data"]
            });
            wx.setStorage({
              key: "settings",
              data: {
                loginStatus: app.globalData.loginStatus,
                keepPassword: app.globalData.keepPassword,
                onExitClearCache: app.globalData.onExitClearCache
              }
            });
          } else {
            switch (result.data["code"]) {
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
          }
        }
      },
      fail: () => {
        Notify({
          type: 'danger',
          message: "网络通讯故障"
        })
        Toast.clear()
      },
    });
  },


  policy: function () {
    wx.navigateTo({
      url: '/pages/page/page?title=隐私政策'
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.removeStorage({
      key: 'grade',
      success: (result) => {},
      fail: () => {},
      complete: () => {}
    });
    wx.removeStorage({
      key: 'course',
      success: (result) => {

      },
      fail: () => {},
      complete: () => {}
    });
    wx.removeStorage({
      key: 'exam',
      success: (result) => {

      },
      fail: () => {},
      complete: () => {}
    });
    if (app.globalData.keepPassword == true) {
      var accountInfo = wx.getStorageSync("accountInfo");
      if (accountInfo) {
        this.setData({
          studentID: accountInfo.studentID,
          studentPassword: accountInfo.studentPassword
        })
      }
    } else {
      this.setData({
        studentID: "",
        studentPassword: ""
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(getCurrentPages());
    if (app.globalData.keepPassword == true) {
      var accountInfo = wx.getStorageSync("accountInfo");
      if (accountInfo) {
        this.setData({
          studentID: accountInfo.studentID,
          studentPassword: accountInfo.studentPassword
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    grep.login(this.data.studentID, this.data.studentPassword, "grade")
    grep.login(this.data.studentID, this.data.studentPassword, "course")
    grep.login(this.data.studentID, this.data.studentPassword, "exam")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})