//app.js
App({
    onLaunch: function() {
        var that = this;
        var set = wx.getStorageSync("set");//读取配置文件
        if (set) {
            that.globalData.LOGIN_FLAG = set['LOGIN_FLAG']
            that.globalData.notePWD = set['notePWD']
            that.globalData.exitRE = set['exitRE']
        }
        if (this.globalData.exitRE == true) {
            wx.removeStorage({key: 'grade'});
            wx.removeStorage({key: 'course'});
            wx.removeStorage({key: 'exam'});
        }
        wx.getSystemInfo({
            success: function(e) {
                var a = e.model;
                // 
              if (a.indexOf("iPhone") != -1 && a.indexOf("X") != -1 || a.indexOf("iPhone") != -1 && a.indexOf("11") != -1) { //是不是包含iphoneX
                    that.globalData.isIphoneX = true
                } else {
                    that.globalData.isIphoneX = false
                }
            }
        })
    },
    globalData: {
        USERNAME: "",
        PROCESS: "",
        LOGIN_FLAG: false,
        isIphoneX: false,
        DOMAIN: "https://ayedaren.cn/",
        WeekDIF: '',
        TermStartMonth: 9,
        TermStartDay: 17,
        NowWeeK: '',
        termWeek: '',
        overWeek: '16',
        exitRE: false,
        notePWD: true,
        needrelanch:false
    },


})