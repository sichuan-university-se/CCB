// pages/auth/auth.js
const request = require('../../../utils/request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentImage: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  ChooseImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success: res => {
        console.log(res)
        this.setData({
          currentImage: res.tempFilePaths
        })
      }
    })
  },
  ViewImage() {
    wx.previewImage({
      urls: this.data.currentImage
    })
  },
  DelImage() {
    wx.showModal({
      title: '图片',
      content: '确认删除吗？',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          this.setData({
            currentImage: []
          })
        }
      }
    })
  },
  handleAuth() {
    if (this.data.currentImage.length !== 0) {
      request.uploadImg(this.data.currentImage[0]).then(res => {
        console.log(JSON.parse(res.data))
        const img_url = JSON.parse(res.data).url
        request.postData('/uploadAuthInfo', { img_url: img_url }).then(res => {
          console.log(res)
        })
      }).then(() => {
        wx.showToast({
          title: '上传成功',
          duration: 1000
        })
        wx.switchTab({
          url: '../../self/self'
        })
      })
    }
  }
})