// 封装get以及post请求

const baseUrl = 'http://192.168.31.66:5000/wx';

function getData(api, param) {
  return new Promise((resolve, reject) => {
    const openid = wx.getStorageSync('openid');
    wx.request({
      // baseUrl为域名加上对应请求api再以参数形式携带openid，最后检测是否有额外的参数
      url: `${baseUrl}${api}?openid=${openid}${param ? param : ''}`,
      header: {
        "content-type": "application/json",
        "cookie": wx.getStorageSync('cookies')
      },
      success: resolve,
      fail: reject
    })
  })
}

function postData(api, params) {
  return new Promise((resolve, reject) => {
    const openid = wx.getStorageSync('openid');
    wx.request({
      url: baseUrl + api + '?openid=' + openid,
      header: {
        "content-type": "application/x-www-form-urlencoded",
        "cookie": wx.getStorageSync('cookies')
      },
      data: params,
      method: "POST",
      success: resolve,
      fail: reject
    })
  })
}

function uploadImg(path) {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: `${baseUrl}/uploadImg?openid=${openid}`,
      header: {
        "content-type": "application/x-www-form-urlencoded",
        "cookies": wx.getStorageSync('cookies')
      },
      filePath: path,
      name: 'img',
      success: resolve,
      fail: reject
    })
  })
}

// module.exports用于导出代码，利用require(path)来进行引入加载
module.exports.getData = getData;
module.exports.postData = postData;
module.exports.uploadImg = uploadImg;
