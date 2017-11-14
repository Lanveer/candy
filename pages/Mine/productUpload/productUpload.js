// pages/Mine/qualifyUpload/qualifyUpload.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: '',
    detail: '',
    Index: 0
  },

  onLoad: function (options) {
    var that = this;
    // 获取token
    var userInfo = wx.getStorageSync('userInfo');
    that.setData({
      userInfo: userInfo
    })

    // 获取tyoe
    that.getType()

  },

  // 获取选择类型
  typePiker(e) {
    var that = this;
    that.setData({
      Index: e.detail.value,
      cat_id: that.data.typeData[e.detail.value].cat_id,
      goods_type: that.data.typeData[e.detail.value].goods_type,
    })
  },

  // 表单提交
  submit: function (e) {
    var that = this;
    if (that.data.original_img == undefined) {
      wx.showModal({
        title: '提示',
        content: '请上传一张封面图片',
      })
      return;
    }


    if (e.detail.value.goods_name == '') {
      wx.showModal({
        title: '提示',
        content: '请填写产品名字',
      })
      return;
    }
    if (e.detail.value.shop_price == '') {
      wx.showModal({
        title: '提示',
        content: '请填写产品价格',
      })
      return;
    }

    if (e.detail.value.market_price == '') {
      wx.showModal({
        title: '提示',
        content: '请填写市场价格',
      })
      return;
    }

    // add  
    if (e.detail.value.xiangxing == '') {
      wx.showModal({
        title: '提示',
        content: '请填写香型',
      })
      return;
    }

    if (e.detail.value.dushu == '') {
      wx.showModal({
        title: '提示',
        content: '请填写度数',
      })
      return;
    }

    if (e.detail.value.chandi == '') {
      wx.showModal({
        title: '提示',
        content: '请填写产地',
      })
      return;
    }

    if (e.detail.value.jinghanliang == '') {
      wx.showModal({
        title: '提示',
        content: '请填写净含量',
      })
      return;
    }

    if (e.detail.value.changzhi == '') {
      wx.showModal({
        title: '提示',
        content: '请填写厂址',
      })
      return;
    }

    // if (e.detail.value.jieshao == '') {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请填写介绍',
    //   })
    //   return;
    // }
    if (that.data.detail == undefined) {
      wx.showModal({
        title: '提示',
        content: '请上传一张详情图片',
      })
      return;
    }

      var x = [
          {
              "attr_id": 356,
              "attr_value": e.detail.value.xiangxing
          },
          {
              "attr_id": 357,
              "attr_value": e.detail.value.dushu
          },
          {
              "attr_id": 358,
              "attr_value": e.detail.value.jinghanliang
          },
          {
              "attr_id": 360,
              "attr_value": e.detail.value.chandi
          },
          {
              "attr_id": 366,
              "attr_value": e.detail.value.changzhi
          },
      ];
      var y= JSON.stringify(x);

    var params = {
      goods_name: e.detail.value.goods_name,
      shop_price: e.detail.value.shop_price,
      market_price: e.detail.value.market_price,
      original_img: that.data.original_img,
      token: that.data.userInfo.token,
      cat_id: that.data.cat_id,
      goods_type: that.data.goods_type == undefined ? that.data.typeData[0].goods_type : that.data.goods_type,
      //添加的
      goods_attrs: y,
      goods_content_mobile: '<img src=" ' + that.data.detail+' "/>'
    }
    console.log(params)
    return false;
    wx.request({
      url: app.globalData.host + 'v2/wechat.user/addproduct',
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: params,
      success: function (res) {
        if (res.data.code != 0) {
          wx.showToast({
            title: res.data.msg,
          })
        } else {
            console.log(res)
          wx.showModal({
            title: '提示',
            content: '上传成功',
            showCancel:false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack(1)
              }
            }
          })

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


  // 获取产品类型
  getType: function () {
    var that = this;
    wx.request({
      url: app.globalData.host + 'v2/wechat.user/getTypeList',
      method: 'get',
      data: {
        token: that.data.userInfo.token,
      },
      success: function (res) {
        if (res.data.code != 0) {
          wx.showToast({
            title: '获取类型失败',
          })
        } else {
          console.log(res);
          that.setData({
            typeData: res.data.data
          })

        }

      }

    })
  },


  // 封面图片上传
  chooseImageTap: function () {
  
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },
  chooseWxImage: function (type) {
    let that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
          wx.showLoading({
              title: '上传中...',
          })
        that.setData({
          product: res.tempFilePaths[0],
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
              wx.hideLoading()
            var obj = JSON.parse(res.data);
            console.log(obj.data.url)
            that.setData({
              original_img: obj.data.url
            })
          },fali: function () {
            that.setData({
              product: '',
            })
            wx.hideLoading();
            wx.showModal({
              title: '提示',
              content: '网络错误，请重新上传！',
              showCancel: false
            })
          }
        })
      }
    })
  },


  //  详情图片上传

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
          detail: res.tempFilePaths[0],
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
              wx.hideLoading()
            var obj = JSON.parse(res.data);
            console.log(obj.data.url)
            that.setData({
              detail: obj.data.url
            })
          }, fail: function (err) {
            that.setData({
              detail: '',
            })
            wx.hideLoading();
            wx.showModal({
              title: '提示',
              content: '网络错误，请重新上传！',
              showCancel: false
            })
          }
        })
      }
    })
  }





})