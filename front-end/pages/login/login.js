const app = getApp()
const request = require('../../utils/request.js')

// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
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

    app.ccblogin().then(res => {
      console.log(res)
      const userInfo = app.globalData.userInfo
      if (!res && userInfo) {
        request.postData('/signup', { user: JSON.stringify(userInfo) }).then(res => {
          wx.setStorageSync('exists', 1)
          request.getData('/walletInfo').then(res => {
            console.log(res)
          })
        })
      }
    })
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    const userInfo = e.detail.userInfo
    const code = wx.getStorageSync('code')

    // 获取授权后进行注册以及激活钱包的请求
    wx.request({
      url: `https://www.chiyumao.com/wx/login?code=${code}`,
      success: res => {
        if (!res.data.exists) {
          request.postData('/signup', { user: JSON.stringify(userInfo) }).then(res => {
            wx.setStorageSync('exists', 1)
            request.getData('/walletInfo').then(res => {
              console.log(res)
            })
          })
        }
      }
    })
  },

  switchToTab(e) {
    const code = wx.getStorageSync('code')
    wx.request({
      url: `https://www.chiyumao.com/wx/login?code=${code}`,
      success: res => {
        if (res.data.cheat) {
          wx.navigateTo({
            url: '../cheat/test/test'
          })
        } else {
          wx.switchTab({
            url: '../index/index'
          })
        }
      }
    })
  }
})