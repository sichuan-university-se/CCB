const request = require('../../utils/request.js')

// pages/release/release.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: {
      req: '发布需求',
      act: '组队求友',
      goods: '闲置出手'
    },
    picker: ['望江', '江安', '跨校区'],
    index: null,
    imgList: [],
    params: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    console.log(currentPage.options);
    this.setData({
      type: currentPage.options.type,
      params: {
        type: currentPage.options.type
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        console.log(res)
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '图片',
      content: '确定删除吗？',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  titleInput(e) {
    this.setData({
      params: { ...this.data.params,
        title: e.detail.value
      }
    })
  },
  textareaInput(e) {
    this.setData({
      params: { ...this.data.params,
        detail: e.detail.value
      }
    })
  },
  priceInput(e) {
    this.setData({
      params: { ...this.data.params,
        price: e.detail.value
      }
    })
  },
  changeCampus(e) {
    this.setData({
      index: e.detail.value,
      params: { ...this.data.params,
        campus: e.detail.value
      }
    })
  },
  handleFormSubmit(e) {
    // 收集表单数据，并进行提交
    const params = this.data.params;
    console.log(this.data)
    request.postData('/releaseItem', params).then(res => {
      console.log(res)
      wx.showToast({
        title: '发布成功',
        duration: 1000
      })
      wx.switchTab({
        url: '../index/index'
      })
    })
  }
})