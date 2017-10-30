// pages/Mine/info/info.js

var app = getApp()
Page({
  data: {
    userData: ''
  },
  onLoad: function (options) {
    //获取用户信息
    var that = this
    var userInfo = wx.getStorageSync('userInfo');

    if (userInfo) {
      that.setData({
        userData: userInfo
      })
    } else {
      wx.showToast({
        title: '没有用户信息！',
      })
    }
   
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },








})
