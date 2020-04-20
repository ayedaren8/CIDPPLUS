// pages/upload/index.js
import WeCropper from '../../cropper/we-cropper.js'
const device = wx.getSystemInfoSync() // 获取设备信息
const width = device.windowWidth // 示例为一个与屏幕等宽的正方形裁剪框
const height = device.windowHeight
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cropperOpt: {
      id: 'cropper', // 用于手势操作的canvas组件标识符
      targetId: 'targetCropper', // 用于用于生成截图的canvas组件标识符
      pixelRatio: device.pixelRatio, // 传入设备像素比
      width, // 画布宽度
      height, // 画布高度
      scale: 2.5, // 最大缩放倍数
      zoom: 8, // 缩放系数
      cut: {
        x: (width - 300) / 2, // 裁剪框x轴起点
        y: (width - 300) / 2, // 裁剪框y轴期起点
        width: 300, // 裁剪框宽度
        height: 300 // 裁剪框高度
      }
    },
    uploaded:false,
    img:{bg:'',obj:''}
  },
  touchStart(e) {
    this.cropper.touchStart(e)
  },
  touchMove(e) {
    this.cropper.touchMove(e)
  },
  touchEnd(e) {
    this.cropper.touchEnd(e)
  },
  uploadTap:function() {
    const self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const src = res.tempFilePaths[0]
        self.cropper.pushOrign(src)
        self.setData({uploaded:true})
      },
      fail: (err) => {
        wx.showToast({
          title: err,
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
        });
          
      },
      complete: () => {}
    });
      

  },
  getCropperImage:function () {
    if (!this.data.uploaded) {
      return
    } 
    var that=this
    this.wecropper.getCropperImage((tempFilePath) => {
      // tempFilePath 为裁剪后的图片临时路径
      if (tempFilePath) {
        that.setData({'img.obj':tempFilePath})
        var model = JSON.stringify(that.data.img);
        wx.redirectTo({
          url: '/pages/makepic/index?model='+model ,
          success: (result) => {
            
          },
          fail: () => {},
          complete: () => {}
        });
          
    
          
      } else {
        console.log('获取图片地址失败，请稍后重试')
      }
    })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.src);
    this.setData({'img.bg':options.src})
    const {
      cropperOpt
    } = this.data
    this.cropper = new WeCropper(cropperOpt)
      .on('ready', (ctx) => {
        console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {
        wx.hideToast()
      })
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