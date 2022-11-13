// pages/user/mySet/mySet.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_name: null,
    real_name: null,
    sex: null,
    age: null,
    phone: null,
    password: null,
    student: {
      id: null,
      image_path: null,
      phone: null,
      real_name: null,
      sex: null,
      age: null,
      user_name: null,
      user_uid: null,
      password: null,
    },
    show: false,
  },

  /**
   * 显示遮罩层修改学生信息
   */
  update() {
    const that = this;
    that.setData({
      user_name: that.data.student.user_name,
      real_name: that.data.student.real_name,
      sex: that.data.student.sex,
      age: that.data.student.age,
      phone: that.data.student.phone,
      password: that.data.student.password,
      show: true,
    });
  },

  /**
   * 修改student信息
   */
  toUpdate() {
    const that = this;
    that.setData({
      show: false,
    });
    let url = app.url + "/mobile/student/update";
    let tempStudent = this.data.student;
    if (tempStudent.sex == "男") {
      tempStudent.sex = 1;
    }
    if (tempStudent.sex == "女") {
      tempStudent.sex = 2;
    }
    wx.request({
      url: url,
      data: tempStudent,
      header: { 'content-type': 'application/json' },
      method: 'POST',
      dataType: 'json',
      success(res) {
        wx.removeStorage({
          key: 'student',
          success() {
            wx.removeStorage({
              key: 'student',
              success() {
                wx.reLaunch({
                  url: '/pages/login/login',
                });
              },
            });
          }
        });
      },
      fail(res) {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        })
      }
    })
  },

  /**
   * 双向数据绑定
   */
  onClick() {
    let tempStudent = this.data.student;
    tempStudent.user_name = this.data.user_name;
    tempStudent.real_name = this.data.real_name;
    tempStudent.sex = this.data.sex != null ? (this.data.sex == "男" ? 1 : 2) : null;
    tempStudent.age = this.data.age;
    tempStudent.phone = this.data.phone;
    tempStudent.password = this.data.password;
    this.setData({
      student: tempStudent,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let tempStudent = that.data.student;
    wx.getStorage({
      key: "student",
      success(res) {
        tempStudent.id = res.data.id;
        tempStudent.image_path = res.data.image_path;
        tempStudent.phone = res.data.phone;
        tempStudent.real_name = res.data.real_name;
        tempStudent.sex = res.data.sex != null ? (1 ? "男" : "女") : null;
        tempStudent.age = res.data.age;
        // 用户名
        tempStudent.user_name = res.data.user_name;
        tempStudent.user_uid = res.data.user_uid;
        that.setData({
          student: tempStudent,
        });
      }
    });
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