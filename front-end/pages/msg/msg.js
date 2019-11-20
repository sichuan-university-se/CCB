// pages/msg/msg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    toLast: 'note0',
    msgList: [{
        id: 2,
        name: '李耀星',
        lastMsg: '我在北京',
        time: '08:00',
        isRead: true,
        msgCount: 7,
        avatar: '/assets/image/gakki0.jpg'
      },
      {
        id: 4,
        name: '李耀星',
        lastMsg: '我在北京',
        time: '12:00',
        isRead: true,
        msgCount: 2,
        avatar: '/assets/image/gakki1.jpg'
      },
      {
        id: 89,
        name: '李耀星',
        lastMsg: '我在北京',
        time: '17:00',
        isRead: false,
        msgCount: 0,
        avatar: '/assets/image/gakki2.jpg'
      },
      {
        id: 90,
        name: '李耀星',
        lastMsg: '我在北京',
        time: '18:00',
        isRead: true,
        msgCount: 2,
        avatar: '/assets/image/gakki3.jpg'
      }
    ],
    noteList: [{
        id: 1,
        type: "act",
        time: "20:00",
        title: "坤坤12月川大演唱会组队"
      },
      {
        id: 2,
        type: "req",
        time: "24:00",
        title: "新裤子"
      },
      {
        id: 3,
        type: "act",
        time: "12:00",
        title: "刺猬乐队"
      },
      {
        id: 4,
        type: "req",
        time: "08:00",
        title: "nirvana"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    const that = this;
    wx.getSystemInfo({
      success: function(res) {
        // 设置页面滑动内容占据的高度（即减去顶部tab）
        that.setData({
          clientHeight: res.windowHeight - 40
        })
      },
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
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

  // 点击改变视图
  switchTab: function(e) {
    // console.log(e.target.dataset);
    // 判断当前tab与触发事件的点击tab是否相同，若相同则不进行data层的修改
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  // 滑动改变视图
  swiperChange: function(e) {
    this.setData({
      currentTab: e.detail.current
    })
    // 判断是否处于通知页面，是则将页面位置滑动到底部，通过scroll-into-view进行控制
    if (e.detail.current == 1) {
      this.setData({
        toLast: `note${this.data.noteList.length}`
      })
    }
  },
  // 查看聊天记录
  checkChatRecord: function(e) {
    console.log(e.currentTarget);
    wx.navigateTo({
      url: `../chat/chat?id=${e.currentTarget.dataset.index}`,
    })
  },
  // 查看通知具体消息
  checkNoteDetail: function(e) {
    wx.navigateTo({
      url: `../detail/detail?type=${e.currentTarget.dataset.type}&id=${e.currentTarget.dataset.id}`,
    })
  },
})