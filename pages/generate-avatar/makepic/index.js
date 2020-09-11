// pages/makepic/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgSrc:"",
    objSrc:'',
    tempImgPath:'',
    showpic:false

  },

  output:function(){
    var self =this
    var cvsCtx = wx.createCanvasContext('mycanvas'); //ttcanvas为该canvas的ID
    cvsCtx.drawImage(self.data.objSrc, 20, 20,740, 740);
    cvsCtx.drawImage(self.data.bgSrc, 0, 0, 800, 800);
    cvsCtx.draw(true,()=>{
      var that=this
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 800,
        height: 800,
        destWidth: 800,
        destHeight:800,
        canvasId:'mycanvas' ,
        success: (result) => {
          that.setData({tempImgPath:result.tempFilePath,showpic:true})
        },
        fail: () => {},
        complete: () => {}
      }, this);
    })
  },
  save:function(){
    
    var that =this
    // 
    
    wx.saveImageToPhotosAlbum({
      filePath: that.data.tempImgPath,
      success: (result) => {
        
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (err) => {
        
        if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
          // 
          // 
          wx.openSetting({
            success(settingdata) {
              
              if (settingdata.authSetting['scope.writePhotosAlbum']) {
                // 
                wx.showToast({
                  title: '请再次保存',
                  icon: 'success',
                  duration: 2000
                })
              } else {
                // 
                wx.showToast({
                  title: '获取权限失败，可能导致保存图片无法正常使用',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
          }
      },
      complete: () => {}
    });
      
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var model=JSON.parse(options.model)
    this.setData({bgSrc:model.bg,objSrc:model.obj})
    this.output()
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
})