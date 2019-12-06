// pages/detail/detail.js
const app = getApp()
const request = require('../../utils/request.js')

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    reqDetail: {

    },
    actDetail: {

    }
  },
  onLoad: function () {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    console.log(currentPage.options);
    this.setData({
      type: currentPage.options.type,
      id: currentPage.options.id
    })
    this.setData({
      reqDetail: {
        name: '蔡徐坤',
        title: '12月川大坤坤演唱会组队',
        detail: '有没有同学愿意一起去啊，有意者联系1438400913，这是qq号，他哥哥粉丝不要来捣乱，仅限ikun',
        time: '2019年10月7号',
        image: '/assets/image/test.png'
      }
    })
    const likeList = wx.getStorageSync('likeList');
    if (Array.isArray(likeList) && likeList.includes(this.data.id)) {
      this.setData({
        liked: true
      })
    } else {
      this.setData({
        liked: false
      })
    }
  },
  switchLike(e) {
    if (!this.data.liked) {
      // 如果用户未收藏则写入缓存，以数组形式存储
      const currentLikeList = wx.getStorageSync('likeList') || [];
      currentLikeList.push(this.data.id);
      wx.setStorageSync('likeList', currentLikeList)
      request.postData('/addtolike', {
        type: this.data.type == 'req' ? 'requirement' : 'group',
        id: this.data.id
      }).then(res => {
        console.log(res)
        this.setData({
          liked: true
        })
        wx.showToast({
          title: '收藏成功',
          duration: 1000
        })
      })
    } else {
      // 反之取消收藏，并更改缓存
      const currentLikeList = wx.getStorageSync('likeList');
      const index = currentLikeList.indexOf(this.data.id);
      currentLikeList.splice(index, 1);
      wx.setStorageSync('likeList', currentLikeList);
      request.postData('/addtolike', {
        type: this.data.type == 'req' ? 'requirement' : 'group',
        id: this.data.id,
        del: 1
      }).then(res => {
        console.log(res)
        this.setData({
          liked: false
        })
      })
    }
  }
});