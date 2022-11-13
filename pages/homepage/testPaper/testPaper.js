// pages/homepage/testPaper/testPaper.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    examPaperName: '',
    btnText: '提交试卷',
    singleList: [],
    singleCount: 0,
    multipleList: [],
    multipleCount: 0,
    judgmentList: [],
    judgmentCount: 0,
    singleQuestions: [],
    judgmentQuestions: [],
    multipleQuestions: [],
    examPaper: null,
    userId: null,
    userUid: null,
    score: 0,
    core: 0,
    index: 0,
    examSheetId: null,
    startTime: null,
    completeTime: null,
    misQuestionList: {},
    misSingleQuestionList: [],
    misJudgmentQuestionList: [],
    misMultipleQuestionList: [],
    show: false,
  },

  /**
 * 单选题按键
 */
  selectSingleOption(e) {
    //每道题对应的分数
    var core = this.data.core;
    //传值所属题目的下标
    var index = e.currentTarget.dataset.index;
    //前台传递的值
    var value = e.detail.value;
    //根据传值所属题目的下标获取该题目
    var single = this.data.singleList[index];
    var question = {
      id: single.question_id,
      index: index,
      core: 0,
      value: value,
      answer: single.answer,
    };
    var misQuestion = {
      student_id: this.data.userId,
      question_type: 1,
      question_id: single.question_id,
      student_answer: value,
    };
    //是否存在于数组中
    var isExistence = false;
    //singleQuestions不为空遍历
    if (this.data.singleQuestions.length != 0) {
      for (let i = 0; i < this.data.singleQuestions.length; i++) {
        //获取singleQuestions中的single对象
        var temporarySingle = this.data.singleQuestions[i];
        //判断新的question是否存在
        if (temporarySingle.index == question.index) {
          //存在
          //isExistence为true
          isExistence = true;
          //设置value
          temporarySingle.value = question.value;
          //答案相等，设置分数
          if (temporarySingle.value == single.answer) {
            temporarySingle.core = core;
            // 将错题本原有的错题删除
            for (let i = 0; i < this.data.misSingleQuestionList.length; i++) {
              var tempMisQuestion = this.data.misSingleQuestionList[i];
              if (misQuestion.question_id === tempMisQuestion.question_id) {
                this.data.misSingleQuestionList.splice(i, 1);
              }
            }
            
          } else {
            temporarySingle.core = 0;
            // 错题本为空，添加新错题
            if (this.data.misSingleQuestionList.length == 0) {
              this.data.misSingleQuestionList.push(misQuestion);
            }
            // 错题不存在错题本中
            var isMisAdd = true;
            // 替换错题本中原有的错题
            for (let i = 0; i < this.data.misSingleQuestionList.length; i++) { 
              var tempMisQuestion = this.data.misSingleQuestionList[i];
              if (misQuestion.question_id === tempMisQuestion.question_id) { 
                this.data.misSingleQuestionList.splice(i, 1);
                this.data.misSingleQuestionList.push(misQuestion);
                // 错题存在错题本中
                isMisAdd = false;
                break;
              }
            }
            // 这道题不在错题本中，添加
            if (isMisAdd) {
              this.data.misSingleQuestionList.push(misQuestion);
            }
          }
        }
      }
      if (!isExistence) {
        //不存在
        if (question.value == single.answer) {
          question.core = core;
        } else {
          this.data.misSingleQuestionList.push(misQuestion);
        }
        this.data.singleQuestions.push(question);
      }
    } else {
      //singleQuestions为空新增question
      if (question.value == single.answer) {
        question.core = core;
      } else {
        this.data.misSingleQuestionList.push(misQuestion);
      }
      this.data.singleQuestions.push(question);
    }
    console.log(this.data.singleQuestions);
    console.log(this.data.misSingleQuestionList);
  },

  /**
   * 判断题按键
   */
  selectJudgmentOption(e) {
    //每道题对应的分数
    var core = this.data.core;
    //传值所属题目的下标
    var index = e.currentTarget.dataset.index;
    //前台传递的值
    var value = e.detail.value;
    //根据传值所属题目的下标获取该题目
    var judgment = this.data.judgmentList[index];
    var question = {
      index: index,
      core: 0,
      value: value,
      answer: judgment.answer
    };
    var misQuestion = {
      student_id: this.data.userId,
      question_type: 3,
      question_id: judgment.question_id,
      student_answer: value,
    };
    //是否存在于数组中
    var isExistence = false;
    //judgmentQuestions不为空遍历
    if (this.data.judgmentQuestions.length != 0) {
      for (let i = 0; i < this.data.judgmentQuestions.length; i++) {
        //获取judgmentQuestions中的judgment对象
        var temporaryJudgment = this.data.judgmentQuestions[i];
        //判断新的question是否存在
        if (temporaryJudgment.index == question.index) {
          //存在
          //isExistence为true
          isExistence = true;
          //设置value
          temporaryJudgment.value = question.value;
          //答案相等，设置分数
          if (temporaryJudgment.value == judgment.answer) {
            temporaryJudgment.core = core;
            // 将错题本原有的错题删除
            for (let i = 0; i < this.data.misJudgmentQuestionList.length; i++) {
              var tempMisQuestion = this.data.misJudgmentQuestionList[i];
              if (misQuestion.question_id === tempMisQuestion.question_id) {
                this.data.misJudgmentQuestionList.splice(i, 1);
              }
            }
          } else {
            temporaryJudgment.core = 0;
            // 错题本为空，添加新错题
            if (this.data.misJudgmentQuestionList.length == 0) {
              misQuestion.student_answer = misQuestion.student_answer == "1" || 1 ? "A" : "B";
              this.data.misJudgmentQuestionList.push(misQuestion);
            }
            // 错题不存在错题本中
            var isMisAdd = true;
            // 替换错题本中原有的错题
            for (let i = 0; i < this.data.misJudgmentQuestionList.length; i++) {
              var tempMisQuestion = this.data.misJudgmentQuestionList[i];
              if (misQuestion.question_id === tempMisQuestion.question_id) {
                this.data.misJudgmentQuestionList.splice(i, 1);
                misQuestion.student_answer = misQuestion.student_answer == "1" || 1 ? "A" : "B";
                this.data.misJudgmentQuestionList.push(misQuestion);
                // 错题存在错题本中
                isMisAdd = false;
                break;
              }
            }
            // 这道题不在错题本中，添加
            if (isMisAdd) {
              misQuestion.student_answer = misQuestion.student_answer == "1" || 1 ? "A" : "B";
              this.data.misJudgmentQuestionList.push(misQuestion);
            }
          }
        }
      }
      if (!isExistence) {
        //不存在
        if (question.value == judgment.answer) {
          question.core = core;
        } else {
          misQuestion.student_answer = misQuestion.student_answer == "1" || 1 ? "A" : "B";
          this.data.misJudgmentQuestionList.push(misQuestion);
        }
        this.data.judgmentQuestions.push(question);
      }
    } else {
      //judgmentQuestions为空新增question
      if (question.value == judgment.answer) {
        question.core = core;
      } else {
        misQuestion.student_answer = misQuestion.student_answer == "1" || 1 ? "A" : "B";
        this.data.misJudgmentQuestionList.push(misQuestion);
        }
      this.data.judgmentQuestions.push(question);
    }

    console.log(this.data.judgmentQuestions);
    console.log(this.data.misJudgmentQuestionList);
  },

  /**
   * 多选题按键
   */
  selectMultipleOption(e) {
    //每道题对应的分数
    var core = this.data.core;
    //传值所属题目的下标
    var index = e.currentTarget.dataset.index;
    //前台传递的值
    var value = e.detail.value;
    //根据传值所属题目的下标获取该题目
    var multiple = this.data.multipleList[index];
    var question = {
      index: index,
      core: 0,
      value: value,
      answer: multiple.answer
    };
    var misQuestion = {
      student_id: this.data.userId,
      question_type: 2,
      question_id: multiple.question_id,
      student_answer: value,
    };
    //是否存在于数组中
    var isExistence = false;
    //multipleQuestions不为空遍历
    if (this.data.multipleQuestions.length != 0) {
      for (let i = 0; i < this.data.multipleQuestions.length; i++) {
        //获取multipleQuestions中的multiple对象
        var temporaryMultiple = this.data.multipleQuestions[i];
        //判断新的question是否存在
        if (temporaryMultiple.index == question.index) {
          //存在
          //isExistence为true
          isExistence = true;
          //设置value
          temporaryMultiple.value = question.value;
          //答案相等，设置分数
          if (this.ifEqual(multiple.answer, question.value)) {
            temporaryMultiple.core = core;
            // 将错题本原有的错题删除
            for (let i = 0; i < this.data.misMultipleQuestionList.length; i++) {
              var tempMisQuestion = this.data.misMultipleQuestionList[i];
              if (misQuestion.question_id === tempMisQuestion.question_id) {
                this.data.misMultipleQuestionList.splice(i, 1);
              }
            }
          } else {
            temporaryMultiple.core = 0;
            // 错题本为空，添加新错题
            if (this.data.misMultipleQuestionList.length == 0) {
              misQuestion.student_answer = misQuestion.student_answer.join("");
              this.data.misMultipleQuestionList.push(misQuestion);
            }
            // 错题不存在错题本中
            var isMisAdd = true;
            // 替换错题本中原有的错题
            for (let i = 0; i < this.data.misMultipleQuestionList.length; i++) {
              var tempMisQuestion = this.data.misMultipleQuestionList[i];
              if (misQuestion.question_id === tempMisQuestion.question_id) {
                this.data.misMultipleQuestionList.splice(i, 1);
                misQuestion.student_answer = misQuestion.student_answer.join("");
                this.data.misMultipleQuestionList.push(misQuestion);
                // 错题存在错题本中
                isMisAdd = false;
                break;
              }
            }
            // 这道题不在错题本中，添加
            if (isMisAdd) {
              misQuestion.student_answer = misQuestion.student_answer.join("");
              this.data.misMultipleQuestionList.push(misQuestion);
            }
          }
        }
      }
      if (!isExistence) {
        //不存在
        if (this.ifEqual(multiple.answer, question.value)) {
          question.core = core;
        } else {
          misQuestion.student_answer = misQuestion.student_answer.join("");
          this.data.misMultipleQuestionList.push(misQuestion);
        }
        this.data.multipleQuestions.push(question);
      }
    } else {
      //multipleQuestions为空新增question
      if (this.ifEqual(multiple.answer, question.value)) {
        question.core = core;
      } else {
        misQuestion.student_answer = misQuestion.student_answer.join("");
        this.data.misMultipleQuestionList.push(misQuestion);
      }
      this.data.multipleQuestions.push(question);
    }

    console.log(this.data.multipleQuestions);
    console.log(this.data.misMultipleQuestionList);
  },

  /**
   * 判断答案是否相等 
   */
  ifEqual(answer, value) {
    var answerChar = answer.split("");
    var valueChar = value;
    if (valueChar.length != answerChar.length) {
      return false;
    }
    var num = 0;
    for (let i = 0; i < answerChar.length; i++) {
      const answerElement = answerChar[i];
      for (let j = 0; j < valueChar.length; j++) {
        const valueElement = valueChar[j];
        if (answerElement == valueElement) {
          num++;
          break;
        }
      }
    }
    if (num != answerChar.length) {
      return false;
    }
    return true;
  },

  /**
 * 提交试卷
 */
  submit(e) {
    //计算总分
    this.getScore();
    this.data.misQuestionList.misSingle = this.data.misSingleQuestionList;
    this.data.misQuestionList.misJudgment = this.data.misJudgmentQuestionList;
    this.data.misQuestionList.misMultiple = this.data.misMultipleQuestionList;
    var that = this;
    wx.request({
      url: app.url + "/mobile/mistakes/add",
      data: that.data.misQuestionList,
      method: "POST",
      success(res) {
        if (res.data.flag) {
           
        } else {
          wx.showToast({
            title: '提交失败',
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
    this.setData({ show: true });
  },

  /**
   * 获取总分
   */
  getScore() {
    var score = 0;
    for (let i = 0; i < this.data.singleQuestions.length; i++) {
      const single = this.data.singleQuestions[i];
      score += single.core;
    }
    for (let i = 0; i < this.data.judgmentQuestions.length; i++) {
      const judgment = this.data.judgmentQuestions[i];
      score += judgment.core;
    }
    for (let i = 0; i < this.data.multipleQuestions.length; i++) {
      const multiple = this.data.multipleQuestions[i];
      score += multiple.core;
    }
    this.setData({ score: score });
  },

  /**
   * 获取试卷
   */
  getQuestion() {
    var that = this;
    wx.getStorage({
      key: "student",
      success(res) {
        that.setData({
          userId: res.data.id,
          userUid: res.data.user_uid,
        });
      }
    });
    wx.request({
      url: app.url + '/mobile/examPaper/getTestPaper',
      success(res) {
        if (res.data.flag) {
          that.setData({
            examPaperName: res.data.data.examPaper.name,
            examPaper: res.data.data.examPaper,
            singleList: res.data.data.singleList,
            multipleList: res.data.data.multipleList,
            judgmentList: res.data.data.judgmentList,
            singleCount: res.data.data.singleList.length,
            multipleCount: res.data.data.multipleList.length,
            judgmentCount: res.data.data.judgmentList.length,
            core: res.data.data.examPaper.score / res.data.data.examPaper.question_count
          });
          // console.log(that.data.examPaper);
        } else {
          wx.showToast({
            title: '获取试卷失败，请稍后再试',
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
    })
  },

  toIndex() {
    let url = "/pages/homepage/index/index";
    wx.redirectTo({
      url: url,
      fail() {
        wx.showToast({
          title: '跳转失败,请自行返回',
          icon: 'none'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getQuestion();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})