// pages/liked/liked.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    likedList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      likedList: [{
        type: 'req',
        title: '这里是青山，请长按保存',
        price: 2
      },
      {
        type: 'act',
        title: 'ikun聚集'
      },
      {
        type: 'goods',
        title: 'arsenal kit',
        price: 399
      }]
    })
  },


})