// pages/exam/exam.js
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
          userId: res.data.id,
          userUid: res.data.user_uid,
        });
      }
    });
    wx.request({
      url: app.url + '/mobile/examPaper/getExamPaper',
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
          var now = that.getNowTime();
          that.setData({ startTime: now });
          // console.log(that.data.startTime);
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

  /**
   * 获取当前时间
   */
  getNowTime() {
    var date = new Date();
    //年 getFullYear()：四位数字返回年份
    var year = date.getFullYear();  //getFullYear()代替getYear()
    //月 getMonth()：0 ~ 11
    var month = date.getMonth() + 1;
    //日 getDate()：(1 ~ 31)
    var day = date.getDate();
    //时 getHours()：(0 ~ 23)
    var hour = date.getHours();
    //分 getMinutes()： (0 ~ 59)
    var minute = date.getMinutes();
    //秒 getSeconds()：(0 ~ 59)
    var second = date.getSeconds();
    var time = year + '-' + this.addZero(month) + '-' + this.addZero(day) + ' ' + this.addZero(hour) + ':' + this.addZero(minute) + ':' + this.addZero(second);
    return time;
  },


  /**
   * 小于10的拼接上0字符串
   */
  addZero(s) {
    return s < 10 ? ('0' + s) : s;
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
      index: index,
      core: 0,
      value: value,
      answer: single.answer
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
          } else {
            temporarySingle.core = 0;
          }
        }
      }
      if (!isExistence) {
        //不存在
        if (question.value == single.answer) {
          question.core = core;
        }
        this.data.singleQuestions.push(question);
      }
    } else {
      //singleQuestions为空新增question
      if (question.value == single.answer) {
        question.core = core;
      }
      this.data.singleQuestions.push(question);
    }
    
    console.log(this.data.singleQuestions);
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
          } else {
            temporaryJudgment.core = 0;
          }
        }
      }
      if (!isExistence) {
        //不存在
        if (question.value == judgment.answer) {
          question.core = core;
        }
        this.data.judgmentQuestions.push(question);
      }
    } else {
      //judgmentQuestions为空新增question
      if (question.value == judgment.answer) {
        question.core = core;
      }
      this.data.judgmentQuestions.push(question);
    }
    
    console.log(this.data.judgmentQuestions);
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
              } else {
                temporaryMultiple.core = 0;
              }
            }
          }
          if (!isExistence) {
            //不存在
            if (this.ifEqual(multiple.answer, question.value)) {
              question.core = core;
            }
            this.data.multipleQuestions.push(question);
          }
        } else {
          //multipleQuestions为空新增question
          if (this.ifEqual(multiple.answer, question.value)) {
            question.core = core;
          }
          this.data.multipleQuestions.push(question);
        }
        
        console.log(this.data.multipleQuestions);
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
    // console.log(this.data.score);
    //获取当前时间
    var now = this.getNowTime();
    this.setData({ completeTime: now });
    // console.log(this.data.completeTime);
    var studentExamSituation = {
      exam_paper_id: this.data.examPaper.id,
      exam_paper_name: this.data.examPaper.name,
      user_id: this.data.userId,
      user_uid: this.data.userUid,
      start_time: this.data.startTime,
      complete_time: this.data.completeTime,
      core: this.data.score,
      score: this.data.examPaper.score
    };
    // console.log(studentExamSituation);
    var that = this;
    wx.request({
      url: app.url + '/mobile/completeList/add',
      data: studentExamSituation,
      method: "POST",
      success(res) {
        if (res.data.flag) {
          that.setData({ examSheetId: res.data.data });
          wx.redirectTo({
            url: '/pages/homepage/examComplete/examComplete?id=' + that.data.examSheetId,
            fail() {
              wx.showToast({
                title: '跳转完成页面失败',
              })
            }
          });
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

})