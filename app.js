//app.js
App({
  onLaunch: function () {
//获取经纬度
    wx.getLocation({
      success: function (res) {
        var location={}
        wx.getSystemInfo({
          success: function(res) {
            var device=res.model;
            location.device=device
          },
        })
        location.latitude = res.latitude;
        location.longitude = res.longitude;
        wx.setStorageSync('location', location);
        wx.request({
          url: that.globalData.host +'v2/wechat.sign/collect',
          method:'post',
          data:location,
          success:function(res){
            console.log(res)
            if(res.data.code!=0){
                //   wx.showModal({
                //     title: '提示',
                //     content: '提交设备信息出错',
                //   })
            }else{
              // 提交设备信息成功
            }
          }
        })
      }
    })


    // 获取code
    wx.login({
      success: function (res) {
        wx.setStorageSync('codeInfo', res.code);
        var opencode = res.code;
        wx.request({
          url: that.globalData.host + 'v2/wechat.sign/in',
          method: 'get',
          data: {
            opencode: opencode
          },
          success: function (res) {
            console.log(res)
            if (res.data.code != 0) {
              that.globalData.didFillinInfo = false;
            } else {
            //   that.globalData.didFillinInfo = false;
              that.globalData.didFillinInfo = true;
              var userInfo = res.data.data;
              wx.setStorageSync('userInfo', userInfo);
            }
          },
          fail:function(err){
            console.log(err)
          }
        })
      }
    })
    //调用API从本地缓存中获取数据
    var that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);



    var didFillinInfo = wx.getStorage({
      key: 'didFillinInfo',
      success: function (res) {
        that.globalData.didFillinInfo = res.data
      }
    })

  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          that.globalData.loginCode = res.code;
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              that.globalData.loginCode = res.code;
              typeof cb == "function" && cb(that.globalData.userInfo);
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    latitude: 12.1,
    longitude: 11,
    didFillinInfo: '',
    needShowFillInfo: false,
    loginCode: 'erfre',
    userId: '',
    header: '',
    nick_name: '',
    open: '',
    // host: "https://tjh.xtype.cn/",
    host: "https://tjh-min.jiushang.cn/"
  },
  show_window: function () {
    // console.log('在这里将调用app中展示函数！')
  },

  // 用户行为方法
  userAct: function (type, name) {
    var userInfo = wx.getStorageSync('userInfo');
    var token = userInfo.token;
    if (userInfo.identity == 1) {
      var user_type = '普通用户'
    } else {
      var user_type = '企业用户'
    }
    var that = this;
    wx.request({
      url: that.globalData.host + '/v2/wechat.action_count/save',
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        type: type,
        name: name,
        phone: userInfo.tel,
        user_type: user_type,
        token: token
      },
      success: function (res) {
      }
    })
  }

})

