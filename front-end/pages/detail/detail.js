// pages/detail/detail.js
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar
  },
  onLoad: function() {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    console.log(currentPage.options);
  },
  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
  },
});