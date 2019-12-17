// pages/detail/detail.js
const request = require('../../utils/request.js')

Page({
  data: {
    itemDetail: {}
  },
  onLoad: function () {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    console.log(currentPage.options);
    this.setData({
      type: currentPage.options.type,
      id: currentPage.options.id
    })

    // 请求需求/活动详情
    request.postData('/getdetail', {
      type: currentPage.options.type,
      id: currentPage.options.id
    }).then(res => {
      console.log(res)
      const reg = /\[(img) +src="([\x00-\xff]+?)"]/g
      const imgList = []
      const mList = res.data.info.detail.match(reg)
      if (mList) {
        mList.map(item => {
          const reg = /\[(img) +src="([\x00-\xff]+?)"]/g
          imgList.push(reg.exec(item)[2])
        })
      }
      res.data.info.detail = res.data.info.detail.replace(reg, "")
      this.setData({
        itemDetail: { ...res.data.info, imgList: imgList }
      })
      return res.data.info.user.id
    }).then(id => {
      request.getData('/getSelfInfo').then(res => {
        console.log(res)
        this.setData({
          selfId: res.data.value.id,
          releaseId: id,
          self: res.data.value.id == id ? true : false
        })
      })
    })
  },

  ViewImage(e) {
    wx.previewImage({
      urls: this.data.itemDetail.imgList,
      current: e.currentTarget.dataset.url
    });
  },

  onShareAppMessage: res => {
    console.log(res)
    const shareObj = {
      title: "川川帮",
      success: res => {
        if (res.errMsg === 'shareAppMessage:ok') {
          wx.showToast({
            title: '分享成功',
            duration: 1000
          })
        }
      },
      fail: res => {
        if (res.errMsg === 'shareAppMessage:fail cancel') {
          wx.showToast({
            title: '取消分享',
            icon: 'none',
            duration: 1000
          })
        }
      }
    }
    if (res.from === 'button') {
      console.log(res)
    }
    return shareObj
  },

  switchLike(e) {
    if (this.data.itemDetail.like === 'false') {
      // 如果用户未收藏则写入缓存，以数组形式存储
      const currentLikeList = wx.getStorageSync('likeList') || [];
      currentLikeList.push(this.data.id);
      wx.setStorageSync('likeList', currentLikeList)
      request.postData('/addtolike', {
        type: this.data.type === 'requirement' ? 'requirement' : 'activity',
        id: this.data.id
      }).then(res => {
        console.log(res)
        if (res.statusCode === 200) {
          this.setData({
            itemDetail: { ...this.data.itemDetail, like: 'true' }
          })
          wx.showToast({
            title: '收藏成功',
            duration: 1000
          })
        }
      })
    } else {
      // 反之取消收藏，并更改缓存
      const currentLikeList = wx.getStorageSync('likeList');
      const index = currentLikeList.indexOf(this.data.id);
      currentLikeList.splice(index, 1);
      wx.setStorageSync('likeList', currentLikeList);
      request.postData('/addtolike', {
        type: this.data.type === 'requirement' ? 'requirement' : 'activity',
        id: this.data.id,
        del: 1
      }).then(res => {
        console.log(res)
        if (res.statusCode === 200) {
          this.setData({
            itemDetail: { ...this.data.itemDetail, like: 'false' }
          })
        }
      })
    }
  },

  switchToChat(e) {
    if (!this.data.self) {
      wx.navigateTo({
        url: `../chat/chat?selfId=${this.data.selfId}&peerId=${this.data.releaseId}`
      })
    } else {
      wx.showToast({
        title: '此为您发布！',
        duration: 1000,
        icon: 'none'
      })
    }
  },

  handleAccept(e) {
    request.postData('/reqAccept', { rid: this.data.id }).then(res => {
      console.log(res)
      if (res.statusCode === 200) {
        wx.showToast({
          title: '接取成功',
          duration: 1000
        })
        setTimeout(() => {
          wx.navigateTo({
            url: `../order/detail/detail?type=${this.data.type}&id=${this.data.id}`,
          })
        }, 1000)
      }
    }).catch(err => {
      console.log(err)
      wx.showToast({
        title: 'oops！',
        icon: 'none',
        duration: 1000
      })
    })
  }
});