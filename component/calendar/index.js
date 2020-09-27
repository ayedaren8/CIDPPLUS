// component/calendar.js
const {RectMonthData}= require('../calendar/calendar');
const db=wx.cloud.database()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    monthInfo:Array
  },
  /**
   * 组件的初始数据
   */
  data: {
    weekList: ['日','一', '二', '三', '四', '五', '六' ],
    dayList: '',
    currentYear: new Date().getFullYear(),
    currentday:new Date().getDate(),
    currentMonth:new Date().getMonth() + 1,
    centerText:'',
    thisMonth: new Date().getMonth() + 1,
    thisYear: new Date().getFullYear(),
    today:new Date().getDate(),
    monthInfo:''
  },
  pageLifetimes: {
    show: function() {
      // 页面被展示
      this.start()
    }
  },
  /**
   * 组件的方法列表
   */
  attached: function() {
    // 在组件实例进入页面节点树时执行
    db.collection('schoolCalendar').get().then((res)=>{
        this.setData({monthInfo:res.data})
    })
    this.start()
  },
  methods: {
    start: function(){
        let d=new Date()
        this.setData({ currentMonth: d.getMonth() + 1, currentYear: d.getFullYear() })
        let dayList=RectMonthData(this.data.thisYear,this.data.thisMonth)
        let centerText=this.data.currentYear+'年'+this.data.currentMonth+'月'
        this.setData({dayList,centerText})
    },
    handleLeftClick:function(){
        let currentYear = this.data.currentYear
        let currentMonth = this.data.currentMonth
        if (currentMonth === 1) {
            this.setData({ currentMonth: 12, currentYear: currentYear -1 })
            let dayList = RectMonthData(this.data.currentYear,this.data.currentMonth)
            let centerText=this.data.currentYear+'年'+this.data.currentMonth+'月'
            this.setData({ dayList,centerText })

        } else {
            this.setData({ currentMonth: currentMonth -1 })
            let dayList = RectMonthData(this.data.currentYear,this.data.currentMonth)
            let centerText=this.data.currentYear+'年'+this.data.currentMonth+'月'
            this.setData({ dayList,centerText })
        }
    },
    handleRightClick:function(){
        let currentYear = this.data.currentYear
        let currentMonth = this.data.currentMonth
        if (currentMonth === 12) {
            this.setData({ currentMonth: 1, currentYear: currentYear + 1 })
            let dayList = RectMonthData(this.data.currentYear, this.data.currentMonth)
            let centerText=this.data.currentYear+'年'+this.data.currentMonth+'月'
            this.setData({ dayList,centerText })
        } else {
            this.setData({ currentMonth: currentMonth + 1 })
            let dayList = RectMonthData(this.data.currentYear,this.data.currentMonth)
            let centerText=this.data.currentYear+'年'+this.data.currentMonth+'月'
            this.setData({ dayList,centerText })
        }
    },
    

}
})
