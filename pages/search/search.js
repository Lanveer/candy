// pages/search/search.js
var app = getApp();
Page({
  data: {
    search_hide: true,
    delete_show: false,
    input_show: false,
    inputValue: '',
    showSearchView: true,
    loadingHidden: true,
  },

  input: function (event) {
    var that = this;
    that.setData({
      search_hide: false, input_show: true, delete_show: true,
    })
  },

  back: function (event) {
    var that = this;
    that.setData({
      search_hide: true, input_show: false, delete_show: false,
    })
  },

  bindKeyFocus: function (event) {
    var that = this;
    that.setData({
      showSearchView: true
    })
  },

  bindKeyInput: function (event) {
    var that = this;
    that.setData({
      inputValue: e.detail.value
    });


  },

  //点击搜索
  readyToSearch: function (event) {
    var that = this;
    that.setData({
      search_hide: true, input_show: false, delete_show: false,
      showSearchView: false
    })


    if (that.data.inputValue==''){
      wx.showModal({
        title: '提示',
        content: '请输入关键词',
      })
    }
    that.showLoading();

    wx.request({
      url: app.globalData.host + 'v2/wechat.booth/index',
      data: {
        skw: that.data.inputValue,
      },
      method: 'GET',
      success: function (res) {
        if (res.data.code != 0) {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack(1)
              }
            }
          })
        } else {
          //搜索成功的情况
          var histoty = [];
          var x = wx.getStorageSync('history');
          if (x == '') {
            var x = [];
            var ky = that.data.inputValue;
            x.push(ky);
            wx.setStorageSync('history', x);
          } else {
            x.push(that.data.inputValue);
            wx.setStorageSync('history', x);
          }
          that.setData({
            list_data: res.data.data.content
          })
        }

      },
      fail: function () {
        // fail
        that.hideLoading()
        wx.showModal({
          title: '网络错误',
          content: '',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
            }
          }
        })
      },
      complete: function () {
        that.hideLoading()
      }
    })

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

  onLoad: function (options) {

  
    // 从缓存中取出历史记录
    var that = this;
    var history = wx.getStorageSync('history');
    if (history != '') {

      if(history.length>5){
        history.length=5
      }else{
        history=history
      }
      that.setData({
        history: history
      })
    } else {
      that.setData({
        history: history
      })
    }
    // 获取推荐信息
    wx.request({
      url: app.globalData.host +'v2/wechat.booth/index',
      method:'get',
      data: { hot:1},
      success:function(res){
        if(res.data.code==0 &&res.data.data!=''){
          var list=res.data.data.content;
          that.setData({
            recommend: list
          })
        }

      }
    })



    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
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

  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  //点击历史搜索
  historyClicked: function (event) {
    var keyword = event.currentTarget.dataset.keyword;
    this.setData({
      inputValue: keyword
    })
    var that = this;
    that.setData({
      showSearchView: false
    })
    that.showLoading();
    wx.request({
      url: app.globalData.host + 'v2/wechat.booth/index',
      data: {
        skw: that.data.inputValue
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          list_data: res.data.data.content
        })
        that.hideLoading()
      },
      fail: function () {
        // fail
        that.hideLoading()
        wx.showModal({
          title: '网络错误',
          content: '',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
            }
          }
        })
      },
      complete: function () {
        // complete
      }
    })
  },

  //点击推荐
  recommendClicked: function (event) {
    var that = this;
    var itemId = event.currentTarget.dataset.id;
    that.setData({
      showSearchView: false
    })
    wx.navigateTo({
      url: '../show/show?itemId=' + itemId
    })
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

  // 上拉加载更多
  // scrollView时间响应函数
  upper: function (event) {

  },

  lower: function (event) {
    var that = this;
    that.showLoading()
    if (!didReachEnd) {
      currentPage += 1;
      wx.request({
        url: app.globalData.host + 'v2/wechat.booth/index',
        data: {
          skw: that.data.inputValue,
          page: currentPage
        },
        method: 'GET',
        success: function (res) {
          if (res.data.length < 20) {
            didReachEnd = true;
          } else {
            didReachEnd = false;
          }
          if (res.data.data != '' && res.data.data.content.length > 0) {
            console.log('here')
            var totalData = that.data.list_data
            console.log(res.data.data.content)
            that.setData({
              list_data: totalData.concat(res.data.data.content)
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '没有更多了',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  // wx.navigateBack(1)
                }
              }
            })
          }
          that.hideLoading()
        },
        fail: function () {
          // fail
          that.hideLoading()
          wx.showModal({
            title: '网络错误',
            content: '',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
              }
            }
          })
        },
        complete: function () {
          // complete
          that.hideLoading();
        }
      })
    } else {
      console.log('reach end...')
      that.hideLoading();
    }


  },

  scroll: function (event) {

  },
})

var currentPage = 1
var didReachEnd = false

function search(that, keyword) {
  var uid = wx.getStorageSync('userId')
  uid = app.globalData.userId;
  that.showLoading();
  wx.request({
    url: 'https://min.jiushang.cn/index.php/index/Boothapi/searchBooth',
    data: {
      keyword: that.data.keyword,
      uid: uid
    },
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function (res) {
      // success
      console.log(res)
      that.setData({
        list_data: res.data
      })
      that.hideLoading()
    },
    fail: function () {
      // fail
      that.hideLoading()
      wx.showModal({
        title: '网络错误',
        content: '',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
          }
        }
      })
    },
    complete: function () {
      // complete
      that.hideLoading();
    }
  })
}