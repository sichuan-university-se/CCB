//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    currentTab: 0,
    picker: ['望江', '江安', '跨校区'],
    reqList: [{
        id: 1,
        title: "蔡徐坤",
        detail: "12月川大坤坤演唱会组队"
      },
      {
        id: 2,
        title: "孙笑川",
        detail: "孙哥最新单曲说好不笑，欢迎b站观看"
      },
      {
        id: 3,
        title: "李耀星",
        detail: "周末彩虹六号通宵求友"
      },
      {
        id: 4,
        title: "吴亦凡",
        detail: "you bad oh you bad"
      },
      {
        id: 5,
        title: "古巨基",
        detail: "渲染层网络层错误"
      },
      {
        id: 6,
        title: "周杰伦",
        detail: "中国标准时间"
      },
      {
        id: 7,
        title: "mata川",
        detail: "-8000 -8000"
      }
    ],
    actList: [{
        id: 1,
        title: "新裤子乐队",
        detail: "你你你你要跳舞吗"
      },
      {
        id: 2,
        title: "刺猬乐队",
        detail: "黑色的不是夜晚，是漫长的孤单"
      },
      {
        id: 3,
        title: "Nirvana",
        detail: "come, as you are, as you were"
      },
      {
        id: 4,
        title: "Oasis",
        detail: "don't look back in anger"
      },
      {
        id: 5,
        title: "九连真人",
        detail: "哦善良，终究被中伤，哦善良，终究被重赏"
      }
    ],
    goodsList: [{
        id: 1,
        title: "Beats耳机",
        price: "899",
        detail: "九成新，八折出"
      },
      {
        id: 2,
        title: "考研政治书",
        price: "35",
        detail: "成功上岸"
      },
      {
        id: 3,
        title: "计算机专业书",
        price: "60",
        detail: "三本打包价"
      },
      {
        id: 4,
        title: "airpods二代",
        price: "1000",
        detail: "换新款"
      },
      {
        id: 5,
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
    const that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          clientHeight: res.windowHeight - 90
        })
      },
    })
    const currentCampus = wx.getStorageSync('campus')
    if (currentCampus) {
      that.setData({
        currentCampus: currentCampus=='jiangan'?'江安':'望江'
      })
      // 已获取到当前用户所在校区，进行请求操作

    } else {
      that.setData({
        modalName: 'RadioModal'
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

  setCampus(e) {
    wx.setStorageSync('campus', e.currentTarget.dataset.campus)
    this.setData({
      modalName: null,
      currentCampus: e.currentTarget.dataset.campus=='jiangan'?'江安':'望江'
    })
  },

  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },

  checkReqDetail: function(e) {
    wx.navigateTo({
      url: `../detail/detail?type=req&id=${e.currentTarget.dataset.id}`,
    })
    app.setVisitCount(e)
  },
  checkActDetail: function(e) {
    wx.navigateTo({
      url: `../detail/detail?type=act&id=${e.currentTarget.dataset.id}`,
    })
    app.setVisitCount(e)
  },
  checkGoodsDetail: function(e) {
    wx.navigateTo({
      url: `../goods/goods?id=${e.currentTarget.dataset.id}`,
    })
  }
})