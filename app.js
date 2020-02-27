//app.js
App({
    onLaunch: function() {
        var that = this;
        wx.getSystemInfo({
            success: function(e) {
                var a = e.model;
                if (a.indexOf("iPhone") != -1 && a.indexOf("X") != -1) { //是不是包含iphoneX
                    that.globalData.isIphoneX = true
                } else {
                    that.globalData.isIphoneX = false
                }
            }
        })

    },
    globalData: {
        userInfo: "",
        USERNAME: "",
        PROCESS: "",
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
        DOMAIN: "https://ayedaren.cn/"
    },


})