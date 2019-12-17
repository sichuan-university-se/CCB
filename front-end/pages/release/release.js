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
    imgList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    console.log(currentPage.options);
    this.setData({
      type: currentPage.options.type
    })
  },

  changeCampus(e) {
    this.setData({
      index: e.detail.value
    })
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

  handleFormSubmit(e) {
    // 收集表单数据，并进行提交
    console.log(e.detail)
    const params = { ...e.detail.value, type: this.data.type }
    if (params.title && params.detail) {
      const imgList = this.data.imgList
      const getImgList = imgList.map(item => {
        return request.uploadImg(item)
      })
      Promise.all(getImgList).then(res => {
        res.map(item => {
          const src = JSON.parse(item).url
          params.detail += `[img src="${src}"]`
        })
        console.log(params.detail)
        request.postData('/releaseItem', params)
      }).then(res => {
        wx.showToast({
          title: '发布成功',
          duration: 1000
        })
        // 设置发布数目缓存，每次发布均将缓存数目加一
        wx.setStorageSync('rlsNum', wx.getStorageSync('rlsNum') ? wx.getStorageSync('rlsNum') + 1 : 1)
        wx.switchTab({
          url: '../index/index'
        })
      })
    } else {
      wx.showToast({
        title: params.title ? '请输入详情' : '请输入标题',
        icon: 'none',
        duration: 1000
      })
    }
  }
})