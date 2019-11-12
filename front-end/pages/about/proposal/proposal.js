// pages/about/proposal/proposal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textareaValue: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  // 获取用户输入内容
  textareaInput(e) {
    this.setData({
      textareaValue: e.detail.value
    })
  },

  // 清空用户输入内容
  clearProposal() {
    this.setData({
      textareaValue: ''
    })
  },

  // 用户提交建议
  submitProposal(e) {
    // 将用户填写内容收集，后续可加入验证步骤，上传至服务器
    console.log(this.data.textareaValue);
    
    if (this.data.textareaValue !== '') {
      this.setData({
        textareaValue: ''
      })
      wx.showToast({
        title: '提交成功，感谢',
        duration: 2000
      })
    } else {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
    }
  }
})