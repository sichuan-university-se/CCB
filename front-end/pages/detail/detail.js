// pages/detail/detail.js
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    reqDetail: {

    },
    actDetail: {

    }
  },
  onLoad: function() {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    console.log(currentPage.options);
    this.setData({
      type: currentPage.options.type
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
  },
});