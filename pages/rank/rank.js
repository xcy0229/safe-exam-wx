// pages/rank/rank.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    // 结果集合
    rankList: null,
  },

  getRankList() {
    const that = this;
    wx.request({
      url: app.url + "/mobile/rank/getRank",
      header: { 'content-type': 'application/json' },
      method: 'GET',
      success: (res) => {
        // console.log(res);
        if (res.data.flag) {
          let tempRankList = res.data.data;
          that.setData({
            rankList: tempRankList
          });
        } else {
          wx.showToast({
            title: that.data.message,
            icon: 'none'
          })
        }
      },
      fail: (res) => {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        })
      },
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRankList();
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