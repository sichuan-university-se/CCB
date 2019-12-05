// pages/self/self.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    visitNum: 0,
    likeNum: 0,
    historyNum: 0,
    refundNum: 100
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const visitCount = wx.getStorageSync('visitCount');
    const likeList = wx.getStorageSync('likeList');
    this.setData({
      visitNum: visitCount ? visitCount : 0,
      likeNum: likeList ? likeList.length : 0
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
  }
})