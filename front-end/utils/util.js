const formatTime = date => {
  var date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const toDate = timestamp => {
  const currstamp = parseInt(timestamp)
  const currDay = (new Date()).toLocaleDateString()
  const currTime = new Date(currDay)
  const currYear = currTime.getFullYear()
  const time = new Date(currstamp)
  const day = (new Date(currstamp)).toLocaleDateString()
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const date = time.getDate()
  const hour = time.getHours()
  const minute = time.getMinutes()
  if (currDay == day) {
    return [hour, minute].map(formatNumber).join(':')
  } else if (currYear == year) {
    return [month, date].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
  } else {
    return [year, month, date].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
  }
}

module.exports = {
  formatTime: formatTime,
  toDate: toDate
}
