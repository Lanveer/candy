// pages/Mine/zhanweiList/zhanweiList.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  onLoad: function (options) {
    var that = this;
    var userInfo = wx.getStorageSync('userInfo');
    that.setData({
      userInfo: userInfo
    })
    //获取code信息
    var codeInfo = wx.getStorageSync('codeInfo');
    that.setData({
      codeInfo: codeInfo
    })
    //获取用户信息
    wx.request({
      url: app.globalData.host + 'v2/wechat.user/info',
      method: 'GET',
      data: {
        token: that.data.userInfo.token
      },
      success: function (res) {
        if (res.data.code != 0) {
          wx.showToast({
            title: '加载失败',
          })
        } else {
          if(res.data.data.booth.length==0){
            wx.showToast({
              title: '没有相关的展位信息',
            })
          }else{
            var zhanweiData=res.data.data.booth;
            console.log(zhanweiData)
            that.setData({
              zhanweiData: zhanweiData
            })
          }
        }
      },
      error: function (err) { }
    })


  },

  list_clicked: function (event) {
    // 用户行为统计
    var name = event.currentTarget.dataset.name;
    app.userAct('展位', name)

    wx.navigateTo({
      url: '../../exhibitionPos/exhibitionPos?itemId=' + event.currentTarget.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})