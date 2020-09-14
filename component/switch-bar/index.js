// component/switch-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    centerText:String
  },
  /**
   * 组件的初始数据
   */
  data: {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    leftClick(){
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('leftClick', myEventDetail, myEventOption)
    },
    rightClick(){
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('rightClick', myEventDetail, myEventOption)
    }
  }
})
