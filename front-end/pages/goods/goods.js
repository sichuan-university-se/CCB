// pages/goods/goods.js
const request = require('../../utils/request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    name: '',
    avatar: '',
    time: '',
    price: '',
    detail: '',
    imgList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    console.log(currentPage.options);
    // 获取当前商品id
    const currentId = currentPage.options.id;
    // 发起post请求获取商品详细信息
    this.setData({
      id: currentId,
      title: 'JavaScript高级程序设计',
      name: 'gakki',
      avatar: '/assets/image/gakki8.jpg',
      time: '22:00',
      detail: '有没有同学愿意一起去啊，有意者联系1438400913，这是qq号，他哥哥粉丝不要来捣乱，仅限ikun',
      imgList: ['/assets/image/gakki0.jpg', '/assets/image/gakki1.jpg', '/assets/image/test.png'],
      price: '40'
    })
  },

  switchLike(e) {
    if (!this.data.liked) {
      // 如果用户未收藏则写入缓存，以数组形式存储
      const currentLikeList = wx.getStorageSync('likeList') || [];
      currentLikeList.push(this.data.id);
      wx.setStorageSync('likeList', currentLikeList)
      request.postData('/addtolike', {
        type: 'item',
        id: this.data.id
      }).then(res => {
        console.log(res)
        this.setData({
          itemDetail: { ...this.data.itemDetail, like: 'true' }
        })
      })
    } else {
      // 反之取消收藏，并更改缓存
      const currentLikeList = wx.getStorageSync('likeList');
      const index = currentLikeList.indexOf(this.data.id);
      currentLikeList.splice(index, 1);
      wx.setStorageSync('likeList', currentLikeList);
      request.postData('/addtolike', {
        type: 'item',
        id: this.data.id,
        del: 1
      }).then(res => {
        console.log(res)
        this.setData({
          itemDetail: { ...this.data.itemDetail, like: 'false'}
        })
      })
    }
  }
})