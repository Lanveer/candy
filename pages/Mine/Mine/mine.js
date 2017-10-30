// pages/Mine/Mine/mine.js
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
    person:'',
    enterprice:'',
    userHeader: '',
    userNick: "",
    showInfo: false,
    needshowInfo: false,
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
    var that = this;
    count_down(that);
    that.hideLoading()
    // 获取用户信息
    var userInfo = wx.getStorageSync('userInfo');
    that.setData({
      userInfo: userInfo
    })
    //获取code信息---这里的code需要从新获取
    wx.login({
      success: function (res) {
        console.log(res.code)
        that.setData({
          codeInfo: res.code
        })
      }
    })

    //获取用户信息
    wx.request({
      url: app.globalData.host + 'v2/wechat.user/info',
      method: 'GET',
      data:{
        token: that.data.userInfo.token
      },
      success: function (res) {
        if (res.data.code != 0) {
        } else {
          var identity = res.data.data.identity;
          var validated=res.data.data.validated;
          that.setData({
            validated:validated
          })
          if (identity == 1) {
            // 这里处理个人
            that.setData({
              person:false
            })
          } else if (identity == 2) {
            // 这里处理企业
            that.setData({
              person: true
            })
          }
        }
      },
      error: function (err) { }
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

  zhanweiupload:function(){
    var that=this;
    if(that.data.validated==0){
      wx.showModal({
        title: '提示',
        content: '你还没有通过资质审核！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.navigateBack(1)
          }
        }
      })
    }else{
      wx.navigateTo({
        url: '../zhanweiUpload/zhanweiUpload',
      })
    }
  },
  // 处理身份
  // checkboxChange: function (e) {
  //   var that = this;
  //   that.setData({
  //     identity: e.detail.value
  //   })
  // },

  // 处理标签
  // tagsChange: function (e) {
  //   var that = this;
  //   that.setData({
  //     tags: e.detail.value
  //   })
  // },


  // 处理悬浮框的数据提交
  login: function (e) {
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

    var params = {
      tel: e.detail.value.tel,
      password: e.detail.value.password,
      opencode: that.data.codeInfo,
    }
    console.log(params)
    wx.request({
      url: app.globalData.host + 'v2/wechat.sign/inCell',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: params,
      success: function (res) {
        console.log(res)
        if (res.data.code != 0) {
          wx.showModal({
            title: '登录失败!',
            content: res.data.msg,
            showCancel: false,
            success: function (res) {
              if (res.confirm) { }
            }
          })
        } else {
          wx.showModal({
            title: '登录成功!',
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
  


})

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
