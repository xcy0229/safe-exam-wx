// pages/homepage/examComplete/examComplete.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentCode: "",
    core: null,
    time: "",
    accuracy: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.url + '/mobile/completeList/findExamSheetById?id=' + options.id,
      method: "POST",
      success(res) {
        if (res.data.flag) {
          that.setData({
            studentCode: res.data.data.user_uid,
            core: res.data.data.core,
            accuracy: Math.round(res.data.data.core / res.data.data.score * 10000) / 100.00,
            time: that.getTimeDifference(res.data.data.start_time, res.data.data.complete_time)
          });
        } else {
          wx.showToast({
            title: '获取信息失败',
            icon: 'none'
          })
        }
      },
      fail(res) {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        })
      }
    });
  },

  /**
   * 获取时间差
   */
  getTimeDifference(startTime, completeTime) {
    var start = new Date(startTime);
    var end = new Date(completeTime);
    var time = end.getTime() - start.getTime();
    //计算小时差
    var hours = Math.floor(time / (3600 * 1000));
    //计算相差分钟数
    //计算小时数后剩余的毫秒数
    var leave1 = time % (3600 * 1000);
    var minutes = Math.floor(leave1 / (60 * 1000));
    //计算相差秒数
    //计算分钟数后剩余的毫秒数
    var leave2 = leave1 % (60 * 1000);
    var seconds = Math.round(leave2 / 1000);
    return this.addZero(hours) + ":" + this.addZero(minutes) + ":" + this.addZero(seconds);
  },


  /**
 * 小于10的拼接上0字符串
 */
  addZero(s) {
    return s < 10 ? ('0' + s) : s;
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