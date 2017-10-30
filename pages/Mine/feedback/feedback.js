// pages/Mine/feedback/feedback.js
var app = getApp();
var util = require('../../../utils/util.js')
Page({
    data: {
        feed: [{
            title: '打不开页面',
            src1: "../../../images/feed-unchoosed.png",
            src2: '../../../images/feed-choosed.png',
            isChecked: false
        },
        {
            title: '看到喜欢的图片如何保存',
            src1: "../../../images/feed-unchoosed.png",
            src2: '../../../images/feed-choosed.png',
            isChecked: false
        },
        {
            title: '推送了不喜欢的资讯',
            src1: "../../../images/feed-unchoosed.png",
            src2: '../../../images/feed-choosed.png',
            isChecked: false
        },
        {
            title: '网络问题',
            src1: "../../../images/feed-unchoosed.png",
            src2: '../../../images/feed-choosed.png',
            isChecked: false
        },
        // {
        //     title: '其他',
        //     src1: "../../../images/feed-unchoosed.png",
        //     src2: '../../../images/feed-choosed.png',
        //     isChecked: false
        // },
            // if unchoosed
        ],
        isOtherCheck: false,
        userName: '',
        userPhoneNumber: '',
        suggestions: '',
        chosedContent: '',
        needshowInfo: false,
        isGetCodeEnable: true,
    },
    // checkbox的选择函数
    checkboxChange: function (e) {
        var that = this;
        that.setData({
            chosedContent: e.detail.value
        })
    },

    // textarea的函数值
    bindTextAreaBlur: function (event) {
        var that = this;
        that.setData({
            suggestions: event.detail.value
        })
    },

    // 表单提交

  formSubmit:function(e){

    var that=this;
    var params={
      // items: that.data.chosedContent.join(),
      // suggestions: that.data.suggestions,
      userName: that.data.userName,
      userPhoneNumber: that.data.userPhoneNumber,
      content: that.data.chosedContent.join().concat(that.data.suggestions)
    };
    console.log(params)
     wx.request({
       url: app.globalData.host +'feedback',
       method:'post',
       data:params,
       success:function(res){
         //处理成功
          if(res.data.code!=0){
            wx.showToast({
              title: '提交反馈失败！',
            })
          }else{
            wx.showModal({
              title: '成功',
              content: '反馈成功！',
              showCancel:false,
              success: function (res) {
                if (res.confirm) {
                  wx.navigateBack()
                }
              }
            })
          }
       },
       fail:function(err){
         //处理失败请求
       },
       complete: function () {

       }
     })

  },

    change_status: function (event) {
        var index = event.target.dataset.index;
        var that = this;
        var key = '';
        var condition = true;
        var obj = {};

        for (var i = 0; i < that.data.feed.length; ++i) {
            key = 'feed[' + i + '].isChecked';
            if (i == index) {
                condition = !that.data.feed[i].isChecked;
                obj[key] = condition;
                that.setData(obj);
                break;
            }

        }
    },

    check_others: function (event) {
        var index = event.target.dataset.index;
        var that = this;
        var status = that.data.isOtherCheck
        that.setData({
            isOtherCheck: !status
        })
    },

    bindNameInput: function (event) {
        var that = this;
        that.setData({
            userName: event.detail.value
        })
    },

    bindPhoneNumberInput: function (event) {
        var that = this;
        that.setData({
            userPhoneNumber: event.detail.value
        })
    },

    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数

        wx.setNavigationBarTitle({
            title: '投诉反馈'
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
    }

})
