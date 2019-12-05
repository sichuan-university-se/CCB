// pages/goods/goods.js
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
  onLoad: function(options) {
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
    const likeList = wx.getStorageSync('likeList');
    if (Array.isArray(likeList) && likeList.includes(currentId)) {
      this.setData({
        liked: true
      })
    } else {
      this.setData({
        liked: false
      })
    }
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

  switchLike(e) {
    if (!this.data.liked) {
      // 如果用户未收藏则写入缓存，以数组形式存储
      const currentLikeList = wx.getStorageSync('likeList') || [];
      currentLikeList.push(this.data.id);
      wx.setStorageSync('likeList', currentLikeList)
    } else {
      // 反之取消收藏，并更改缓存
      const currentLikeList = wx.getStorageSync('likeList');
      const index = currentLikeList.indexOf(this.data.id);
      currentLikeList.splice(index, 1);
      wx.setStorageSync('likeList', currentLikeList);
    }
    // 更改图标
    this.setData({
      liked: !this.data.liked
    })
  }
})