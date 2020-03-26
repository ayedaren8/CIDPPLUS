//app.js
App({
    onLaunch: function() {
        var that = this;
        var set = wx.getStorageSync("set");
        if (set) {
            that.globalData.LOGIN_FLAG = set['LOGIN_FLAG']
            that.globalData.notePWD = set['notePWD']
            that.globalData.exitRE = set['exitRE']
        }
        if (this.globalData.exitRE == true) {
            wx.removeStorage({
                key: 'grade',
                success: (result) => {},
                fail: () => {},
                complete: () => {}
            });
            wx.removeStorage({
                key: 'course',
                success: (result) => {},
                fail: () => {},
                complete: () => {}
            });
            wx.removeStorage({
                key: 'exam',
                success: (result) => {},
                fail: () => {},
                complete: () => {}
            });

        }
        wx.getSystemInfo({
            success: function(e) {
                var a = e.model;
                console.log(a)
              if (a.indexOf("iPhone") != -1 && a.indexOf("X") != -1 || a.indexOf("iPhone") != -1 && a.indexOf("11") != -1) { //是不是包含iphoneX
                    that.globalData.isIphoneX = true
                } else {
                    that.globalData.isIphoneX = false
                }
            }
        })
        var RPX = 1 / 750 * wx.getSystemInfoSync().windowWidth;
        that.globalData.RPX = RPX
    },

    globalData: {
        userInfo: "",
        USERNAME: "",
        PROCESS: "",
        isLOGIN: "",
        theme_main_color: "#f8f8f9",
        theme_secondary_color: "#ffffff",
        HD_IMG: "/icon/cat.jpg",
        LOGIN_FLAG: false,
        GRADE_FLAG: false,
        CLASS_FLAG: false,
        EXAM_FLAG: false,
        CALENDER_FLAG: false,
        NETCOST_FLAG: false,
        CARDMONEY_FLAG: false,
        READING_FLAG: false,
        NOTICE_FLAG: false,
        isIphoneX: false,
        DOMAIN: "https://ayedaren.cn/",
        WeekDIF: '',
        TermStartMonth: 3,
        TermStartDay: 2,
        NowWeeK: '',
        termWeek: '',
        RPX: '',
        exitRE: false,
        notePWD: true,
        needrelanch:false
    },


})