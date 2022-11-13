// pages/user/myExam/myExam.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    examSheet: [],
    studentId: 0,
    test: [
      {
        complete_time: "2021-10-16 15:49:32",
        core: 98,
        exam_paper_id: 11,
        exam_paper_name: "实验室安全教育考试测试卷",
        score: 100,
        start_time: "2021-10-16 14:49:16",
        user_exam_id: 1,
        user_id: 70,
        user_uid: 1,
      }, {
        complete_time: "2021-10-16 15:49:32",
        core: 98,
        exam_paper_id: 11,
        exam_paper_name: "实验室安全教育考试测试卷",
        score: 100,
        start_time: "2021-10-16 14:49:16",
        user_exam_id: 2,
        user_id: 70,
        user_uid: 1,
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var values = wx.getStorageSync('student');
    if (values) {
      that.setData({studentId: values.id});
      wx.request({
        url: app.url + '/mobile/completeList/getExamSheet?id=' + that.data.studentId,
        success(res) {
          if (res.data.flag) {
            that.setData({examSheet: res.data.data});
          } else {
            wx.showToast({
              title: '获取答卷失败',
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
    }
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