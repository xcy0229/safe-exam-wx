// pages/homepage/exercise/exercise.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 页面索引
    index: 1,
    // 题目索引
    currentIndex: 0,
    // 总记录数
    total: 0,
    // 是否收藏
    isStarted: false,
    // 题目集合
    questionList: null,
    // 当前页面要展示的题目
    question: null,
    // 获取题目集合的链接
    getQuestionUrl: null,
    // 分页条件
    pagination: {
      currentPage: 1,
      pageSize: 100
    },
    // 收藏信息
    collect: {
      student_id: null,
      question_type: null,
      question_id: null,
    },
  },

  /**
   * 获取试题
   */
  getList() {
    const that = this;
    wx.request({
      url: that.data.getQuestionUrl,
      data: that.data.pagination,
      header: { 'content-type': 'application/json' },
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        // console.log(res);
        if (res.data.flag) {
          const questionList = res.data.data.question;
          // console.log(questionList);
          const total = res.data.data.total;
          const question = questionList[that.data.currentIndex];

          that.setData({
            questionList,
            total,
            question,
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
   * 获取用户的答案
   * @param {*} selectedValue 
   * @param {*} tempQuestion 
   * @returns 
   */
  collectAnswer(selectedValue, tempQuestion) {
    if ("multiple" === tempQuestion.type) {
      let currentAnswer = tempQuestion.userAnswer || [];
      if (currentAnswer.includes(selectedValue)) {
        currentAnswer.splice(currentAnswer.indexOf(selectedValue), 1)
      } else {
        currentAnswer.push(selectedValue)
      }
      return currentAnswer.sort();
    } else if (tempQuestion.type === "single" || "judgment") {
      return [selectedValue];
    }
  },

  /**
   * 选项点击事件
   * @param {*} event 
   * @returns 
   */
  onItemClick(event) {
    // console.log(event);
    // 获取用户选择的答案
    const selectedValue = event.target.dataset.value;

    // 获取本题的所有信息
    let tempQuestion = this.data.question;
    // console.log(tempQuestion.showAnswer);
    if (tempQuestion.showAnswer) {
      wx.showToast({
        title: '已经看过答案，不能修改选项',
        icon: 'none'
      });
      return;
    }

    tempQuestion.userAnswer = this.collectAnswer(selectedValue, tempQuestion);
    // console.log(tempQuestion.userAnswer);

    this.setData({
      question: tempQuestion,
    });

  },

  /**
   * 对答案功能
   */
  onShowAnswer() {
    let tempQuestion = this.data.question;
    tempQuestion.showAnswer = true;
    tempQuestion.userAnswer = tempQuestion.userAnswer.join("");
    this.setData({
      question: tempQuestion,
    })
  },

  /**
   * 上一页
   * @returns 
   */
  goPrev() {
    const that = this;
    const newIndex = that.data.index - 1;
    const newCurrentIndex = that.data.currentIndex - 1;
    if (newIndex < 1) {
      wx.showToast({
        title: '已经是第一题',
        icon: 'none'
      });
      return;
    }

    const tempQuestion = that.data.questionList[newCurrentIndex];

    that.setData({
      index: newIndex,
      currentIndex: newCurrentIndex,
      question: tempQuestion,
    });
  },

  /**
   * 下一页
   * @returns 
   */
  goNext() {
    const that = this;
    const newIndex = that.data.index + 1;
    const newCurrentIndex = that.data.currentIndex + 1;
    if (newCurrentIndex > that.data.questionList.length - 1) {
      wx.showToast({
        title: '已经是最后一题',
        icon: 'none'
      });
      return;
    }

    const tempQuestion = that.data.questionList[newCurrentIndex];

    that.setData({
      index: newIndex,
      currentIndex: newCurrentIndex,
      question: tempQuestion,
    });

  },

  /**
   * 设置获取问题的路径
   * @param {*} type 
   * @param {*} studentId 
   */
  getQuestion(type, studentId) {
    const that = this;
    var questionUrl = app.url;
    if ("single" === type) {
      questionUrl += '/mobile/single/getSingle?studentId=' + studentId;
    } else if ("judgment" === type) {
      questionUrl += '/mobile/judgment/getJudgment?studentId=' + studentId;
    } else if ("multiple" === type) {
      questionUrl += '/mobile/multiple/getMultiple?studentId=' + studentId;
    } else if ("collect" === type) {
      questionUrl += '/mobile/collect/findAll?studentId=' + studentId;
    } else if ("mis" === type) {
      questionUrl += '/mobile/mistakes/findAll?studentId=' + studentId;
    }
    that.setData({
      getQuestionUrl: questionUrl,
    });
  },

  /**
   * 添加收藏
   */
  addStar() {
    const that = this;
    let tempQustion = that.data.question;
    let tempCollect = that.data.collect;
    // 获取试题信息
    tempCollect.question_id = tempQustion.id;
    tempCollect.question_type = tempQustion.question_type;
    that.setData({
      collect: tempCollect,
    });
    // console.log(that.data.collect);
    wx.request({
      url: app.url + "/mobile/collect/add",
      data: that.data.collect,
      header: { 'content-type': 'application/json' },
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        // console.log(res);
        if (res.data.flag) {
          tempQustion.starred = true;
          that.setData({
            question: tempQustion,
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
   * 移除收藏
   */
  removeStar() {
    const that = this;
    let tempQustion = that.data.question;
    let tempCollect = that.data.collect;
    // 获取试题信息
    tempCollect.question_id = tempQustion.id;
    tempCollect.question_type = tempQustion.question_type;
    that.setData({
      collect: tempCollect,
    });
    wx.request({
      url: app.url + "/mobile/collect/remove",
      data: that.data.collect,
      header: { 'content-type': 'application/json' },
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        // console.log(res);
        if (res.data.flag) {
          tempQustion.starred = false;
          that.setData({
            question: tempQustion,
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
   * 数据初始化
   */
  getData() {
    const that = this;
    let tempCollect = that.data.collect;
    // 获取当前用户id
    wx.getStorage({
      key: "student",
      success(res) {
        tempCollect.student_id = res.data.id;
      }
    });
    that.setData({
      collect: tempCollect,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
    this.getQuestion(options.type, options.studentId);
    this.getList();

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