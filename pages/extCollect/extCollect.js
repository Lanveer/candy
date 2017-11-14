// pages/extCollect/extCollect.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var user_id = wx.getStorageSync('userInfo').id;
    var token = wx.getStorageSync('userInfo').token;
    var flag = options.flag;
    if (flag == 'huang') {
      // 这是逛展列表
      that.setData({
        tp: false
      })
      wx.setNavigationBarTitle({
        title: '逛展记录',
      });
      that.setData({
        flag: true
      })
      //从缓存里面读取记录
      var localData = wx.getStorageSync('zwLocal');
      console.log(localData)
      if (localData == '') {
        that.setData({
          empty: false
        })
      } else {
        that.setData({
          empty: true
        });
        that.setData({
          listData: localData
        })
      }
    } else if (flag == 'collect') {
      // 这是收藏记录
      that.setData({
        tp: true
      })
      wx.setNavigationBarTitle({
        title: '收藏记录',
      })
      wx.request({
        url: app.globalData.host + 'v2/wechat.booth_collection/index',
        data: { token:token},
        method: 'get',
        success: function (res) {
          console.log(res)
          if (res.data.code != 0) {
            wx.showToast({
              title: '' + res.data.msg + '',
            })
            that.setData({
              empty: false
            })

          } else {
            that.setData({
              listData: res.data.data.content
            });
            that.setData({
              empty: true
            })
          }

        },
        error: function (err) {
          wx.showToast({
            title: '请求失败',
          })
        }
      })
    }
  },


  list_clicked: function (event) {
    // 用户行为统计
    var name = event.currentTarget.dataset.name;
    app.userAct('展位', name)

    wx.navigateTo({
      url: '../exhibitionPos/exhibitionPos?itemId=' + event.currentTarget.dataset.index,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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