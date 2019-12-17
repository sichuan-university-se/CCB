// pages/selfrls/selfrls.js
const request = require('../../utils/request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selfList: [],
    reqList: [],
    actList: [],
    itemList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request.postData('/getReqList', { count: 10, self: 1 }).then(res => {
      console.log(res)
      this.setData({
        selfList: res.data.list,
        reqList: res.data.list
      })
    })
  },

  showAct(e) {
    if (this.data.actList.length === 0) {
      request.postData('/getActList', { count: 10, self: 1 }).then(res => {
        console.log(res)
        this.setData({
          selfList: res.data.list,
          actList: res.data.list
        })
      })
    } else {
      this.setData({
        selfList: this.data.actList
      })
    }
  },

  showReq(e) {
    this.setData({
      selfList: this.data.reqList
    })
  },

  showItem(e) {
    if (this.data.actList.length === 0) {
      request.postData('/getActList', { count: 10, self: 1 }).then(res => {
        console.log(res)
        this.setData({
          selfList: res.data.list,
          actList: res.data.list
        })
      })
    } else {
      this.setData({
        selfList: this.data.actList
      })
    }
  }
})