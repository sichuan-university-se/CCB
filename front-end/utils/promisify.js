// 利用promise来简化代码，便于调用小程序的api

module.exports = (api) => {
  return (options, ...params) => {
    return new Promise((resolve, reject) => {
      api(Object.assign({}, options, {
        success: resolve,
        fail: reject
      }), ...params);
    });
  }
}