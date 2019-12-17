// pages/test/test.js
const request = require('../../../utils/request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request.getData('/getNews').then(res => {
      console.log(res)
      this.setData({
        newsList: res.data.data
      })
    })
  },

  showSchoolBus(e) {
    wx.previewImage({
      urls: ['http://hgc.scu.edu.cn/__local/6/7D/E1/416BB4FFD093BDA60BC4B6DE803_5DE90F55_B7A9.png'],
      current: 'http://hgc.scu.edu.cn/__local/6/7D/E1/416BB4FFD093BDA60BC4B6DE803_5DE90F55_B7A9.png'
    })
  },

  checkDetail(e) {
    wx.navigateTo({
      url: `../testnews/testnews?index=${e.currentTarget.dataset.index}`
    })
  }
})