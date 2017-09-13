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
            title: '乱码',
            src1: "../../../images/feed-unchoosed.png",
            src2: '../../../images/feed-choosed.png',
            isChecked: false
        },
        {
            title: '时间不对',
            src1: "../../../images/feed-unchoosed.png",
            src2: '../../../images/feed-choosed.png',
            isChecked: false
        },
        {
            title: '颜色不对',
            src1: "../../../images/feed-unchoosed.png",
            src2: '../../../images/feed-choosed.png',
            isChecked: false
        },
        {
            title: '完全就是错的',
            src1: "../../../images/feed-unchoosed.png",
            src2: '../../../images/feed-choosed.png',
            isChecked: false
        },
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
    // 表单提交

    formSubmit: function (e) {
        var that = this;
        if (!that.data.needshowInfo) {
            console.log('form发生了submit事件，携带数据为：', that.data.chosedContent)
            console.log("suggestions = " + that.data.suggestions)
            console.log("userName = " + that.data.userName)
            console.log("userPhoneNumber = " + that.data.userPhoneNumber)
            var userId = wx.getStorageSync('userId');
            var contentStr = '';

            for (var i = 0; i < that.data.chosedContent.length; i++) {
                contentStr = contentStr + that.data.chosedContent[i] + ',';
            }
            contentStr = contentStr.substring(0, contentStr.length - 1)
            console.log('form发生了submit事件，携带数据为：', contentStr);

            if (that.data.chosedContent == '') {
                wx.showModal({
                    title: '请您勾选选项',
                    content: '',
                    showCancel: false,
                    success: function (res) {
                        if (res.confirm) {
                        }
                    }
                })
                return;
            }

            if (that.data.userName == '') {
                wx.showModal({
                    title: '请您填写姓名',
                    content: '',
                    showCancel: false,
                    success: function (res) {
                        if (res.confirm) {
                        }
                    }
                })
                return;
            }

            if (that.data.userPhoneNumber == '') {
                wx.showModal({
                    title: '请您填写电话号码，我们可能会联系您',
                    content: '',
                    showCancel: false,
                    success: function (res) {
                        if (res.confirm) {
                        }
                    }
                })
                return;
            }

            wx.request({
                url: 'https://min.jiushang.cn/index.php/index/Userapi/feedBack?uid=' + userId,
                data: {
                    user_name: that.data.userName,
                    content: that.data.chosedContent,
                    tel: that.data.userPhoneNumber
                },
                method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                // header: {}, // 设置请求的 header
                success: function (res) {
                    // success
                    console.log(res);
                    wx.showModal({
                        title: '提交成功',
                        content: '',
                        showCancel: false,
                        success: function (res) {
                            wx.navigateBack({
                                delta: 1, // 回退前 delta(默认为1) 页面
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
                            if (res.confirm) {
                            }
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
        } else {
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
            console.log(contentStr)
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
        }


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
        count_down(that);
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
        send_code_countdown(that);
        that.setData({
            isGetCodeEnable: false
        })
        console.log("phone number = " + that.data.inputPhoneNumber)
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
                        if (res.confirm) { }
                    }
                })
            },
            complete: function () {
                // complete
            }
        })
    }
})

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
                needshowInfo: true,
                loadingHidden: true
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