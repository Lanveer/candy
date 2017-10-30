// pages/Exhibition/Exhibition/exhibition.js

var app = getApp();
var util = require('../../../utils/util.js')

Page({
  data: {
    identity: '',
    tags: '',
    openid: '',
    codeFlag: true,
    isGetCodeEnable: false,
    timeleft: 60,

    loadingHidden: true,
    banner: '',
    usercode: '',
    userNick: '',
    userHeader: '',
    userLat: '',
    userLng: '',
    userFillIn: false,
    feed: [{
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
    headerData: [{
      title: '热门',
      imageURL: '../../../images/hot@2x.png',
      itemId: '1'
    },
    {
      title: '白酒',
      imageURL: '../../../images/white@2x.png',
      itemId: '2'
    },
    {
      title: '红酒',
      imageURL: '../../../images/wine@2x.png',
      itemId: '3'
    },
    {
      title: '洋酒',
      imageURL: '../../../images/whisky@2x.png',
      itemId: '4'
    },
    {
      title: '啤酒',
      imageURL: '../../../images/beer@2x.png',
      itemId: '5'
    }
    ],

    middleTabBarData: [{
      title: '酒店',
      didSelected: true
    },
    {
      title: '展馆',
      didSelected: false
    }
    ],
    currentTapIsHotel: true,
    currentTap: 0,
    maxTap: 2,
    needshowInfo: false,
    hotelData: [
      // {
      //   isSinglePic: true,              //标识是否是单图的
      //   backImageURL: '../../../images/jinjiang.png',           //背景图片URL
      //   imageURL: '../../../images/jinjiang.png',                //酒店图片URL
      //   introduce: '锦江宾馆是西南地区第一家五星级酒店，位于市中心锦江地铁口，交通极其便利。随着贵宾楼与锦苑楼在会期的开放使用，加上传统的南楼、东楼、北楼、西楼布展区域，可谓布展企业最多，人气最旺的酒类标杆酒店。传统布展区域1-2楼为展厅区域，2-8楼为房间，9楼为包房展厅，贵宾楼1-3楼为展厅区域，其中3楼规划有红酒专区，6-18为房间区域',  //酒店介绍
      //   distance: '2333',               //酒店距当前定位的距离
      //   title: '锦江宾馆',          //酒店名称
      //   location: '成都人民南路二段80号',     //酒店地址
      //   latitude: 30.648210,			//纬度
      //   longitude: 104.068600,			//经度
      //   id:''
      // },
      // {
      //   isSinglePic: false,             //标识是否是单图的
      //   backImageURL: '../../../images/infoImage@2x.png',           //背景图URL
      //   contents: [                     //因为不是单图的，所以会有几个酒店内容
      //     {
      //       imageURL: '../../../images/infoImage@2x.png',
      //       title: '索菲亚特大酒店',
      //       location: '成都市滨江中路15号',
      //       latitude: 30.647470,			//纬度
      //       longitude: 104.068600,			//经度
      //       id:''
      //     },
      //   ],
      // }
    ],

    exceptionData: [
      // {
      //   isSinglePic: true,              //标识是否是单图的
      //   backImageURL: '../../../images/infoImage@2x.png',           //背景图片URL
      //   imageURL: '../../../images/infoImage@2x.png',                //酒店图片URL
      //   introduce: '世纪城国际展览中心....',  //酒店介绍
      //   distance: '2333',               //酒店距当前定位的距离
      //   title: '世纪城国际展览中心',          //酒店名称
      //   location: '武侯区世纪城路198号',     //酒店地址
      //   latitude: 30.55456,			//纬度
      //   longitude: 104.075140,			//经度
      //   id:''
      // }
    ],
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var str = that.data.testData;
    count_down(that);

    app.getUserInfo();
    //获取code信息
    var codeInfo = wx.getStorageSync('codeInfo');
    that.setData({
      codeInfo: codeInfo
    })

// 获取推广信息
var phone=options.phone;
that.setData({
  phone:phone
})

    wx.request({
      url: app.globalData.host + 'v2/wechat.exhibition_hotel/index',
      method: 'GET',
      success: function (res) {

        that.hideLoading()
      },
      fail: function () {
        // fail
        that.hideLoading();
        wx.showModal({
          title: '网络错误',
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
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        // success
        that.setData({
          userLat: res.latitude,
          userLng: res.longitude
        })
        app.globalData.latitude = res.latitude;
        app.globalData.longitude = res.longitude;

      },
      fail: function () {
        // fail
        that.hideLoading()
        wx.showModal({
          title: '用户信息读取权限错误，请删除小程序后重新扫描二维码或搜索酒商糖酒会进入小程序并允许获取用户数据',
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
  },

  onReady: function () {
    // 页面渲染完成
    app.show_window()
  },
  onShow: function () {
    // 页面显示
    //存储用户经纬度
    var that = this;
    var count = that.data.hotelData.length;
    // 处理字数过多
    wx.getUserInfo({
      success: function (res) {
        app.globalData.header = res.userInfo.avatarUrl;
        app.globalData.nick_name = res.userInfo.nickName
        console.log(app.globalData.header)
      }
    });

    if (app.globalData.didFillinInfo) {
      that.setData({
        needshowInfo: false
      })
    }
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        app.globalData.latitude = res.latitude;
        app.globalData.longitude = res.longitude;
        that.setData({
          userLat: res.latitude,
          userLng: res.longitude
        })
      },
      fail: function () {
        // fail
        wx.showModal({
          title: '提示',
          content: '请允许程序获取定位，否则不能正确显示距离',
          success: function (res) {
            if (res.confirm) {
              // console.log('用户点击确定')
            }
          }
        })
      },
      complete: function () {
        // complete
      }
    })

    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        // success
        that.setData({
          userLat: res.latitude,
          userLng: res.longitude
        })
        app.globalData.latitude = res.latitude;
        app.globalData.longitude = res.longitude;
        that.showLoading()
        wx.request({
          // url: 'http://tjh.xtype.cn/exhibitionHotel',
          url: app.globalData.host + '/v2/wechat.exhibition_hotel/index',
          method: 'GET',
          data: {
            type: 1,
            is_limit:0
          },
          success: function (res) {
            // success
            // console.log(res.data.data.content)
            that.setData({
              hotelData: res.data.data.content
            })

            for (var i = 0; i < that.data.hotelData.length; ++i) {

              var str = that.data.hotelData[i].address;
              var key = 'hotelData[' + i + '].address';
              var obj = {};
              if (str.length > 6) {
                str = str.substr(0, 6) + "...";
              }
              obj[key] = str;
              that.setData(obj);
            }

            // that.hideLoading()
          },
          fail: function () {
            // fail
            console.log('failed')
            that.hideLoading()
            wx.showModal({
              title: '酒店数据错误，请重新进入',
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
        wx.request({
          // url: 'http://tjh.xtype.cn/exhibitionHotel',
          url: app.globalData.host + '/v2/wechat.exhibition_hotel/index',
          data: {
            type: 2,
            is_limit: 1,
            limit: 1
          },
          method: 'GET',
          success: function (res) {
            // success
            console.log(res)

            if (res.data.data.content) {
              that.setData({
                exceptionData: res.data.data.content[0]
              })
            } else {
              that.setData({
                exceptionData: ""
              })
            }


            that.hideLoading()
          },
          fail: function () {
            // fail
            console.log('failed')
            that.hideLoading()
            wx.showModal({
              title: '酒店数据错误，请重新进入',
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
      },
      fail: function () {

        that.hideLoading()
      },
      complete: function () {
        that.hideLoading()

      }
    })
    wx.request({
      // url: 'http://tjh.xtype.cn/news',
      url: app.globalData.host + 'v2/wechat.news/index',
      data: {
        category: 3
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data.data.content)
        if (res.data.data.content) {
          that.setData({
            banner: res.data.data.content
          })
        } else {
          that.setData({
            banner: ""
          })
        }


        that.hideLoading()
      },
      fail: function () {
        // fail
        console.log('failed')
        //that.hideLoading()
        wx.showModal({
          title: '酒店数据错误，请重新进入',
          content: '',
          showCancel: false,
          success: function (res) {
            if (res.confirm) { }
          }
        })
      },
      complete: function () {
        // complete
        console.log('complete')
      }
    })

  },
  bannerTap: function (e) {
    var id = e.currentTarget.dataset.id;
    // wx.showShareMenu({
    //     withShareTicket: true
    // })
    // wx.chooseAddress({
    //     success: function (res) {
    //         console.log(res.userName)
    //         console.log(res.postalCode)
    //         console.log(res.provinceName)
    //         console.log(res.cityName)
    //         console.log(res.countyName)
    //         console.log(res.detailInfo)
    //         console.log(res.nationalCode)
    //         console.log(res.telNumber)
    //     }
    // })
    wx.navigateTo({
      url: '../../News/Details/singleImageDetail/detail?id=' + id + '&indexBaner=' + '0',
    })
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
      path: 'pages/Exhibition/Exhibition/exhibition'
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

  // 点击酒店 - 展馆 切换
  middleBarItemClicked: function (event) {
    var that = this;
    var index = event.currentTarget.dataset.index;
    var obj = {};
    var key = "";
    var condition = false;
    var url = '';
    console.log("index == " + index);
    if (index == 0) {
      that.setData({
        currentTapIsHotel: true
      });
    } else {
      that.setData({
        currentTapIsHotel: false
      });
    }

    for (var i = 0; i < that.data.middleTabBarData.length; ++i) {
      key = 'middleTabBarData[' + i + '].didSelected';
      if (i == index) {
        condition = true;
      } else {
        condition = false;
      }
      obj[key] = condition;
      that.setData(obj);
    }

    var typeStr = '1';
    // return;
    that.uploadLocation();
    if (index == 0) {
      that.showLoading()
      typeStr = '1';
      wx.request({
        url: 'https://min.jiushang.cn/index.php/index/Exhibitionhotelapi/showHotel',
        data: {
          type: typeStr,
          lat: that.data.userLat,
          lng: that.data.userLng
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          // success
          that.setData({
            hotelData: res.data
          })
          var tempData = res.data;
          for (var i = 0; i < tempData.length; ++i) {
            if (that.data.hotelData[i].isSinglePic) {
              var str = that.data.hotelData[i].introduce;
              var key = 'hotelData[' + i + '].introduce';
              var obj = {};
              if (str.length > 87) {
                str = str.substr(0, 87) + "...";
              }
              obj[key] = str;
              that.setData(obj);
            }
          }
          console.log(that.data.hotelData);
          that.hideLoading()
        },
        fail: function () {
          // fail
          console.log('failed')
          that.hideLoading()
          wx.showModal({
            title: '酒店数据错误，请重新进入',
            content: '',
            showCancel: false,
            success: function (res) {
              if (res.confirm) { }
            }
          })
        },
        complete: function () {
          // complete
          console.log('complete')
          that.hideLoading()
        }
      })
    } else {
      typeStr = '2';
      that.showLoading()
      //that.hideLoading()
      //test
      //return;
      wx.request({
        url: 'https://min.jiushang.cn/index.php/index/Exhibitionhotelapi/showHotel',
        data: {
          type: typeStr,
          lat: that.data.userLat,
          lng: that.data.userLng
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          // success
          that.setData({
            exceptionData: res.data
          })
          var tempData = res.data;
          for (var i = 0; i < tempData.length; ++i) {
            var str = that.data.exceptionData[i].introduce;
            var key = 'exceptionData[' + i + '].introduce';
            var obj = {};
            if (str.length > 87) {
              str = str.substr(0, 87) + "...";
            }
            obj[key] = str;
            that.setData(obj);
          }
          console.log(that.data.exceptionData);
          that.hideLoading()
        },
        fail: function () {
          // fail
          console.log('failed')
          that.hideLoading()
          wx.showModal({
            title: '展馆数据错误，请重新进入',
            content: '',
            showCancel: false,
            success: function (res) {
              if (res.confirm) { }
            }
          })
        },
        complete: function () {
          // complete
          console.log('complete')
          that.hideLoading()
        }
      })
    }

  },

  // 点击左右箭头
  leftArrowClicked: function (event) {
    var that = this;
    var localMaxTap = that.data.maxTap;
    var localCurrentTap = that.data.currentTap;
    if (0 < localCurrentTap) {
      localCurrentTap -= 1;
    }
    that.setData({
      currentTap: localCurrentTap
    })
  },

  rightArrowClicked: function (event) {
    var that = this;
    var localMaxTap = that.data.maxTap;
    var localCurrentTap = that.data.currentTap;
    if (localCurrentTap < localMaxTap) {
      localCurrentTap += 1;
    }
    that.setData({
      currentTap: localCurrentTap
    })
  },

  // 滑动swiper
  bindChange: function (event) {

    var that = this;
    that.setData({
      currentTab: event.detail.current
    });

  },

  // 点击搜索栏
  searchBarClicked: function (event) {
    wx.navigateTo({
      url: '../../search/search',
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

  // 点击分类
  headerClick: function (event) {
    var that = this;
    var index = event.currentTarget.dataset.index;
    var title = event.currentTarget.dataset.title;
    that.uploadLocation();
    wx.navigateTo({
      url: '../../list/list?index=' + index + '&title=' + title,
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

  // 点击酒店大图
  bigHotelClicked: function (event) {
    var name = event.currentTarget.dataset.name;
    // 用户行为统计
    app.userAct('酒店', name)
    var that = this;
    var itemId = event.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../../show/show?itemId=' + itemId,
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

    console.log(app.globalData.userInfo)
    console.log(app.globalData.loginCode)
  },

  // 点击酒店大图的地址
  locationClicked: function (event) {
    var that = this;
    var index = event.currentTarget.dataset.index;
    var lat = parseFloat(event.currentTarget.dataset.lat);
    var lng = parseFloat(event.currentTarget.dataset.lng);
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

  // 点击展馆大图
  bigExhibitionClicked: function (event) {
    var name = event.currentTarget.dataset.name;
    // 用户行为统计
    app.userAct('展馆', name)
    var that = this;
    var itemId = event.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../../showHouse/showHouse?itemId=' + itemId,
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

  // 点击酒店多图
  smallHotelClicked: function (event) {
    var that = this;
    var itemId = event.currentTarget.dataset.itemId;
    wx.navigateTo({
      url: '../../show/show?itemId=' + itemId,
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

  // 点击酒店多图的地址
  smallLocationClicked: function (event) {
    var that = this;
    // var index = event.currentTarget.dataset.index;
    var lat = parseFloat(event.currentTarget.dataset.lat);
    var lng = parseFloat(event.currentTarget.dataset.lng);
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
          if (res.confirm) { }
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
          if (res.confirm) { }
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
          if (res.confirm) { }
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
          if (res.confirm) { }
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
          if (res.confirm) { }
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
          if (res.confirm) { }
        }
      })
      return;
    }

    that.showLoading();
    that.uploadLocation();
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
              that.setData({
                needshowInfo: false
              })
              wx.showModal({
                title: '提交成功',
                content: '',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) { }
                }
              })
            },
            fail: function () {
              // fail
              that.hideLoading();
              //error
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
          var msg = res.data;
          that.hideLoading();
          wx.showModal({
            title: msg[0],
            content: '',
            showCancel: false,
            success: function (res) {
              if (res.confirm) { }
            }
          })

        }
      },
      fail: function (res) {
        // fail

        that.hideLoading();
        wx.showModal({
          title: '网络错误，请重试',
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
    console.log("phone number 111= " + that.data.inputPhoneNumber)
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
          console.log(res)
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

  uploadLocation: function () {
    var that = this;
    wx.request({
      url: 'https://min.jiushang.cn/index.php/index/Indexapi/saveDestination',
      data: {
        uid: app.globalData.userId,
        lat: that.data.userLat,
        lng: that.data.userLng
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
})

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
        needshowInfo: true,
        loadingHidden: true
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
  var sec = fill_zero_prefix((second - hr * 3600 - min * 60)); // equal to => var sec = second % 60;
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