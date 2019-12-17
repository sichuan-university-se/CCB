// pages/order/detail/detail.js
const request = require('../../../utils/request.js')
const formatTime = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    console.log(currentPage.options);
    this.setData({
      id: currentPage.options.id,
      type: currentPage.options.type
    })
    request.postData('/getOrderdetail', {
      id: currentPage.options.id,
      type: currentPage.options.type
    }).then(res => {
      console.log(res)
      if (res.statusCode === 200) {
        const reg = /\[(img) +src="([\x00-\xff]+?)"]/g
        res.data.detail.requirement.detail = res.data.detail.requirement.detail.replace(reg, "")
        this.setData({
          orderDetail: res.data.detail,
          acceptUser: res.data.detail.user,
          acceptTime: formatTime.formatTime(res.data.detail.timestamp, 'Y/M/D h:m:s')
        })
      }
    })
  },

  confirmReqFinish(e) {
    request.postData('/reqFinish', { id: this.data.id }).then(res => {
      console.log(res)
    })
  }
})