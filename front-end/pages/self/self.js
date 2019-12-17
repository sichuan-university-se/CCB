// pages/self/self.js
const app = getApp()
const request = require('../../utils/request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    visitNum: 0,
    likeNum: 0,
    releaseNum: 0,
    orderNum: 0,
    acceptNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    request.getData('/getSelfInfo').then(res => {
      console.log(res)
      this.setData({
        userInfo: res.data.value
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const visitCount = wx.getStorageSync('visitCount');
    const likeList = wx.getStorageSync('likeList');
    const releaseNum = wx.getStorageSync('rlsNum');
    this.setData({
      visitNum: visitCount ? visitCount : 0,
      likeNum: likeList ? likeList.length : 0,
      releaseNum: releaseNum ? releaseNum : 0
    })
    request.getData('/getSelfInfo').then(res => {
      this.setData({
        userInfo: res.data.value
      })
    })
  },

  checkLikedList(e) {
    wx.navigateTo({
      url: '../liked/liked'
    })
  },

  CopyLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.link,
      success: res => {
        wx.showToast({
          title: '已复制',
          duration: 1000,
        })
      }
    })
  },

  showQrcode() {
    wx.previewImage({
      urls: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573192480035&di=efcd66c748340bbfcdc7cd12be5380a3&imgtype=0&src=http%3A%2F%2Fpic2.orsoon.com%2F2017%2F0721%2F20170721021629929.png'],
      current: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573192480035&di=efcd66c748340bbfcdc7cd12be5380a3&imgtype=0&src=http%3A%2F%2Fpic2.orsoon.com%2F2017%2F0721%2F20170721021629929.png'
    })
  },
})