// app.js
App({
  // url: "http://localhost",
  url: "https://www.safetyeducationexam.top",
  onLaunch: function () {
    var that = this;
    wx.getStorage({
      key: "student",
      success(res) {
        wx.switchTab({
          url: '/pages/homepage/index/index',
          fail() {
              wx.showToast({
                title: '跳转主页面失败',
              })
          }
        })
      },
      fail(res) {
        wx.navigateTo({
          url: '/pages/login/login',
          fail() {
              wx.showToast({
                title: '跳转登录页面失败',
              })
          }
        })
      }
    });
  }
})
