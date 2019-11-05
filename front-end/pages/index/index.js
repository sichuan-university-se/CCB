//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    currentTab: 0,
    reqList: [{
        title: "蔡徐坤",
        detail: "12月川大坤坤演唱会组队"
      },
      {
        title: "孙笑川",
        detail: "孙哥最新单曲说好不笑，欢迎b站观看"
      },
      {
        title: "李耀星",
        detail: "周末彩虹六号通宵求友"
      },
      {
        title: "吴亦凡",
        detail: "you bad oh you bad"
      }
    ],
    actList: [{
        title: "新裤子乐队",
        detail: "你你你你要跳舞吗"
      },
      {
        title: "刺猬乐队",
        detail: "黑色的不是夜晚，是漫长的孤单"
      },
      {
        title: "Nirvana",
        detail: "come, as you are, as you were"
      },
      {
        title: "Oasis",
        detail: "don't look back in anger"
      },
      {
        title: "九连真人",
        detail: "哦善良，终究被中伤，哦善良，终究被重赏"
      }
    ],
    goodsList: [{
        title: "Beats耳机",
        price: "899",
        detail: "九成新，八折出"
      },
      {
        title: "考研政治书",
        price: "35",
        detail: "成功上岸"
      },
      {
        title: "计算机专业书",
        price: "60",
        detail: "三本打包价"
      },
      {
        title: "airpods二代",
        price: "1000",
        detail: "换新款"
      },
      {
        title: "kindle",
        price: "480",
        detail: "9成新，到货2个月，很少碰，现寻有缘人blablabla"
      }
    ]
  },
  //事件处理函数
  switchTab: function(e) {
    // console.log(e.target.dataset);
    // 判断当前tab与触发事件的点击tab是否相同，若相同则不进行data层的修改
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        modalName: null,
        currentTab: e.target.dataset.current
      })
    }
  },
  swiperChange: function(e) {
    this.setData({
      currentTab: e.detail.current
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  checkReqDetail: function(e) {
    wx.navigateTo({
      url: '../detail/detail?type=req&index=' + e.currentTarget.dataset.index,
    })
  },
  checkActDetail: function(e) {
    wx.navigateTo({
      url: '../detail/detail?type=act&index=' + e.currentTarget.dataset.index,
    })
  }
})