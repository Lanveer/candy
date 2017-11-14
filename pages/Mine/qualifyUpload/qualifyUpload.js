// pages/Mine/qualifyUpload/qualifyUpload.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    enterPrice: '',
    idcard: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 获取token
    var userInfo = wx.getStorageSync('userInfo');
    that.setData({
      userInfo: userInfo
    })
  },
  // 提交表单
  submit: function (e) {
    var that = this;

    if (that.data.companyLicenceUrl == undefined) {
      wx.showModal({
        title: '提示',
        content: '请上传一张企业营业执照',
      })
      return;
    }

    if (that.data.personCardImageUrl == undefined) {
      wx.showModal({
        title: '提示',
        content: '请上传手持身份证照片',
      })
      return;
    }

//不需要身份证信息
    // if (e.detail.value.cardNum == '' || e.detail.value.cardNum.length < 18) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请按照规则填写身份证',
    //   })
    //   return;
    // }

    if (e.detail.value.companyName == '') {
      wx.showModal({
        title: '提示',
        content: '请填写公司名字',
      })
      return;
    }



    var params = {
      companyName: e.detail.value.companyName,
    //   cardNum: e.detail.value.cardNum,
      token: that.data.userInfo.token,
      companyLicenceUrl: that.data.companyLicenceUrl,
      personCardImageUrl: that.data.personCardImageUrl
    }
 console.log(params)
    wx.request({
      url: app.globalData.host + 'v2/wechat.user/aptitudeauth',
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: params,
      success: function (res) {
        if (res.data.code != 0) {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            success: function (res) {
              if (res.confirm) {
              //  wx.navigateBack(1)
              }
            }
          })

        } else {
            wx.showModal({
                title: '提示',
                content: '恭喜，资质审核成功！',
                showCancel:false,
                success: function (res) {
                    if (res.confirm) {
                        //  wx.navigateBack(1)
                        wx.reLaunch({
                            url: '../Mine/mine',
                        })
                    }
                }
            })

        //   wx.navigateBack(1);
        }
      }

    })

  },

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

  },

  // 营业执照上传
  chooseImageTap1: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage1('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage1('camera')
          }
        }
      }
    })
  },
  chooseWxImage1: function (type) {
    let that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
          wx.showLoading({
              title: '上传中...',
          })
        that.setData({
          enterPrice: res.tempFilePaths[0],
        })
        // 文件上传
        var file = res.tempFilePaths[0]
        wx.uploadFile({
          url: app.globalData.host + 'v2/wechat.user/upload',
          filePath: file,
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          name: 'file',
          formData: {
            'token': that.data.userInfo.token,
            'file': file
          },
          success: function (res) {
              wx.hideLoading();
            var obj = JSON.parse(res.data);
            console.log(obj.data.url)
            that.setData({
              companyLicenceUrl: obj.data.url
            })
          },
          fail:function(err){
            wx.hideLoading();
            that.setData({
              enterPrice: ''
            })
            wx.showModal({
              title: '提示',
              content: '网络错误,请重新上传',
              showCancel:false
            })
          }
        })
      }
    })
  },
  // 上传身份证
  chooseImageTap2: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage2('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage2('camera')
          }
        }
      }
    })
  },
  chooseWxImage2: function (type) {
    let that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
          wx.showLoading({
              title: '上传中...',
          })
        that.setData({
          idcard: res.tempFilePaths[0],
        })
        // 身份证上传
        var file = res.tempFilePaths[0]
        wx.uploadFile({
          url: app.globalData.host + 'v2/wechat.user/upload',
          filePath: file,
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          name: 'file',
          formData: {
            'token': that.data.userInfo.token,
            'file': file
          },
          success: function (res) {
              wx.hideLoading();
            var obj = JSON.parse(res.data);
            console.log(obj.data.url)
            that.setData({
              personCardImageUrl: obj.data.url
            })
          },
          fail: function (err) {
            wx.hideLoading();
            that.setData({
              idcard: ''
            })
            wx.showModal({
              title: '提示',
              content: '网络错误,请重新上传',
              showCancel: false
            })
          }
        })
      }
    })
  }





})
