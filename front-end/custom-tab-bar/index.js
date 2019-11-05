Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    className: 'hide',
    showReleaseItem: false,
    "list": [{
        "pagePath": "/pages/index/index",
        "text": "主页",
        "iconPath": "/assets/home.png",
        "selectedIconPath": "/assets/home_selected.png"
      },
      {
        "pagePath": "/pages/msg/msg",
        "text": "消息",
        "iconPath": "/assets/message.png",
        "selectedIconPath": "/assets/message_selected.png"
      },
      {
        "pagePath": "/pages/self/self",
        "text": "我的",
        "iconPath": "/assets/self.png",
        "selectedIconPath": "/assets/self_selected.png"
      }
    ]
  },
  attached: function() {
    this.animation = wx.createAnimation();
  },
  methods: {
    switchTab: function(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      this.setData({
        selected: data.index
      })
      wx.switchTab({
        url
      })
    },
    rotate: function() {
      if (!this.data.showReleaseItem) {
        this.animation.rotate(90).step();
        this.setData({
          animation: this.animation.export(),
          className: 'animation-slide-left',
          showReleaseItem: true
        });
      } else {
        this.animation.rotate(-90).step();
        this.setData({
          animation: this.animation.export(),
          className: 'hide',
          showReleaseItem: false
        })
      }

    }
  }
})