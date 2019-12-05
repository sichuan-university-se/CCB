//app.js
App({
  onLaunch: function () {

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  ccblogin: function () {
      const promisify = require('./utils/promisify.js')
      // 利用封装得到promise对象，处理login得到的参数
      const login = promisify(wx.login)
      const request = promisify(wx.request)

      // 登录
      return login().then(res => {
        wx.setStorageSync('code', res.code)
        return res.code
      }).then(res => {
        return request({
          url: `http://192.168.31.66:5000/wx/login?code=${res}`
        })
      }).then(res => {
        console.log(res)
        // 获取sessionid，并存入cookie
        const sessionid = res.header['Set-Cookie'].split(";")[0]
        wx.setStorageSync('cookies', sessionid)
        wx.setStorageSync('openid', res.data.openid)
        wx.setStorageSync('exists', res.data.exists)
        return res.data.exists
      })
  },
  // 利用缓存设置用户浏览足迹
  setVisitCount: function (e) {
    // 获取当前需求id
    const onId = e.currentTarget.dataset.id;

    // 判断需求类型，组队？校内需求
    const visitType = e.currentTarget.dataset.type;

    // 获取小程序缓存访问数
    const currentVisitCount = wx.getStorageSync('visitCount');

    // 获取当前存储id列表
    const currentIdList = wx.getStorageSync(`${visitType}IdList`);

    // 如果已存在访问数，则进行加一以及添加当前id到对应列表中
    if (currentVisitCount) {
      if (![...currentIdList].includes(onId)) {
        wx.setStorageSync('visitCount', currentVisitCount + 1)
        wx.setStorageSync(`${visitType}IdList`, [...currentIdList, onId])
      }
    } else {
      // 若无，则置为1，并设置列表
      wx.setStorageSync('visitCount', 1)
      const idList = [onId];
      wx.setStorageSync(`${visitType}IdList`, idList)
    }
  }
})