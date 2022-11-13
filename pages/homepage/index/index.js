Page({
  data: {
    bannerList: [
      { "imgurl": "https://www.lygtc.edu.cn/images/xiying20da-B.jpg" },
      { "imgurl": "https://www.lygtc.edu.cn/images/0224-XO.jpg" },
      { "imgurl": "https://www.lygtc.edu.cn/images/banners.jpg" },
      { "imgurl": "https://www.lygtc.edu.cn/images/202108181853288326ke.jpg" }],
    studentId: null,
  },

  toExam() {
    let url = "/pages/homepage/exam/exam";
    wx.navigateTo({
      url: url,
      fail() {
        wx.showToast({
          title: '跳转失败',
        })
      }
    })
  },

  toSingleExercise() {
    var that = this;
    let studentId = that.data.studentId;
    let url = "/pages/homepage/exercise/exercise";
    wx.navigateTo({
      url: url + "?type=single&studentId=" + studentId,
      fail() {
        wx.showToast({
          title: '跳转失败',
        })
      }
    })
  },

  toJudgmentExercise() {
    var that = this;
    let studentId = that.data.studentId;
    let url = "/pages/homepage/exercise/exercise";
    wx.navigateTo({
      url: url + "?type=judgment&studentId=" + studentId,
      fail() {
        wx.showToast({
          title: '跳转失败',
        })
      }
    })
  },

  toMultipleExercise() {
    var that = this;
    let studentId = that.data.studentId;
    let url = "/pages/homepage/exercise/exercise";
    wx.navigateTo({
      url: url + "?type=multiple&studentId=" + studentId,
      fail() {
        wx.showToast({
          title: '跳转失败',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    // 获取当前用户id
    wx.getStorage({
      key: "student",
      success(res) {
        that.setData({ studentId: res.data.id });
      }
    });
  },

})