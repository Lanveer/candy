// pages/News/Details/singleImageDetail/detail.js
var app = getApp();
Page({
  data: {
    title: '',
    editor: '',
    time: '',
    image1: '',
    image2: '',
    image3: '',
    content1: '',
    content2: '',
    content3: '',
    is_Top: true,
    loadingHidden: true,
    needshowInfo: false,
    isGetCodeEnable: true,
    feed: [
      {
        title: '白酒',
        src1: "../../../images/feed-unchoosed.png",
        src2: '../../../images/feed-choosed.png',
        isChecked: false
      },
      {
        title: '啤酒',
        src1: "../../../images/feed-unchoosed.png",
        src2: '../../../images/feed-choosed.png',
        isChecked: false
      },
      {
        title: '葡萄酒',
        src1: "../../../images/feed-unchoosed.png",
        src2: '../../../images/feed-choosed.png',
        isChecked: false
      },
      {
        title: '黄酒',
        src1: "../../../images/feed-unchoosed.png",
        src2: '../../../images/feed-choosed.png',
        isChecked: false
      },
      {
        title: '预调酒',
        src1: "../../../images/feed-unchoosed.png",
        src2: '../../../images/feed-choosed.png',
        isChecked: false
      },
      {
        title: '食品饮料',
        src1: "../../../images/feed-unchoosed.png",
        src2: '../../../images/feed-choosed.png',
        isChecked: false
      },
      {
        title: '调味品',
        src1: "../../../images/feed-unchoosed.png",
        src2: '../../../images/feed-choosed.png',
        isChecked: false
      },
      {
        title: '机械包装',
        src1: "../../../images/feed-unchoosed.png",
        src2: '../../../images/feed-choosed.png',
        isChecked: false
      },
      {
        title: '其它',
        src1: "../../../images/feed-unchoosed.png",
        src2: '../../../images/feed-choosed.png',
        isChecked: false
      },
      // if unchoosed
    ],
  },
  onLoad: function (options) {
    // 首页banner的详情开始
    var that = this;
    var indexBaner = options.indexBaner;
    var id = options.id;
    console.log(indexBaner)
    switch (parseInt(indexBaner)) {
      case 0:
        //首页轮播开始
        wx.request({
          url: app.globalData.host + 'v2/wechat.news/read',
          method: 'get',
          data: {
            type: 6,
            id: id
          },
          success: function (res) {
            if (res.data.code != 0) {
              wx.showToast({
                title: '加载失败；',
              })
            } else {
              console.log(res.data.data)
              that.setData({
                // title: res.data.data.name.length > 18 ? res.data.data.name.substring(0, 18) + '..' : res.data.data.name,
                title: res.data.data.name,
                indexBannerData: res.data.data,
                single: true,
                mult: false,
                video: false
              })
            }
          }
        });
        break;

      case 1:
        //轮播图模式
        wx.request({
          url: app.globalData.host + 'v2/wechat.news/read',
          method: 'get',
          data: {
            type: 6,
            id: id
          },
          success: function (res) {
            if (res.data.code != 0) {
              wx.showToast({
                title: '加载失败；',
              })
            } else {
              console.log(res.data.data)
              that.setData({
                // title: res.data.data.name.length > 18 ? res.data.data.name.substring(0, 18) + '..' : res.data.data.name,
                title: res.data.data.name,
                indexBannerData: res.data.data,
                single: true,
                mult: false,
                video: false
              })
            }
          }
        });
        break;
      case 2:
        //单图模式
        wx.request({
          url: app.globalData.host + 'v2/wechat.news/read',
          method: 'get',
          data: {
            id: id
          },
          success: function (res) {
            console.log(res)
            if (res.data.code != 0) {
              wx.showToast({
                title: '加载失败；',
              })
            } else {
              console.log(res.data.data)
              that.setData({
                // title: res.data.data.name.length > 18 ? res.data.data.name.substring(0, 18) + '..' : res.data.data.name,
                rich: res.data.data.content,
                title: res.data.data.name,
                indexBannerData: res.data.data,
                single: true,
                mult: false,
                video: false
              })
            }
          }
        });
        break;
      case 3:
        //多图模式
        wx.request({
          url: app.globalData.host + 'v2/wechat.news/read',
          method: 'get',
          data: {
            id: id
          },
          success: function (res) {
            console.log(res)
            if (res.data.code != 0) {
              wx.showToast({
                title: '加载失败；',
              })
            } else {
              console.log(res.data.data)
              that.setData({
                // title: res.data.data.name.length > 18 ? res.data.data.name.substring(0, 18) + '..' : res.data.data.name,
                title: res.data.data.name,
                indexBannerData: res.data.data,
                single: false,
                mult: true,
                video: false
              })
            }
          }
        });
        break;
      case 4:
        // 大图模式
        wx.request({
          url: app.globalData.host + 'v2/wechat.news/read',
          method: 'get',
          data: {
            id: id
          },
          success: function (res) {
            console.log(res)
            if (res.data.code != 0) {
              wx.showToast({
                title: '加载失败；',
              })
            } else {
              console.log(res.data.data)
              that.setData({
                // title: res.data.data.name.length > 18 ? res.data.data.name.substring(0, 18) + '..' : res.data.data.name,
                title: res.data.data.name,
                indexBannerData: res.data.data,
                single: true,
                mult: false,
                video: false
              })
            }
          }
        });
        break;
      case 5:
        wx.request({
          url: app.globalData.host + 'v2/wechat.news/read',
          method: 'get',
          data: {
            id: id
          },
          success: function (res) {
            console.log(res)
            if (res.data.code != 0) {
              wx.showToast({
                title: '加载失败；',
              })
            } else {
              console.log(res.data.data)
              that.setData({
                // title: res.data.data.name.length > 18 ? res.data.data.name.substring(0, 18) + '..' : res.data.data.name,
                title: res.data.data.name,
                indexBannerData: res.data.data,
                single: true,
                mult: false,
                video: true
              })
            }
          }
        });
        break;
    }
  

    // 首页banner的详情结束



    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var uid = wx.getStorageSync('userId')
    uid = app.globalData.userId;
    var newsId = options.itemId;
    var banner = options.banner;
    // that.showLoading()
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this;
    if (app.globalData.didFillinInfo) {
      that.setData({
        needshowInfo: false
      })
    }
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

  showLoading: function () {
    var that = this;
    that.setData({
      loadingHidden: false
    })
  },

  hideLoading: function () {
    var that = this;
    that.setData({
      loadingHidden: true
    })
  },


  commit: function (event) {
    var that = this;
    app.globalData.didFillinInfo = true;
    that.setData({
      needshowInfo: false
    })
  },

  bindKeyInput: function (e) {
    var that = this;
    that.setData({
      inputPhoneNumber: e.detail.value
    })
  },

})
