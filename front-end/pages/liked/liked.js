// pages/liked/liked.js
const request = require('../../utils/request.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    likedList: [],
    totalList: [],
    showOption: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    request.getData('/getfavorite').then(res => {
      console.log(res)
      this.setData({
        totalList: res.data.data
      })
    })
  },


  showOption(e) {
    // 设置showOption判断用户是否进行分类查看，若是则进行filter展示，重复点击时将showOption置为false
    if (this.data.showOption && this.data.showOption === e.currentTarget.dataset.option) {
      this.setData({
        showOption: false
      })
    } else {
      console.log(e.currentTarget.dataset.option)
      const currentOption = e.currentTarget.dataset.option;
      const currentList = this.data.totalList.filter(curr => {
        return curr.type == currentOption
      })
      this.setData({
        showOption: currentOption,
        likedList: currentList
      })
    }
  },

  // 查看需求以及活动详情
  checkDetail: function (e) {
    app.setVisitCount(e)
    wx.navigateTo({
      url: `../detail/detail?type=${e.currentTarget.dataset.type}&id=${e.currentTarget.dataset.id}`,
    })
  },
})