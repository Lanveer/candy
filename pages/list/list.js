// pages/list/list.js
var app = getApp();
Page({
    data: {
        loadingHidden: true,
        keyword: '',
        needshowInfo: false,
        isGetCodeEnable: true,
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
        currentPage = 1;
        didReachEnd = false;
        var that = this;
        //count_down(that);
        var keyword = options.title;
        that.showLoading();
        that.setData({
            keyword: keyword
        })
        if (keyword == '热门') {
            wx.request({
                url: app.globalData.host + 'v2/wechat.booth/index',
                data: {
                    hot: 1,
                },
                method: 'GET',
                success: function (res) {
                    that.hideLoading();
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
                        that.setData({
                            list_data: res.data.data.content
                        })
                    }
                },
                fail: function () {
                    // fail
                    that.hideLoading();
                    wx.showModal({
                        title: '网络错误，请重新进入',
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
            wx.request({
                url: app.globalData.host + 'v2/wechat.booth/index',
                data: {
                    skw: keyword,
                    limit: 20
                },
                method: 'GET',
                success: function (res) {
                    that.hideLoading();
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
                        console.log(res)
                        that.setData({
                            list_data: res.data.data.content
                        })
                    }
                },
                fail: function () {
                    // fail
                    that.hideLoading();
                    wx.showModal({
                        title: '网络错误，请重新进入',
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


    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
        // currentPage = 1;
        // didReachEnd = false;
        console.log('list OnShow...')
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

    // scrollView时间响应函数
    upper: function (event) {
        console.log('upper')
    },

    lower: function (event) {
        var that = this;
        var keyword = that.data.keyword;
        console.log(that.data.keyword);
        if (keyword=='热门'){
          if (!didReachEnd) {
            that.showLoading();
            currentPage += 1;
            console.log('currentPage = ' + currentPage)
            that.showLoading()
            wx.request({
              url: app.globalData.host + 'v2/wechat.booth/index',
              data: {
                hot: 1,
                page: currentPage
              },
              method: 'GET',
              success: function (res) {

                console.log(res);
                if (res.data.data != '' && res.data.data.content.length < 10) {
                  didReachEnd = true;
                } else {
                  didReachEnd = false;
                }

                if (res.data.data != '' && res.data.data.content.length > 0) {
                  var totalData = that.data.list_data
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
                  title: '加载失败，请重新进入',
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
            console.log('reach end...')
          }
        }else{
          if (!didReachEnd) {
            that.showLoading();
            currentPage += 1;
            console.log('currentPage = ' + currentPage)
            that.showLoading()
            wx.request({
              url: app.globalData.host + 'v2/wechat.booth/index',
              data: {
                skw: keyword,
                page: currentPage,
                limit:20
              },
              method: 'GET',
              success: function (res) {

                console.log(res);
                if (res.data.data != '' && res.data.data.content.length < 10) {
                  didReachEnd = true;
                } else {
                  didReachEnd = false;
                }

                if (res.data.data != '' && res.data.data.content.length > 0) {
                  var totalData = that.data.list_data
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
                  title: '加载失败，请重新进入',
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
            console.log('reach end...')
          }
        }


    },

    list_clicked: function (event) {
        wx.navigateTo({
            url: '../exhibitionPos/exhibitionPos?itemId=' + event.currentTarget.dataset.index,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
        })
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
        that.setData({
            inputPhoneNumber: e.detail.value
        })
    },

    // 获取验证码
    getCode: function (event) {
        var that = this;
        send_code_countdown(that);
        that.setData({
            isGetCodeEnable: false
        })
        wx.request({
            url: 'https://min.jiushang.cn/index.php/index/Userapi/sendMsg',
            data: {
                tel: that.data.inputPhoneNumber
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: { "Content-Type": "application/x-www-form-urlencoded" }, // 设置请求的 header
            success: function (res) {
                // success 发送验证码成功
            },
            fail: function () {
                // fail
                wx.showModal({
                    title: '验证码发送失败，请重试',
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
})

var currentPage = 1
var didReachEnd = false

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
        console.log('10s');
        clearTimeout(timer);
    }

    timer = setTimeout(function () {
        // 放在最后--
        total_micro_second -= 10;
        count_down(that);
    }
        , 10)
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
