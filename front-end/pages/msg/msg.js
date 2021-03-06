// pages/msg/msg.js
const request = require('../../utils/request.js')
const formatTime = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    toLast: 'note0',
    msgList: [],
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
  onLoad: function () {
    const that = this
    wx.getSystemInfo({
      success: function (res) {
        // 设置页面滑动内容占据的高度（即减去顶部tab）
        that.setData({
          clientHeight: res.windowHeight - 40
        })
      },
    })
    const msgList = wx.getStorageSync('msgList')
    if (msgList) {
      msgList.map((item, index) => {
        request.postData('/getUserProfile', { uid: item.uid }).then(res => {
          console.log(res)
          msgList[index].username = res.data.value.username
          msgList[index].avatar = res.data.value.avatar
          msgList[index].time = formatTime.toDate(msgList[index].time)
          that.setData({
            msgList: msgList
          })
        })
      })
    }
    request.getData('/getSelfInfo').then(res => {
      this.setData({
        selfId: res.data.value.id
      })
    })
  },

  onShow: function () {
    const msgList = wx.getStorageSync('msgList')
    if (msgList) {
      msgList.map((item, index) => {
        request.postData('/getUserProfile', { uid: item.uid }).then(res => {
          console.log(res)
          msgList[index].username = res.data.value.username
          msgList[index].avatar = res.data.value.avatar
          msgList[index].time = formatTime.toDate(msgList[index].time)
          this.setData({
            msgList: msgList
          })
        })
      })
    }
  },

  // 点击改变视图
  switchTab: function (e) {
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
  swiperChange: function (e) {
    this.setData({
      currentTab: e.detail.current
    })
    // 判断是否处于通知页面，是则将页面位置滑动到底部，通过scroll-into-view进行控制
    if (e.detail.current === 1) {
      this.setData({
        toLast: `note${this.data.noteList.length}`
      })
    }
  },
  // 查看聊天记录
  checkChatRecord: function (e) {
    wx.navigateTo({
      url: `../chat/chat?selfId=${this.data.selfId}&peerId=${e.currentTarget.dataset.peerid}`,
    })
  },
  // 查看通知具体消息
  checkNoteDetail: function (e) {
    wx.navigateTo({
      url: `../detail/detail?type=${e.currentTarget.dataset.type}&id=${e.currentTarget.dataset.id}`,
    })
  },
})