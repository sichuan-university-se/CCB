// pages/refund/refund.js
const request = require('../../utils/request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.getSystemInfo({
      success: res => {
        console.log(res)
        this.setData({
          clientHeight: res.windowHeight
        })
      },
    })
    request.getData('/walletInfo').then(res => {
      console.log(res)
      this.setData({
        balance: res.data.balance
      })
    })
  },

  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },

  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  getRechargeNum(e) {
    console.log(e.detail.value)
    this.setData({
      count: e.detail.value
    })
  },

  rechargeMoney(e) {
    const count = Number(this.data.count)
    request.postData('/fake/recharge', { count: count.toFixed(2) }).then(res => {
      console.log(res)
      this.setData({
        modalName: null
      })
      wx.showToast({
        title: '充值成功',
        duration: 1000
      })
      return request.getData('/walletInfo')
    }).then(res => {
      console.log(res)
      this.setData({
        balance: res.data.balance
      })
    }).catch(err => {
      console.log(err)
    })
  }

})