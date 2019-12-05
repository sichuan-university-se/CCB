// pages/chat/chat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    InputBottom: 0,
    msgList: [
      {
        speaker: 'self',
        content: '成熟的基本V点击编辑',
        time: '13:23',
        image: ''
      },
      {
        speaker: 'peer',
        content: '大哦家里我的',
        time: '14:57',
        image: ''
      },
      {
        sperker: 'self',
        content: '',
        time: '18:00',
        image: '/assets/image/gakki0.jpg'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    console.log(currentPage.options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height
    })
  },
  InputBlur(e) {
    this.setData({
      InputBottom: 0
    })
  },
  sendMsg(e) {
    // 发送聊天内容
    console.log(e)
  }
})