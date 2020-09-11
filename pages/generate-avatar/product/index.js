// pages/product/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    headList:[
      {
        imgSrc:"/img/headlist/pic1.png",
        text:"基础款"
      },  
      {
        imgSrc:"/img/headlist/pic2.png",
        text:"防灾生日快乐"
      }, 
      {
        imgSrc:"/img/headlist/pic3.png",
        text:"I love CIDP"
      }, 
      {
        imgSrc:"/img/headlist/pic4.png",
        text:"大爱无疆"
      }, 
      {
        imgSrc:"/img/headlist/pic5.png",
        text:"崇德博智"
      }, 
      {
        imgSrc:"/img/headlist/pic6.png",
        text:"扶危定倾"
      }, 
      {
        imgSrc:"/img/headlist/pic7.png",
        text:"校徽款"
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  
   toMake:function(options){
     
     let chooseImgSrc=options.currentTarget.dataset.src
    wx.navigateTo({
      url: '/pages/upload/index?src='+chooseImgSrc
    });
  },
  onLoad: function (options) {
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
}
)