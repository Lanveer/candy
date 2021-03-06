// pages/News/News/news.js
var app = getApp();
Page({
  data: {
    identity: '',
    tags: '',
    openid: '',
    codeFlag: true,
    isGetCodeEnable: false,
    timeleft: 60,
    topTabBarData: [
      {
        title: '展会资讯',
        didSelected: true
      },
      {
        title: '展会指南',
        didSelected: false
      }
    ],
    needshowInfo: false,
    currentTapIsHotel: true,
    loadingHidden: true,
    // inputPhoneNumber: '',
    newsData: [

    ],

    swiperData: [],

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
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    count_down(that);
    loadData(that)
    // 取出code信息
    var codeInfo = wx.getStorageSync('codeInfo');
    that.setData({
      codeInfo: codeInfo
    })

    //获取code信息---这里的code需要从新获取
    wx.login({
      success: function (res) {
        console.log(res.code)
        that.setData({
          newCode: res.code
        })
      }
    })

    // 获取推广信息
    var phone = wx.getStorageSync('phone')
    that.setData({
      phone: phone
    })

    // 获取经纬度
    var location = wx.getStorageSync('location');
    that.setData({
      longitude: location.longitude,
      latitude: location.latitude
    })

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

  onShareAppMessage: function () {
    return {
      title: '酒商糖酒会',
      path: 'pages/News/News/news'
    }
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

  // 顶部按钮响应事件
  topBarItemClicked: function (event) {
    var that = this;
    var index = event.currentTarget.dataset.index;
    var obj = {};
    var key = "";
    var condition = false;
    var url = '';
    if (index == 0) {
      that.setData({
        currentTapIsHotel: true
      });
    } else {
      that.setData({
        currentTapIsHotel: false
      });
    }

    currentPage = 1;
    didReachEnd = false;

    for (var i = 0; i < that.data.topTabBarData.length; ++i) {
      key = 'topTabBarData[' + i + '].didSelected';
      if (i == index) {
        condition = true;
      } else {
        condition = false;
      }
      obj[key] = condition;
      that.setData(obj);
    }

    loadData(that)
  },

  // 轮播图点击开始
  topImageClicked: function (event) {
    var that = this;
    var itemId = event.currentTarget.dataset.itemId;
    console.log("itemId = " + itemId);
    wx.navigateTo({
      url: '../Details/singleImageDetail/detail?id=' + itemId + '&indexBaner=' + '1',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  // 轮播图点击结束

  // 置顶资讯点击
  topNewsClicked: function (event) {
    var itemId = event.currentTarget.dataset.itemId;
    wx.navigateTo({
      url: '../Details/singleImageDetail/detail?itemId=' + itemId,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  // 单图模式点击事件
  normalNewsClicked: function (event) {
    var itemId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../Details/singleImageDetail/detail?id=' + itemId + '&indexBaner=' + '2'
    })
  },

  // 多图资讯点击事件
  mutipleNewsClicked: function (event) {
    var itemId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../Details/singleImageDetail/detail?id=' + itemId + '&indexBaner=' + '3',
    })
  },


  // 大图资讯点击事件
  bigNewsClicked: function (event) {
    var itemId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../Details/singleImageDetail/detail?id=' + itemId + '&indexBaner=' + '4',
    })
  },


  // 视频资讯点击事件
  videoNewsClicked: function (event) {
    var itemId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../Details/singleImageDetail/detail?id=' + itemId + '&indexBaner=' + '5'
    })
  },






  // scrollView时间响应函数
  upper: function (event) {
  },

  lower: function (event) {
    var that = this;
    console.log('lower')
    loadMoreData(that);
  },

  scroll: function (event) {

  },


  // 处理身份
  checkboxChange: function (e) {
    var that = this;
    that.setData({
      identity: e.detail.value
    })

  },

  // 处理标签
  tagsChange: function (e) {
    var that = this;
    that.setData({
      tags: e.detail.value
    })
  },

  // 处理悬浮框的数据提交
  regist: function (e) {
    var that = this;
    if (e.detail.value.tel == '') {
      wx.showModal({
        title: '错误',
        content: '电话号码不能为空！',
        showCancel: false,
      })
      return false
    }
    if (e.detail.value.password == '') {
      wx.showModal({
        title: '错误',
        content: '密码不能为空！',
        showCancel: false,
      })
      return false
    }
    // if (e.detail.value.email == '') {
    //   wx.showModal({
    //     title: '错误',
    //     content: '邮箱不能为空！',
    //     showCancel: false,
    //   })
    //   return false
    // }
    if (e.detail.value.code == '') {
      wx.showModal({
        title: '错误',
        content: '验证码不能为空！',
        showCancel: false,
      })
      return false
    }
    if (that.data.identity.length == 0) {
      wx.showModal({
        title: '错误',
        content: '请选择身份',
        showCancel: false,
      })
      return false
    }
    if (that.data.tags.length == 0) {
      wx.showModal({
        title: '错误',
        content: '请至少选择一个标签',
        showCancel: false,
      })
      return false
    }

    var params = {
      nick_name: app.globalData.nick_name,
      tel: e.detail.value.tel,
      password: e.detail.value.password,
      opencode: that.data.newCode,
      header: app.globalData.header,
      code: e.detail.value.code,
      email: e.detail.value.tel + '@jiushang.cn',
      identity: that.data.identity,
      tags: that.data.tags,
      customer_number: e.detail.value.customer_number,
      qrcode: that.data.phone,
      longitude: that.data.longitude,
      latitude: that.data.latitude
    }
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.host + 'v2/wechat.sign/up',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: params,
      success: function (res) {
        wx.hideLoading();
        if (res.data.code != 0) {
          wx.showModal({
            title: '注册失败',
            content: res.data.msg,
            showCancel: false,
            success: function (res) {
              if (res.confirm) { }
            }
          })
        } else {
          wx.showModal({
            title: '注册成功',
            content: '',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                // wx.navigateBack(1);
                  that.setData({
                      needshowInfo: false
                  })
                app.globalData.didFillinInfo = true;
                wx.setStorage({
                  key: 'didFillinInfo',
                  data: true,
                })
              }
            }
          })
        }
      },
      error: function (err) { }
    })
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)

    var userId = wx.getStorageSync('userId');
    userId = app.globalData.userId;
    var contentStr = '';
    var that = this;

    for (var i = 0; i < e.detail.value.checkBoxGroup.length; i++) {
      contentStr = contentStr + e.detail.value.checkBoxGroup[i] + ',';
    }
    contentStr = contentStr.substring(0, contentStr.length - 1)

    // console.log(e.detail.value.userName)
    // console.log(e.detail.value.userPhoneNumber)
    // console.log(e.detail.value.province)
    // console.log(e.detail.value.city)
    // console.log(contentStr)
    // console.log(e.detail.value.serviceCode)
    if (!e.detail.value.serviceCode) {
      that.setData({
        serviceCode: e.detail.value.serviceCode
      })
    }
    var name = e.detail.value.userName;
    var c_number = e.detail.value.serviceCode

    if (name == '') {
      wx.showModal({
        title: '姓名不能为空',
        content: '',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
          }
        }
      })
      return;
    }
    if (e.detail.value.userPhoneNumber == '') {
      wx.showModal({
        title: '电话号码不能为空',
        content: '',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
          }
        }
      })
      return;
    }
    if (e.detail.value.vertifyCode == '') {
      wx.showModal({
        title: '验证码不能为空',
        content: '',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
          }
        }
      })
      return;
    }
    if (e.detail.value.province == '') {
      wx.showModal({
        title: '所在区域不能为空',
        content: '',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
          }
        }
      })
      return;
    }

    if (e.detail.value.city == '') {
      wx.showModal({
        title: '所在城市不能为空',
        content: '',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
          }
        }
      })
      return;
    }

    if (contentStr == '') {
      wx.showModal({
        title: '你想了解的展位不能为空',
        content: '',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
          }
        }
      })
      return;
    }

    that.showLoading();
    wx.request({
      url: 'https://min.jiushang.cn/index.php/index/Userapi/userInfoSave?uid=' + userId,
      data: {
        name: name,
        tel: e.detail.value.userPhoneNumber,
        province: e.detail.value.province,
        city: e.detail.value.city,
        want_know: contentStr,
        customer_number: c_number,
        smgcode: e.detail.value.vertifyCode
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { "Content-Type": "application/x-www-form-urlencoded" }, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res);
        that.hideLoading()
        if (res.statusCode == 200) {
          app.globalData.didFillinInfo = true;
          that.setData({
            needshowInfo: false
          })
          wx.setStorage({
            key: 'didFillinInfo',
            data: true,
            success: function (res) {
              // success
              that.hideLoading();
              wx.showModal({
                title: '提交成功',
                content: '',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                  }
                }
              })
            },
            fail: function () {
              // fail
              that.hideLoading();
              //      wx.showModal({
              //   title: '提交失败',
              //   content: '',
              //   showCancel: false,
              //   success: function (res) {
              //     if (res.confirm) {
              //     }
              //   }
              // })

            },
            complete: function () {
              // complete
              that.hideLoading();
            }
          })

        } else {
          //error
          that.hideLoading();
          var msg = res.data[0]
          wx.showModal({
            title: msg,
            content: '',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
              }
            }
          })

        }
      },
      fail: function () {
        // fail
        //error
        wx.showModal({
          title: '网络错误，请重试',
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


  commit: function (event) {
    var that = this;
    app.globalData.didFillinInfo = true;
    that.setData({
      needshowInfo: false
    })
  },
  bindKeyInput: function (e) {
    var that = this;
    console.log(e.detail.value)
    that.setData({
      inputPhoneNumber: e.detail.value
    })
  },

  // 获取验证码
  getCode: function (event) {
    var that = this;
    var tel = that.data.inputPhoneNumber;
    if (tel != undefined || '') {

      wx.request({
        url: 'https://api.jiushang.cn/api/captcha/register',
        data: {
          phone: that.data.inputPhoneNumber
        },
        method: 'get',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'version': 2
        },
        success: function (res) {
          // success 发送验证码成功
          if (res.data.errCode != 0) {
            wx.showModal({
              title: res.data.msg,
              content: '',
              showCancel: false
            })
          } else {
            send_code_countdown(that);
            that.setData({
              isGetCodeEnable: true,
              codeFlag: false
            })
            wx.showModal({
              title: '验证码发送成功',
              content: '',
              showCancel: false
            })
          }
        },
        fail: function () {
          // fail
          wx.showModal({
            title: '验证码发送失败，请重试',
            content: '',
            showCancel: false,
            success: function (res) {
              if (res.confirm) { }
            }
          })
        },
        complete: function () {
          // complete
        }
      })
    } else {
      wx.showModal({
        title: '电话号码为空',
        content: '',
        showCancel: false,
        success: function (res) {
          if (res.confirm) { }
        }
      })
    }

  },
})

var currentPage = 1
var didReachEnd = false

var count = 60;
function send_code_countdown(that) {
  if (count == 0) {
    count = 60;
    that.setData({
      isGetCodeEnable: false,
      codeFlag: true
    })
    return;
  } else {
    count--;
    that.setData({
      timeleft: count
    })
  }

  setTimeout(function () { send_code_countdown(that) }, 1000)
}

var total_micro_second = 65 * 1000;
var start_time = 65 * 1000;
var timer;
function count_down(that) {
  var h = date_format(total_micro_second);
  // ////console.log(h);
  // if (that.data.currentIndex == 1) {
  //   console.log(h);
  // }
  var minite = h.substring(0, 2);
  var seconds = h.substring(3, 5);
  // 渲染倒计时时钟
  if (parseInt((start_time - total_micro_second) / 1000) == 10) {
    if (that.data.needshowInfo) {
      return;
    }
    if (!that.data.needshowInfo && !app.globalData.didFillinInfo)
      that.setData({
        needshowInfo: true
      })
    console.log('10s');
    clearTimeout(timer);
  }

  timer = setTimeout(function () {
    // 放在最后--
    total_micro_second -= 10;
    count_down(that);
  }, 10)
}

// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
function date_format(micro_second) {
  // 秒数
  var second = Math.floor(micro_second / 1000);
  // 小时位
  var hr = Math.floor(second / 3600);
  // 分钟位
  var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
  // 秒位
  var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
  // 毫秒位，保留2位
  // ////console.log(h);
  // console.log("min = " + min);
  // console.log("sec = " + sec);
  return min + ":" + sec;
}

// 位数不足补零
function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}

function loadData(that) {
  if (that.data.currentTapIsHotel) {
    that.showLoading()
    // 轮播数据获取
    wx.request({
      url: app.globalData.host + "v2/wechat.news/index",
      data: {
        category: 1,
        type: 6
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        if (res.data.data != '' && res.data.data.content.length > 0) {
          that.setData({
            swiperData: res.data.data.content
          })
        } else {

          wx.showToast({
            title: '暂时没有轮播数据',
          })

        }
      },
      fail: function () {

      },
      complete: function () {
        // complete
      }
    })
    // 其他数据获取
    wx.request({
      url: app.globalData.host + "v2/wechat.news/index",
      data: {
        category: 1,
        is_top: 1,
        page: currentPage
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
        if (res.data.data != '' && res.data.data.content.length > 0) {
          that.setData({
            newsData: res.data.data.content
          })
        } else {

          wx.showModal({
            title: '暂时没有数据，小编正在努力中',
            content: '',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
              }
            }
          })

        }
        that.hideLoading();
      },
      fail: function () {
        // fail
        that.hideLoading();
        wx.showModal({
          title: '数据加载失败，请重试',
          content: '',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
            }
          }
        })
      },
      complete: function () {
      }
    })
  } else {
    that.showLoading()
    // 会展攻略轮播数据获取
    wx.request({
      url: app.globalData.host + "v2/wechat.news/index",
      data: {
        category: 2,
        type: 6
      },
      method: 'GET',
      success: function (res) {
        if (res.data.data != '' && res.data.data.content.length > 0) {
          that.setData({
            swiperData: res.data.data.content
          })
        } else {
          wx.showToast({
            title: '暂时没有轮播数据',
          })


        }
      },
      fail: function () {

      },
      complete: function () {
        // complete
      }
    })

    // 会展攻略其他数据获取
    wx.request({
      url: app.globalData.host + "v2/wechat.news/index",
      data: {
        category: 2,
        is_top: 1,
        page: currentPage
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
        if (res.data.data != '' && res.data.data.content.length > 0) {
          that.setData({
            newsData: res.data.data.content
          })
        }
        that.hideLoading()
      },
      fail: function () {
        // fail
        that.hideLoading()
        wx.showModal({
          title: '数据加载失败，请重试',
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
  }
}

function loadMoreData(that) {
  if (that.data.currentTapIsHotel) {
    if (!didReachEnd) {
      currentPage += 1;
      that.showLoading()
      wx.request({
        url: app.globalData.host + "v2/wechat.news/index",
        data: {
          category: 1,
          page: currentPage,
          is_top: 1
        },
        method: 'GET',
        success: function (res) {
          if (res.data.data != '' && res.data.data.content.lenght > 0) {
            console.log(res)
            var totalData = that.data.newsData;
            that.setData({
              newsData: totalData.concat(res.data.data.content)
            })
            if (res.data.data.content.length < 20) {
              didReachEnd = true;
            } else {
              didReachEnd = false;
            }

            // if (res.data.data.content.length > 0) {
            //   var totalData = that.data.newsData
            //   that.setData({
            //     newsData: totalData.concat(res.data.data.content)
            //   })
            // }
          } else {
            var totalData = that.data.newsData;
            that.setData({
              newsData: totalData.concat(res.data.data.content)
            })
            didReachEnd = true;
          }

          that.hideLoading()
        }
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
  } else {
    if (!didReachEnd) {
      currentPage += 1;
      that.showLoading()
      wx.request({
        url: app.globalData.host + "v2/wechat.news/index",
        data: {
          category: 2,
          page: currentPage,
          is_top: 1
        },
        method: 'GET',
        success: function (res) {

          if (res.data.data != '' && res.data.data.content.lenght > 0) {
            console.log(res);
            var totalData = that.data.newsData
            that.setData({
              newsData: totalData.concat(res.data.data.content)
            })
            if (res.data.data.content.length < 20) {
              didReachEnd = true;
            } else {
              didReachEnd = false;
            }

            // if (res.data.data.content.length > 0) {
            //   var totalData = that.data.newsData
            //   that.setData({
            //     newsData: totalData.concat(res.data.data.content)
            //   })
            // }
          } else {
            didReachEnd = true;
            var totalData = that.data.newsData
            that.setData({
              newsData: totalData.concat(res.data.data.content)
            })
          }
          that.hideLoading()
        },
        fail: function () {
          // fail
          that.hideLoading()
          wx.showModal({
            title: '数据加载失败，请重试',
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
      console.log('reach end...')
    }
  }
}