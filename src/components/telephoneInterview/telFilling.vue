<template>
  <div class="telephoneDetails">
    <div class="main">
      <div class="top">
        <h4 class="title">
          基本信息
        </h4>
        <div class="content">
          <template>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="id" label="id" width="100"></el-table-column>
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="phone" label="手机号"></el-table-column>
              <el-table-column prop="time" label="申请时间"></el-table-column>
              <el-table-column prop="amount" label="申请金额"></el-table-column>
              <el-table-column prop="day" label="申请期限"></el-table-column>
            </el-table>
          </template>
        </div>
      </div>
      <div class="middle" style="padding-bottom: 150px;">
        <h4 class="title">
          电话详情
        </h4>
        <div class="content" v-for="(item,index) in getQuestionList">
          <div class="item">

            <div class="question-top">

              <div class="question-name">{{questionList[index].question}}</div>

              <div class="question-note" v-if="item.remark && index != 1 && index !=12 && index !=10"><i
                class="el-icon-warning"></i> {{item.remark}}
              </div>
              <div class="question-note" v-if="item.remark && index == 1 || index == 1 && item.remark === 0"><i
                class="el-icon-warning"></i> {{returnLoanUse(item.remark)}}
              </div>
              <div class="question-note" v-if="item.remark && index == 12 || index == 12 && item.remark === 0"><i
                class="el-icon-warning"></i>
                {{returnMariy(item.remark)}}
              </div>
              <div class="question-note" v-if="item.remark && index == 10 || index == 10 && item.remark === 0"><i
                class="el-icon-warning"></i>
                {{returnEducation(item.remark)}}
              </div>
            </div>

            <div class="question-info" v-if="index == 0 || index ==9">
              <template>
                <el-radio v-model="sendData[index]" label="1">{{$t('m.add154')}}</el-radio>
                <el-radio v-model="sendData[index]" label="0">{{$t('m.add155')}}</el-radio>
              </template>
            </div>
            <div class="question-info"
                 v-if="index == 1 || index == 3 || index ==7 || index == 8 || index == 10||index == 11 || index == 13 || index == 14 || index == 15 || index == 16||index == 17 || index == 18">
              <el-input v-model="sendInput[index].input" size="small"
                        :placeholder="$t('m.pressInToday2')"></el-input>
            </div>
            <div class="question-info" v-if="index == 2 || index == 4 || index == 5">
              <template>
                <el-radio v-model="sendData[index]" label="1">{{$t('m.add154')}}</el-radio>
                <el-radio v-model="sendData[index]" label="0">{{$t('m.add155')}}</el-radio>
              </template>
              <el-input v-model="sendInput[index].input" :placeholder="$t('m.pressInToday2')"
                        class="sort" size="small"></el-input>
            </div>
            <div class="question-info" v-if="index == 6">
              <div class="group">
                <el-input v-model="input6" :placeholder="$t('m.pressInToday2')"
                          class="sort" size="small"></el-input>
                <el-input v-model="input66" :placeholder="$t('m.pressInToday2')"
                          class="sort" size="small"></el-input>
              </div>
            </div>
            <div class="question-info" v-if="index == 12">
              <template>
                <el-radio v-model="sendData[index]" label="1">{{$t('m.marrying')}}</el-radio>
                <el-radio v-model="sendData[index]" label="2">{{$t('m.marryed')}}</el-radio>
                <el-radio v-model="sendData[index]" label="3">{{$t('m.Divorce')}}</el-radio>
                <el-radio v-model="sendData[index]" label="4">{{$t('m.Widowed')}}</el-radio>
              </template>
            </div>

          </div>
        </div>
      </div>
      <div class="submitGroup">
        <h4 class="title">电核结果</h4>
        <el-form label-width="120px">
          <el-form-item label="结果选择" prop="email" size="small">
            <template>
              <el-select v-model="value">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item label="操作" prop="name">
            <el-button type="primary" size="small" @click="saveForm">保存</el-button>
            <el-button size="small">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          id: '111',
          name: '王小虎',
          phone: '18322675786',
          time: '2013-13-21:21:@1',
          amount: '100000',
          day: '10'
        }],
        value: '',
        options: [{
          value: '1',
          label: this.$t('m.add159')
        }, {
          value: '2',
          label: this.$t('m.add160')
        }, {
          value: '3',
          label: this.$t('m.add161')
        }, {
          value: '4',
          label: this.$t('m.add162')
        }, {
          value: '5',
          label: this.$t('m.add163')
        }, {
          value: '6',
          label: this.$t('m.add164')
        }, {
          value: '7',
          label: this.$t('m.add165')
        }],
        input2: '',
        getQuestionList: [],
        input6: '',
        input66: '',
        sendData: ["value0", "value1", "value2", "value3", "value4", "value5", "value6", "value7", "value8", "value9", "value10", "value11", "value12", "value13", "value14", "value15", "value16", "value17", "value18", "value19"],
        sendInput: [{input: ''}, {input: ''}, {input: ''}, {input: ''}, {input: ''}, {input: ''}, {input: ''}, {input: ''}, {input: ''}, {input: ''}, {input: ''}, {input: ''}, {input: ''}, {input: ''}, {input: ''}, {input: ''}, {input: ''}, {input: ''}, {input: ''}, {input: ''}, {input: ''}, {input: ''}, {input: ''}, {input: ''}],
        questionList: [
          {
            id: 1,
            question: this.$t('m.question1')
          },
          {
            id: 2,
            question: this.$t('m.question2')
          }, {
            id: 3,
            question: this.$t('m.question3')
          },
          {
            id: 4,
            question: this.$t('m.question4')
          },
          {
            id: 5,
            question: this.$t('m.question5')
          },
          {
            id: 6,
            question: this.$t('m.question6')
          },
          {
            id: 7,
            question: this.$t('m.question7')
          },
          {
            id: 8,
            question: this.$t('m.question8')
          },
          {
            id: 9,
            question: this.$t('m.question9')
          },
          {
            id: 10,
            question: this.$t('m.question10')
          }, {
            id: 11,
            question: this.$t('m.question11')
          }, {
            id: 12,
            question: this.$t('m.question12')
          }, {
            id: 13,
            question: this.$t('m.question13')
          }, {
            id: 14,
            question: this.$t('m.question14')
          }, {
            id: 15,
            question: this.$t('m.question15')
          }, {
            id: 16,
            question: this.$t('m.question16')
          }, {
            id: 17,
            question: this.$t('m.question17')
          }, {
            id: 18,
            question: this.$t('m.question18')
          }, {
            id: 19,
            question: this.$t('m.question19')
          }]
      }
    },
    created() {
      this.loanId = this.$route.query.loanId || localStorage.getItem('loanId')
      this.getTelQuestionRemarks()
    },
    methods: {
      getTelQuestionRemarks() {
        let para = {loanId: this.loanId}
        this.$api.sendRequest('getTelQuestions', para, {}, true, "loading", this).then(res => {
          if (res.code == 200) {
            let data = res.data;
            console.log(data);
            this.getQuestionList = data.questions
          } else {
            alert("请求失败");
          }
        })
      },
      saveForm() {
        let arr = []
        this.questionList.forEach((v) => {
          let info = ''
          if (this.sendData[v.id - 1].length < 3 && this.sendInput[v.id - 1].input.length == 0) {
            info = this.sendData[v.id - 1]
          }
          if (this.sendInput[v.id - 1].input.length > 0 && this.sendData[v.id - 1].length > 3) {
            info = this.sendInput[v.id - 1].input
          }
          if (this.sendData[v.id - 1].length < 3 && this.sendInput[v.id - 1].input.length > 0) {
            info = this.sendData[v.id - 1] + '-' + this.sendInput[v.id - 1].input
          }

          arr.push({
            qid: v.id,
            info: info
          })
        })
        if (this.input6.length > 1 && this.input66.length > 1) {
          arr[6].info = this.input6 + '-' + this.input66
        }

        this.$api.sendRequest('insertTelResult', {
          loanId: this.$route.query.loanId,
          answer: arr,
          result: this.value
        }, {}, true, "loading", this).then(res => {
          if (res.code == 200) {
            let data = res.data;
            console.log(data);
          } else {
            alert("请求失败");
          }
        })
      },
      returnLoanUse(str) {
        let arr = [this.$t('m.rupiahone14a'), this.$t('m.rupiahone14b'), this.$t('m.rupiahone14c'),
          this.$t('m.rupiahone14d'), this.$t('m.rupiahone14e'), this.$t('m.rupiahone14f'),
          this.$t('m.rupiahone14g'), this.$t('m.rupiahone14h'), this.$t('m.rupiahone14i'),
          this.$t('m.rupiahone14j'), this.$t('m.rupiahone14k'), this.$t('m.rupiahone14l'),
          this.$t('m.rupiahone14m'), this.$t('m.rupiahone14n'), this.$t('m.rupiahone14o'), this.$t('m.rupiahone14p')]
        return arr[str]
      },
      returnMariy(str) {
        let arr = [this.$t('m.marrying'), this.$t('m.marryed'), this.$t('m.Divorce'), this.$t('m.Widowed')];
        return arr[str]
      },
      returnEducation(str) {
        let arr = ['SD', 'SMP/SLTP', 'SMA /SLTA', 'Diploma_I', 'Diploma_II', 'Diploma_III', 'S1', 'S2', 'S3'];
        return arr[str]
      },
    }
  }
</script>

<style scoped lang="less">
  .telephoneDetails {
    width: 100%;
    .main {
      .top {
        width: 98%;
        height: auto;
        margin: 10px auto;
        .title {
          height: 40px;
          border-bottom: 1px solid gainsboro;
          line-height: 40px;
          text-indent: 5px;
          letter-spacing: 1px;
          margin-bottom: 25px;
        }
      }
      .middle {
        width: 98%;
        height: auto;
        margin: 10px auto;
        .title {
          height: 40px;
          border-bottom: 1px solid gainsboro;
          line-height: 40px;
          text-indent: 5px;
          letter-spacing: 1px;
          margin: 30px auto;
        }
        .content {
          .item {
            width: 100%;
            .question-top {
              display: flex;
              .question-name {
                font-weight: bolder;
              }
              .question-note {
                margin-left: 50px;
                i {
                  color: rgb(255, 208, 75);
                }
              }
            }
            .question-info {
              display: flex;
              margin: 15px 0;
              .group {
                display: flex;
              }
            }

          }
        }
      }
      .submitGroup {
        position: fixed;
        z-index: 2;
        bottom: 0;
        width: 83%;
        height: 150px;
        background-color: #EBF6FE;
        .title {
          padding: 10px 0;
          text-indent: 20px;
        }
        .el-input {
          width: 200px;
        }
        .el-textarea__inner {
          width: 400px;
        }
        .el-form-item {
          margin-bottom: 10px;
        }
      }
      .el-input {
        width: 300px;
      }
    }
  }
</style>
