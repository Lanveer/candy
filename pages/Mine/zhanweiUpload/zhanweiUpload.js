// pages/Mine/qualifyUpload/qualifyUpload.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cover: '',
    Index: 0,
    starTime: '2010-10-10',
    endTime: '2020-10-25',
    items: [
      { name: '1', value: '是' },
      { name: '0', value: '否', checked: 'true' },
    ],
    tags: [
      { name: '0', value: '白酒' },
      { name: '1', value: '啤酒' },
      { name: '2', value: '洋酒' },
      { name: '3', value: '红酒' },
      { name: '4', value: '黄酒' },
      { name: '5', value: '饮料' },
      { name: '6', value: '食品' },
      { name: '7', value: '其他' }
    ]

  },

  onLoad: function (options) {
    var that = this;
    //获取酒店列表
    that.loadHotel();
    //获取用户token
    var userInfo = wx.getStorageSync('userInfo');
    that.setData({
      userInfo: userInfo
    })



  },

  // 选择酒店数据
  hotelPiker(e) {
    var that = this;
    that.setData({
      Index: e.detail.value,
      hotelId: that.data.hotelData[e.detail.value].id
    })
  },

  // 开始时间
  startTime: function (e) {
    var that = this;
    that.setData({
      starTime: e.detail.value
    })
  },
  // 结束时间
  endTime: function (e) {
    var that = this;
    that.setData({
      endTime: e.detail.value
    })
  },

  // 处理标签

  checkboxChange: function (e) {
    var that = this;
    that.setData({
      primary_label: e.detail.value
    })
  },

  // 是否热门
  radioChange: function (e) {
    var that = this;
    that.setData({
      is_hot: e.detail.value
    })
  },

  // 加载酒店数据
  loadHotel: function () {
    var that = this;
    wx.request({
      url: app.globalData.host + 'v2/wechat.exhibition_hotel/index',
      method: 'get',
      data: {
        field: 'name',
        type: 1,
        is_limit:0
      },
      success: function (res) {
        if (res.data.code != 0) {
          wx.showToast({
            title: '获取酒店失败',
          })
        } else {
          console.log(res);
          if (res.data.data.content.length == 0) {
            //处理数据为空的情况
          } else {
            that.setData({
              hotelData: res.data.data.content
            })
          }

        }

      }

    })
  },

  // 处理封面图片上传
  chooseImageTap: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#333",
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
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res);
        wx.showLoading({
          title: '上传中...',
        })
        that.setData({
          cover: res.tempFilePaths[0],
        })
        // 上传
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
              img: obj.data.url
            })
          },
          fail: function () {
            that.setData({
              cover: '',
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

  // 上传展位
  addZhanwei: function (e) {
    var that = this;
    if (e.detail.value.company == '') {
      wx.showModal({
        title: '提示',
        content: '请输入公司名称',
      })
      return false;
    }
    if (e.detail.value.introduce == '') {
      wx.showModal({
        title: '提示',
        content: '请输入公司介绍',
      })
      return false;
    }
    if (e.detail.value.floor == '') {
      wx.showModal({
        title: '提示',
        content: '请输入楼层',
      })
      return false;
    }
    if (e.detail.value.exhibition_code == '') {
      wx.showModal({
        title: '提示',
        content: '请输入展位号',
      })
      return false;
    }
    if (e.detail.value.contact == '') {
      wx.showModal({
        title: '提示',
        content: '请输入联系人',
      })
      return false;
    }

    if (e.detail.value.tel == '') {
      wx.showModal({
        title: '提示',
        content: '请输入联系方式',
      })
      return false;
    }

    if (e.detail.value.address == '') {
      wx.showModal({
        title: '提示',
        content: '请输入地址',
      })
      return false;
    }

    if (that.data.img == undefined) {
      wx.showModal({
        title: '提示',
        content: '请上传一张封面图片',
      })
      return false;
    }

    var params = {
      company: e.detail.value.company,
      introduce: e.detail.value.introduce,
      floor: e.detail.value.floor,
      exhibition_code: e.detail.value.exhibition_code,
      contact: e.detail.value.contact,
      tel: e.detail.value.tel,
      address: e.detail.value.address,
      exhibition_hotel_id: that.data.hotelId == undefined ? that.data.hotelData[0].id : that.data.hotelId,
      token: that.data.userInfo.token,
      primary_label: that.data.primary_label,
      img: that.data.img,
      start_time: that.data.startTime == undefined ? '' : that.data.startTime,
      end_time: that.data.endTime
    }
    // console.log(params)
    // return false;
    wx.request({
      url: app.globalData.host + 'v2/wechat.user/addbooth',
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: params,
      success: function (res) {
        if (res.data.code != 0) {
          wx.showToast({
            title: res.data.msg,
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '上传展位成功！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack(1);
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

  }





})