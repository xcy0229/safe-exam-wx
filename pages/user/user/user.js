// pages/user/user.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    studentCode: "",
    studentId: null,
  },

  /**
   * 我的考试
   */
  toMyExam() {
    wx.navigateTo({
      url: '/pages/user/myExam/myExam',
      fail() {
        wx.showToast({
          title: '跳转失败',
        })
      }
    })
  },

  /**
   * 我的收藏
   */
  toMyCollection() {
    var that = this;
    let studentId = that.data.studentId;
    let url = "/pages/homepage/exercise/exercise?type=collect&studentId=" + studentId;
    wx.navigateTo({
      url: url,
      fail() {
        wx.showToast({
          title: '跳转失败',
        })
      }
    })
  },

  /**
   * 我的错题
   */
  toMyMisQuestion() {
    var that = this;
    let studentId = that.data.studentId;
    let url = "/pages/homepage/exercise/exercise?type=mis&studentId=" + studentId;
    wx.navigateTo({
      url: url,
      fail() {
        wx.showToast({
          title: '跳转失败',
        })
      }
    })
  },

  /**
   * 个人设置
   */
  toMySet() {
    let url = "/pages/user/mySet/mySet";
    wx.navigateTo({
      url: url,
      fail() {
        wx.showToast({
          title: '跳转失败',
        })
      }
    })
  },

  /**
   * 退出登录
   */
  logout() {
    console.log("退出登录");
    wx.removeStorage({
      key: 'student',
      success(res) {
        wx.removeStorage({
          key: 'student',
          success(res) {
            wx.reLaunch({
              url: '/pages/login/login',
            });
          },
          fail() {
            wx.showToast({
              title: '退出登录失败',
              icon: 'none'
            })
          }
        });

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: "student",
      success(res) {
        that.setData({
          studentCode: res.data.user_uid,
          studentId: res.data.id,
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