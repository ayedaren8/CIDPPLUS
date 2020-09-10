// pages/indexs/index.js

import Dialog from '../../dist/dialog/dialog';
import schoolCaledar from '../../store/schoolCalendar';
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        // floatBannerShow:true,
        welcome: "别来无恙",
        PX: "",
        LOGIN_FLAG: '',
        USERNAME: "",
        studentID: "",
        NowWeek: "",
        thisYear: "",
        thisMonth: "",
        today: "",
        currentMonth: "",
        currentYear: "",
        currentday: "",
        percent: 95,
        weekList: ['一', '二', '三', '四', '五', '六', '日'],
        weekList2: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        weekList2: {
            Q: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            J: ['日', '一', '二', '三', '四', '五', '六'],
            E: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
        },
        dayArr: "",
        weekArr: "",
        dayList: '',
        monthInfo: schoolCaledar
    },

    /**
     * 生命周期函数--监听页面加载
     */


    // 一年中每个月的天数
    yearMonthDays: function(year) {
        let monthArr = []
        let d = new Date()
        year = year ? year : d.getFullYear()
        for (let i = 1; i < 13; i++) {
            let d = new Date(year, i, 0)
            monthArr.push(d.getDate())
        }
        return monthArr
    },


    //每个月的第一天星期几
    headDayWeek: function(year) {
        let headDayList = []
        let d = new Date()
        year = year ? year : d.getFullYear()
        for (let i = 0; i < 12; i++) {
            d = new Date(year, i, 1)
            headDayList.push(d.getDay())
        }
        return headDayList
    },

    // 一年中每一天
    dayToArr: function(year) {
        let d = new Date()
        let years = year ? year : d.getFullYear()
        let dayArr = []
        let monthArr = this.yearMonthDays(years)
        let headDayList = this.headDayWeek(years)
        for (let i = 0; i < 12; i++) {
            let element = monthArr[i]
            let w = headDayList[i]
            let n = w - 1
            for (let j = 1; j <= element; j++) {
                w = (j + n) % 7
                let obj = {
                    week: w,
                    day: j,
                    month: i + 1,
                    year: years
                }
                dayArr.push(obj)
            }
        }
        return dayArr
    },

    // 给每一天打上周标记
    dayToWeek: function(year) {
        let dayArr = this.dayToArr(year)
        let weekIndex = 1
        dayArr.forEach(element => {
            element["weekIndex"] = weekIndex
            if (element.week === 0) {
                weekIndex += 1
            }
        });
        return dayArr
    },

    // 渲染一个月的数据
    monthToArr: function(year, month) {
        let d = new Date()
        year = year ? year : d.getFullYear()
        month = month ? month : d.getMonth() + 1
        let dayArr = this.dayToWeek(year)
        let monthList = []
        dayArr.forEach(element => {
            element.month === month ? monthList.push(element) : ""
        });
        return monthList
    },

    // 把一年的数据按周分组
    weekToArr: function(year) {
        let weekArr = []
        let currentYear = year ? year : this.data.currentYear
        let currentMonth = this.data.currentMonth
        let dayArr = this.dayToWeek(currentYear)
        let maxWeek = dayArr[dayArr.length - 1].weekIndex
        for (let i = 0; i < maxWeek; i++) {
            weekArr[i] = []
            dayArr.forEach(element => {
                if (element.weekIndex === i + 1) {
                    weekArr[i].push(element)
                }
            });
        }
        while (weekArr[0].length < 7) {
            for (let j = 0; j < 7 - weekArr[0].length; j++) {
                weekArr[0].unshift("")
            }
        }
        this.setData({ weekArr: weekArr })
        return weekArr
    },

    // 把一个月的数据按周分组
    showMonth: function() {
        let year = this.data.currentYear
        let month = this.data.currentMonth
        let weekArr = this.weekToArr()
        let monthList = this.monthToArr(year, month)
        let startWeek = monthList[0]["weekIndex"]
        let endWeek = monthList[monthList.length - 1]["weekIndex"]
        let dayList = weekArr.slice(startWeek - 1, endWeek)
        return dayList
    },

    // 渲染后一个月的数据
    nextMonth: function() {
        let currentYear = this.data.currentYear
        let currentMonth = this.data.currentMonth
        if (currentMonth === 12) {
            this.setData({ currentMonth: 1, currentYear: currentYear + 1 })
            let dayList = this.showMonth(currentYear, currentMonth)
            this.setData({ dayList: dayList })

        } else {
            this.setData({ currentMonth: currentMonth + 1 })
            let dayList = this.showMonth(currentYear, currentMonth)
            this.setData({ dayList: dayList })
        }

    },

    // 渲染前一个月的数据
    preMonth: function() {
        let currentYear = this.data.currentYear
        let currentMonth = this.data.currentMonth
        if (currentMonth === 1) {
            this.setData({ currentMonth: 12, currentYear: currentYear - 1 })
            let dayList = this.showMonth()
            this.weekToArr(currentYear)
            this.setData({ dayList: dayList })

        } else {
            this.setData({ currentMonth: currentMonth - 1 })
            let dayList = this.showMonth()
            this.setData({ dayList: dayList })
        }
    },
    nowMonth: function() {
        let dayArr = this.showMonth()
        this.setData({ dayList: dayArr })
    },

    // 计算学期周和年周之差
    semesterWeek: function() {
        let month = app.globalData.TermStartMonth
        let day = app.globalData.TermStartDay
        let Arr = this.dayToWeek()
        let week
        let DIF
        Arr.forEach(element => {
            element.month == month && element.day == day ? week = element.weekIndex : '';
        });
        DIF = week - 1
        app.globalData.WeekDIF = DIF
    },

    dayInWeeK: function() {
        let Arr = this.dayToWeek()
        let week
        Arr.forEach(element => {
            element.year == this.data.thisYear && element.month == this.data.thisMonth && element.day == this.data.today ? week = element.weekIndex : '';
        })
        app.globalData.NowWeek = week
        let termWeek = week - app.globalData.WeekDIF
        app.globalData.termWeek = termWeek < 21 && termWeek > 0 ? termWeek : week;
        this.setData({ termWeek: app.globalData.termWeek })
        if(Math.round((app.globalData.termWeek / app.globalData.overWeek) * 100) > 100){this.setData({percent: 100})}
        else {this.setData({percent: Math.round((app.globalData.termWeek / app.globalData.overWeek) * 100) })}
    },


    Start: function() {
        let d = new Date()
        this.setData({ thisMonth: d.getMonth() + 1, thisYear: d.getFullYear(), today: d.getDate() })
        this.setData({ currentMonth: d.getMonth() + 1, currentYear: d.getFullYear(), currentday: d.getDate() })
        this.weekToArr()
        this.nowMonth()
        this.semesterWeek()
        this.dayInWeeK()
    },
    login: function() {
        wx.navigateTo({
            url: '/pages/login/login',
            success: (result) => {
            },
            fail: () => {},
            complete: () => {}
        });
    },
    loginOut: function() {
        Dialog.confirm({
            title: '注销',
            message: '是否注销？'
        }).then(() => {
            app.globalData.LOGIN_FLAG = false
            this.setData({ LOGIN_FLAG: app.globalData.LOGIN_FLAG, })
            wx.removeStorage({
                key: 'grade',
                success: (result) => {
                    console.log("成功删除成绩缓存")
                },
                fail: () => {},
                complete: () => {}
            });
            wx.removeStorage({
                key: 'course',
                success: (result) => {
                    console.log("成功删除课表缓存")
                },
                fail: () => {},
                complete: () => {}
            });
            wx.removeStorage({
                key: 'exam',
                success: (result) => {
                    console.log("成功删除课表缓存")
                },
                fail: () => {},
                complete: () => {}
            });
            app.globalData.needRelanch=true
        }).catch(() => {
            // on cancel
        });
    },

    gotoMakepic:function(){
        wx.navigateTo({url: '/pages/product/index'});
    },
    delFloatImg:function(){
        this.setData({floatBannerShow:false})
    },
    onLoad: function(options) {
        this.Start()
        this.setData({ NowWeek: app.globalData.NowWeek })
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 2
            })
        }
        let res = wx.getStorageSync("infoList");
        console.log(res);
        this.setData({
            LOGIN_FLAG: app.globalData.LOGIN_FLAG,
            USERNAME: res.name,
            studentID: res.srNum
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
        this.Start()
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        this.gotoMakepic()
        wx.stopPullDownRefresh()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
    }
})