// pages/Schedule/Schedule/schedule.js
var app = getApp();

Page({
  data: {
    identity: '',
    tags: '',
    openid: '',
    codeFlag: true,
    isGetCodeEnable: false,
    timeleft: 60,
    //顶部滑动栏的数据， 热门 3月26日 3月27日 3月28日 那个地方的数据
    //对应日期的didSelected要赋值为true，其余为false
    topTabBarData: [
      {
        pageId: "1",
        title: "3月19日",
        didSelected: true
      },
      {
        pageId: "2",
        title: "3月20日",
        didSelected: false
      },
      {
        pageId: "3",
        title: "3月21日",
        didSelected: false
      },
      {
        pageId: "4",
        title: "3月22日",
        didSelected: false
      },
      {
        pageId: "5",
        title: "3月23日",
        didSelected: false
      },
      {
        pageId: "6",
        title: "3月24日",
        didSelected: false
      },
      {
        pageId: "7",
        title: "3月25日",
        didSelected: false
      }
    ],

    scheduleData: [
      // {
      //   imageURL: '../../../images/scheduleTest@2x.png',
      //   imageTitle: '第七届高峰论坛',
      //   title: '索菲亚特大酒店',
      //   guest: '嘉宾：陈先生',
      //   time: '3月24号 9：30',
      //   location: '成都市锦江区人民南路4段',
      //   itemId: '1',           //对应详情页的id
      //   latitude: 30.647470,			//纬度
      //   longitude: 104.068600,			//经度
      // },
      // {
      //   imageURL: '../../../images/scheduleTest@2x.png',
      //   imageTitle: '第七届高峰论坛',
      //   title: '索菲亚特大酒店',
      //   guest: '嘉宾：陈先生',
      //   time: '3月24号 9：30',
      //   location: '成都市锦江区人民南路4段',
      //   itemId: '1',           //对应详情页的id
      //   latitude: 30.647470,			//纬度
      //   longitude: 104.068600,			//经度
      // },
    ],

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

    toView: '1',
    scrollLeft: 0,
    needshowInfo: false,
    windowHeight: 0,
    todayItemId: '',
    loadingHidden: true,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    count_down(that);

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        })
        console.log("屏幕高度: " + res.windowHeight)
      }
    })
    // 获取code信息
    var codeInfo = wx.getStorageSync('codeInfo');
    that.setData({
      codeInfo: codeInfo
    })

    // 获取推广信息
    var phone= options.phone
    that.setData({
      phone:phone
    })



    that.showLoading();
    wx.request({
      url: app.globalData.host +'/v2/wechat.agenda/getDate',
      method: 'GET',
      success: function (res) {
        // success
        console.log(res);
        if (res.data.data.length == 0) {
          wx.showModal({
            title: '暂时没有日期数据，小编正在努力中',
            content: '',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
              }
            }
          })
        }
        that.setData({
          topTabBarData: res.data.data
        })
        for (var i = 0; i < that.data.topTabBarData.length; ++i) {
          var isMe = that.data.topTabBarData[i].didSelected;
          var viewId = that.data.topTabBarData[i].pageId;
          if (isMe == true) {
            that.setData({
              scrollLeft: i * 100,
              toView: viewId
            })
          }
        }

        wx.request({
          url: app.globalData.host + '/v2/wechat.agenda/index',
          data: {
            // cate: that.data.toView,
            page_id:0,
            page: '1'
          },
          method: 'GET', 
          success: function (res) {
            // success
            console.log(res);
            if (res.data.data.length == 0) {
              wx.showModal({
                title: '暂时没有日程数据，小编正在努力中',
                content: '',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                  }
                }
              })
            }
            that.setData({
              scheduleData: res.data.data.content
            })
            that.hideLoading();
          },
          fail: function () {
            // fail
            that.hideLoading();
            wx.showModal({
              title: '获取列表失败，请重试',
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
      fail: function () {
        // fail
        that.hideLoading();
        wx.showModal({
          title: '获取列表失败，请重试',
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
      path: 'pages/Schedule/Schedule/schedule'
    }
  },

  // scrollView时间响应函数
  upper: function (event) {
    console.log('upper')
  },

  lower: function (event) {
    var that = this;
    console.log('lower')
    if (isHotNews) {
      if (!didReachEnd) {
        currentPage += 1;
        that.showLoading()
        wx.request({
          url: app.globalData.host + '/v2/wechat.agenda/index',
          data: {
            cate: that.data.toView,
            page: currentPage,
            hot: '1'
          },
          method: 'GET', 
          success: function (res) {
            // success
            console.log('wedwede:'+res);
            if (res.data.length < 20) {
              didReachEnd = true;
            } else {
              didReachEnd = false;
            }

            if (res.data.length > 0) {
              var totalData = that.data.scheduleData
              that.setData({
                scheduleData: totalData.concat(res.data)
              })
            }
            that.hideLoading()
          },
          fail: function () {
            // fail
            that.hideLoading()
            wx.showModal({
              title: '加载失败，请重试',
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
    } else {
      if (!didReachEnd) {
        currentPage += 1;
        that.showLoading();
        wx.request({
          url: app.globalData.host + '/v2/wechat.agenda/index',
          data: {
            // cate: that.data.toView,
            page: currentPage
          },
          method: 'GET',
          success: function (res) {
            // success
            console.log(res);
            if (res.data.data.length < 20) {
              didReachEnd = true;
            } else {
              didReachEnd = false;
            }

            if (res.data.data.length > 0) {
              var totalData = that.data.scheduleData
              that.setData({
                scheduleData: totalData.concat(res.data.data)
              })
            }
            that.hideLoading()
          },
          fail: function () {
            // fail
            that.hideLoading()
            wx.showModal({
              title: '加载失败，请重试',
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
    }
  },

  scroll: function (event) {

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

  // 日期选择响应函数
  topBarItemClicked: function (event) {
    var that = this;
    var index = event.currentTarget.dataset.index;
    var key = '';
    var condition = true;
    var obj = {};
    var itemId;
    isHotNews = false

    for (var i = 0; i < that.data.topTabBarData.length; ++i) {
      key = 'topTabBarData[' + i + '].didSelected';
      if (i == index) {
        condition = true;
        itemId = that.data.topTabBarData[i].pageId;
        that.setData({
          toView: itemId
        })
      } else {
        condition = false;
      }
      obj[key] = condition;
      that.setData(obj);
    }

    currentPage = 1;
    didReachEnd = false
    that.showLoading()
    wx.request({
      url: app.globalData.host + '/v2/wechat.agenda/index',
      data: {
        page_id: that.data.toView
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        if (res.data.data.length == 0) {
          wx.showModal({
            title: '当前日程暂无数据，小编正在努力中',
            content: '',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
              }
            }
          })
        }else{
          that.setData({
            scheduleData: res.data.data.content
          })
        }
        that.hideLoading();
      },
      fail: function () {
        // fail
        that.hideLoading();
        wx.showModal({
          title: '加载失败，请重试',
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

  // 日程cell点击事件
  cellItemClicked: function (event) {
    var that = this;
    var cellId = event.currentTarget.dataset.itemId;
    wx.navigateTo({
      url: '../DetailPage/detailPage?itemId=' + cellId
    })
  },

  locationClicked: function (event) {
    var that = this;
    var lat = event.currentTarget.dataset.lat;
    var lng = event.currentTarget.dataset.lng;
    var name = event.currentTarget.dataset.name;
    var location = event.currentTarget.dataset.location;

    wx.openLocation({
      latitude: lat, // 纬度，范围为-90~90，负数表示南纬
      longitude: lng, // 经度，范围为-180~180，负数表示西经
      scale: 28, // 缩放比例
      name: name, // 位置名
      address: location, // 地址的详细说明
      success: function (res) {
        // success
        console.log("success...")
      },
      fail: function () {
        // fail
        console.log("fail...")
      },
      complete: function () {
        // complete
      }
    })
  },

  // 热门点击事件
  hotTopBarItemClick: function (event) {
    var that = this;
    var key = '';
    var condition = true;
    var obj = {};
    var todayId = that.data.toView;
    isHotNews = true;
    currentPage = 1;
    didReachEnd = false;

    for (var i = 0; i < that.data.topTabBarData.length; ++i) {
      key = 'topTabBarData[' + i + '].didSelected';
      condition = false;
      obj[key] = condition;
      that.setData(obj);
    }

    that.showLoading()
    wx.request({
      url: app.globalData.host + '/v2/wechat.agenda/index',
      data: {
        cate: todayId,
        hot: '1',
        page_id: '0'
      },
      method: 'GET', 
      success: function (res) {
        if(res.data.code!=0){

        }else{
          console.log(res)
          that.setData({
            scheduleData: res.data.data.content
          })
        }
  
        // }topBarItemClicked
        that.hideLoading()
      },
      fail: function () {
        // fail
        that.hideLoading()
        wx.showModal({
          title: '加载失败，请重试',
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

  // 提交信息
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


// 添加的弹框信息处理开始


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
    if (e.detail.value.email == '') {
      wx.showModal({
        title: '错误',
        content: '邮箱不能为空！',
        showCancel: false,
      })
      return false
    }
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
      opencode: that.data.codeInfo,
      header: app.globalData.header,
      code: e.detail.value.code,
      email: e.detail.value.email,
      identity: that.data.identity.join(),
      tags: that.data.tags,
      customer_number: e.detail.value.customer_number,
      qrcode:that.data.phone
    }
    wx.request({
      url: app.globalData.host + 'v2/wechat.sign/up',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: params,
      success: function (res) {
        console.log(res)
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
                wx.navigateBack(1);
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



// 添加的弹窗信息处理结束













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
              // wx.showModal({
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
          var msg = res.data[0]
          that.hideLoading();
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
})

var currentPage = 1
var didReachEnd = false
var isHotNews = false

var count = 60;
function send_code_countdown(that) {
  if (count == 0) {
    count = 60;
    that.setData({
      isGetCodeEnable: true
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
    clearTimeout(timer);
  }

  timer = setTimeout(function () {
    // 放在最后--
    total_micro_second -= 10;
    count_down(that);
  }, 2)
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