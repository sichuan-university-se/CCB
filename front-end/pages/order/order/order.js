// pages/order/order.js
const request = require('../../../utils/request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    finishList: [],
    finishStatus: 'todo',
    checkFinish: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // this.getOrderList()
  },

  onShow: function () {
    this.getOrderList()
  },

  getOrderList() {
    request.postData('/getOrderList', { type: 'requirement' }).then(res => {
      console.log(res)
      const orderList = res.data.list.filter(item => {
        return !item.finish
      })
      const finishList = res.data.list.filter(item => {
        return item.finish
      })
      this.setData({
        orderList: orderList,
        finishList: finishList
      })
    })
  },

  checkOrderDetail(e) {
    wx.navigateTo({
      url: `../detail/detail?id=${e.currentTarget.dataset.id}&type=${e.currentTarget.dataset.type}`
    })
  },

  switchStatus(e) {
    if (e.currentTarget.dataset.status != this.data.finishStatus) {
      this.setData({
        checkFinish: !this.data.checkFinish,
        finishStatus: e.currentTarget.dataset.status
      })
    }
  }
})