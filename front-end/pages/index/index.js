//index.js
//获取应用实例
const app = getApp()
const request = require('../../utils/request.js')

Page({
  data: {
    currentTab: 0,
    campusPicker: ['望江', '江安', '跨校区'],
    reqPicker: ['发布需求', '组队求友', '闲置出手'],
    reqPicker: [{
      value: '发布需求',
      type: 'req'
    },
    {
      value: '组队求友',
      type: 'act'
    },
    {
      value: '闲置出手',
      type: 'goods'
    }
    ],
    reqList: [],
    actList: [{
      id: 1,
      title: "新裤子乐队但是受打击阿邦大市比才到家对方你圣诞节",
      time: "20:00"
    },
    {
      id: 2,
      title: "刺猬乐队",
      time: "18:00"
    },
    {
      id: 3,
      title: "Nirvana",
      time: "17:56"
    },
    {
      id: 4,
      title: "Oasis",
      time: "16:34"
    },
    {
      id: 5,
      title: "九连真人",
      time: "16:00"
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
  switchTab: function (e) {
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
  swiperChange: function (e) {
    this.setData({
      currentTab: e.detail.current
    })
  },
  onLoad: function () {
    const that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          clientHeight: res.windowHeight - 40
        })
      },
    })

    const currentCampus = wx.getStorageSync('campus')
    if (currentCampus) {
      that.setData({
        currentCampus: currentCampus == 'jiangan' ? '江安' : '望江'
      })
    } else {
      that.setData({
        modalName: 'RadioModal'
      })
    }

    // 获取需求列表
    const getReqList = () => {
      const campus = wx.getStorageSync('campus') ? '1' : '0'
      request.getData('/getReqList', `&count=10&campus=${campus}`).then(res => {
        console.log(res)
        that.setData({
          reqList: res.data.list
        })
      })
    }

    // 获取顶部广告内容
    const getTopItem = () => {
      request.getData('/getTopItem').then(res => {
        console.log(res)
        that.setData({
          topImages: res.data.images
        })
      })
    }

    getReqList();
    getTopItem();
  },

  // 设定所在校区并存入缓存
  setCampus(e) {
    wx.setStorageSync('campus', e.currentTarget.dataset.campus)
    this.setData({
      modalName: null,
      currentCampus: e.currentTarget.dataset.campus == 'jiangan' ? '江安' : '望江'
    })
  },

  // 更改校区
  campusChange(e) {
    console.log(e);
    this.setData({
      campusIndex: e.detail.value
    })
    request.getData('/getReqList', `&count=10&campus=${e.detail.value}`).then(res => {
      console.log(res)
      this.setData({
        reqList: res.data.list
      })
    })
  },

  // 选定类别进入发布需求页面
  releaseReq(e) {
    console.log(e);
    const releaseType = this.data.reqPicker[e.detail.value].type;
    wx.navigateTo({
      url: `../release/release?type=${releaseType}`,
    })
  },

  // 查看需求以及活动详情
  checkDetail: function (e) {
    app.setVisitCount(e)
    wx.navigateTo({
      url: `../detail/detail?type=${e.currentTarget.dataset.type}&id=${e.currentTarget.dataset.id}`,
    })
  },

  // 查看商品详情
  checkGoodsDetail: function (e) {
    wx.navigateTo({
      url: `../goods/goods?id=${e.currentTarget.dataset.id}`,
    })
  },
})