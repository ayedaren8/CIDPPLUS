const app = getApp();
Component({
    data: {
        selected: 2,
        list: [{
                pagePath: "/pages/exam/index",
                iconPath: "/icon/exam.png",
                selectedIconPath: "/icon/exam_HL.png",
                text: "考试",
            }, {
                pagePath: "/pages/course/course",
                iconPath: "/icon/course.png",
                selectedIconPath: "/icon/course_HL.png",
                text: "课表",
            }, {
                pagePath: "/pages/index/index",
                iconPath: "/icon/home.png",
                selectedIconPath: "/icon/home_HL.png",
                text: "首页",
            }, {
                pagePath: "/pages/grade/grade",
                iconPath: "/icon/grade.png",
                selectedIconPath: "/icon/grade_HL.png",
                text: "成绩",
            }, {
                pagePath: "/pages/set/index",
                iconPath: "/icon/set.png",
                selectedIconPath: "/icon/set_HL.png",
                text: "设置",
            },

        ],
        //适配IphoneX的屏幕底部横线
        isIphoneX: app.globalData.isIphoneX
    },
    attached() {},
    methods: {
        switchTab(e) {
            const dataset = e.currentTarget.dataset
            const path = dataset.path
            const index = dataset.index
            wx.switchTab({ url: path })
        }
    }
})