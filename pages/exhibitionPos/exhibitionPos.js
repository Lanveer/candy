// pages/exhibitionPos/exhibitionPos.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemId: '',
    zwData: '',
    user_id: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var itemId = options.itemId;
    //获取用户id
    var user_id = wx.getStorageSync('userInfo').id;
    var token = wx.getStorageSync('userInfo').token;
    that.setData({
      itemId: itemId,
      user_id: user_id,
      token: token
    });

    // 获取展位详情接口
    wx.request({
      url: app.globalData.host + 'v2/wechat.booth/read',
      method: 'get',
      data: { id: itemId },
      success: function (res) {
        if (res.data.code != 0) {
          wx.showToast({
            title: '加载失败！',
          })
        } else {
          that.setData({
            zwData: res.data.data
          });
          var zwLocal = [];
          var x = wx.getStorageSync('zwLocal');
          if (x == '') {
            var x = [];
            var loalData = res.data.data;
            x.push(loalData);
            wx.setStorageSync('zwLocal', x);
          } else {
            x.push(res.data.data);
            wx.setStorageSync('zwLocal', x);
          }

          var collected = res.data.data.collected;
          if (collected == 0) {
            that.setData({
              colltcted: true
            })
          } else {
            that.setData({
              colltcted: false
            })
          }
        }
      }
    });

    // 获取产品列表接口
    wx.request({
      url: app.globalData.host + 'v2/wechat.booth/products',
      method: 'get',
      data: { booth_id: that.data.itemId },
      success: function (res) {
        if (res.data.code != 0) {
          //加载失败 
        } else {
          console.log(res.data.data)
          if (res.data.data.length != 0 || res.data.data!=''){
            that.setData({
              proFlag:true
            })
          }else{
            proFlag: false
          }
          that.setData({
            productList: res.data.data
          });

          for (var i = 0; i < that.data.productList.length; i++) {
            var obj = {};
            var str = that.data.productList[i].goods_name;
            var key = 'productList[' + i + '].goods_name';
            if (str.length > 6) {
              str = str.substr(0, 6) + "...";
            }
            obj[key] = str;
            that.setData(obj)
          }
        }
      }
    })

  },
  // 点击产品列表跳转详情
  productHref: function (e) {
    var that=this;
    var idx = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../Detail/detail?idx='+idx,
    });

    var data = that.data.productList;
    var transData=data[idx];
    wx.setStorageSync('transData', transData)
  },

  //收藏
  collect: function () {
    var that = this;
    var itemId = that.data.itemId;
    var user_id = that.data.user_id;
    var token = that.data.token;

    wx.request({
      url: app.globalData.host + 'v2/wechat.booth_collection/save',
      method: 'post',
      data: {
        token: token,
        booth_id: itemId
      },
      success: function (res) {
        console.log(res)
        if (res.data.code != 0) {
          wx.showToast({
            title: '收藏失败',
          })
          that.setData({
            colltcted: true
          })
        } else {
          wx.showToast({
            title: '收藏成功！',
          });
          that.setData({
            colltcted: false
          });
          //将收藏成功的状态写到缓存
        }
      },
      error: function (err) {

      }

    })

  },
  // 取消收藏
  uncollect: function () {
    var that = this;
    var itemId = that.data.itemId;
    var user_id = that.data.user_id;
    var token = that.data.token;
    wx.request({
      url: app.globalData.host + 'v2/wechat.booth_collection/delete',
      data: {
        token: token,
        booth_id: itemId
      },
      method: 'DELETE',
      success: function (res) {
        if (res.data.code != 0) {
          wx.showToast({
            title: '取消收藏失败',
          })
          that.setData({
            colltcted: false
          })
        } else {
          wx.showToast({
            title: '取消收藏成功',
          })
          that.setData({
            colltcted: true
          })
        }
      },
      error: function (err) {

      }

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
