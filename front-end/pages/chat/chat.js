// pages/chat/chat.js
const request = require('../../utils/request.js')
const md5 = require('../../utils/md5.min.js')
const formatTime = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    InputBottom: 0,
    tolast: 'msg0',
    msgList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    console.log(currentPage.options)
    const selfId = currentPage.options.selfId
    const peerId = currentPage.options.peerId
    this.setData({
      selfId: selfId,
      peerId: peerId
    })

    wx.getSystemInfo({
      success: res => {
        this.setData({
          clientHeight: res.windowHeight - 60
        })
      }
    })


    // 请求获取自身信息
    request.getData('/getSelfInfo').then(res => {
      if (res.statusCode === 200) {
        console.log(res)
        this.setData({
          selfInfo: res.data.value,
          from: res.data.value.openid
        })
      }
    })

    // 请求获取对方信息
    request.postData('/getUserProfile', { uid: peerId }).then(res => {
      if (res.statusCode === 200) {
        console.log(res)
        const currentMsg = wx.getStorageSync(`msgTo${res.data.value.openid}`) || []
        const formatTimeMsg = currentMsg.length !== 0 ? currentMsg.map(item => {
          return { ...item, time: formatTime.toDate(item.time) }
        }) : []
        this.setData({
          peerInfo: res.data.value,
          to: res.data.value.openid,
          msgList: formatTimeMsg,
          tolast: `msg${currentMsg.length}`
        })
        setInterval(openid => {
          const currMsgList = wx.getStorageSync(`msgTo${openid}`) || []
          const formatTimeMsg = currMsgList.length !== 0 ? currMsgList.map(item => {
            return { ...item, time: formatTime.toDate(item.time) }
          }) : []
          const chatModified = wx.getStorageSync('chatModified')
          if (chatModified) {
            this.setData({
              msgList: formatTimeMsg,
              tolast: `msg${formatTimeMsg.length}`
            })
            wx.setStorageSync('chatModified', false)
          }
        }, 1000, res.data.value.openid)
      }
    })
  },

  saveText(e) {
    this.setData({
      text: e.detail.value
    })
  },

  InputFocus(e) {
    console.log(e.detail.height)
    this.setData({
      InputBottom: e.detail.height
    })
  },

  closeInput(e) {
    this.setData({
      InputBottom: 0
    })
  },

  sendMsg(e) {
    // 发送聊天内容
    const random = this.randomCoding()
    request.postData('/chat/send', {
      "FROM": this.data.from,
      "TO": this.data.to,
      "TYPE": "MESSAGE",
      "CONTEXT": this.data.text,
      "HASH": md5(this.data.text).toUpperCase(),
      "RANDOM": random
    }).then(res => {
      console.log(res)
      const currTime = (new Date()).getTime()
      const newMsg = {
        speaker: 'self',
        content: this.data.text,
        time: formatTime.toDate(currTime),
        type: 'MESSAGE'
      }
      const text = this.data.text
      this.setData({
        msgList: [...this.data.msgList, newMsg],
        text: ''
      })

      // 处理缓存，利用msgList进行总体聊天记录的存储，仅存储对方用户信息，时间以及lastMsg
      const msgList = wx.getStorageSync('msgList') || []
      if (msgList.length === 0) {
        wx.setStorageSync('msgList', [{
          uid: this.data.peerId,
          mid: this.data.to,
          time: currTime,
          lastMsg: text,
          type: 'MESSAGE'
        }])
      } else if (msgList.some(item => item.mid == this.data.to)) {
        console.log('已存在与对方的聊天记录')
        const index = msgList.findIndex(item => item.mid == this.data.to)
        msgList[index] = {
          uid: this.data.peerId,
          mid: this.data.to,
          time: currTime,
          lastMsg: text,
          type: 'MESSAGE'
        }
        msgList.unshift(...msgList.splice(index, 1))
        wx.setStorageSync('msgList', msgList)
      } else {
        msgList.unshift({
          uid: this.data.peerId,
          mid: this.data.to,
          time: currTime,
          lastMsg: text,
          type: 'MESSAGE'
        })
        wx.setStorageSync('msgList', msgList)
      }
      wx.setStorageSync('chatModified', true)

      // 处理聊天详情缓存，每个聊天记录单独作为缓存，
      const currentMsg = wx.getStorageSync(`msgTo${this.data.to}`) || []
      currentMsg.push({
        speaker: 'self',
        content: text,
        time: currTime,
        type: 'MESSAGE'
      })
      wx.setStorageSync(`msgTo${this.data.to}`, currentMsg)
    })
  },

  randomCoding() {
    const arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    let result = ''
    for (let i = 0; i < 8; i++) {
      result += arr[Math.floor(Math.random() * 36)]
    }
    return result
  }
})