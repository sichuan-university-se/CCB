// pages/testnews/testnews.js
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
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    console.log(currentPage.options);
    this.setData({
      index: currentPage.options.index
    })
    request.getData('/getNews').then(res => {
      console.log(res)
      this.setData({
        newsList: res.data.data,
        currNews: res.data.data[this.data.index]
      })
    })
  },

  ViewImage(e) {
    wx.previewImage({
      urls: this.data.currNews.pics,
      current: e.currentTarget.dataset.url
    });
  }
})