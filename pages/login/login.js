// pages/login/login.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    password: ''
  },

  // 获取输入账号 
  idInput: function (e) {
    this.setData({
      id: e.detail.value
    })
  },

  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  /**
   * 登录
   */
  login() {
    if (this.data.id.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '学号和密码不能为空',
        icon: 'loading',
        duration: 2000
      })
    }
    var student = {
      user_uid: this.data.id,
      password: this.data.password
    };
    let url = app.url + "/mobile/student/login";
    let toIndexUrl = "/pages/homepage/index/index";
    wx.request({
      url: url,
      data: student,
      success(res) {
        if (res.data.flag) {
          wx.setStorage({
            key: "student",
            data: res.data.data.student
          });
          wx.switchTab({
            url: toIndexUrl
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }
      },
      fail(res) {
        console.log(res);
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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