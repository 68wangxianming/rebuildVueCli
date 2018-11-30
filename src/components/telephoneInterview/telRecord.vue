<template>
  <div class="telRecord">
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
        <div class="content">
          <div class="item" v-for="(item,index) in getTelResultInfoList">
            <div class="question-name">{{questionList[index].question}}</div>
            <div class="question-note" v-if="getQuestionList[index].remark && index != 1 && index !=10 && index !=12">
              <i class="el-icon-warning"></i> {{getQuestionList[index].remark}}
            </div>
            <div class="question-note" v-if="getQuestionList[index].remark && index == 1"><i class="el-icon-warning"></i>
              {{returnLoanUse(getQuestionList[index].remark)}}
            </div>
            <div class="question-note" v-if="getQuestionList[index].remark && index == 10"><i class="el-icon-warning"></i>
              {{returnEducation(getQuestionList[index].remark)}}
            </div>
            <div class="question-note" v-if="getQuestionList[index].remark && index == 12"><i class="el-icon-warning"></i>
              {{returnMariy(getQuestionList[index].remark)}}
            </div>

            <div class="question-info" v-if="index == 0 || index ==9">
              {{returnContent1(item.answer)}}
            </div>
            <div class="question-info"
                 v-if="index == 1 || index == 3 || index ==7 || index == 8 || index == 10||index == 11 || index == 13 || index == 14 || index == 15 || index == 16||index == 17 || index == 18">
              {{item.answer}}
            </div>

            <div class="question-info" v-if="index == 2 || index == 4 || index == 5">
              <template>
                {{returnContent1(item.answer.split('-')[0])}}
              </template>
              {{item.answer.split('-')[1]}}
            </div>

            <div class="question-info" v-if="index == 6">
              <div class="group">
                {{item.answer.split('-')[0]}}
                {{item.answer.split('-')[1]}}
                <!--<el-input v-model="input6" placeholder="请输入内容" class="sort"></el-input>-->
                <!--<el-input v-model="input66" placeholder="请输入内容" class="sort"></el-input>-->
              </div>
            </div>

            <div class="question-info" v-if="index == 12">
              {{returnContent2(item.answer)}}
            </div>

          </div>
        </div>


        <el-table :data="tableData2" border style="width: 100%">
          <el-table-column prop="name" :label="this.$t('m.add143')" align="center"></el-table-column>
          <el-table-column prop="updateTime" :label="this.$t('m.add144')" align="center"></el-table-column>
          <el-table-column prop="result" :label="this.$t('m.add145')" align="center"></el-table-column>
        </el-table>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        externalNo:'',
        tableData: [],
        getTelResultInfoList: [],
        getQuestionList: [],
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
          }
        ],
        tableData2:[{
          result:'',
          updateTime:'',
          name:''
        }]
      }
    },
    created() {
      this.externalNo = this.$route.query.externalNo || localStorage.getItem('externalNo')
      this.loanId = this.$route.query.loanId || localStorage.getItem('loanId')
      this.getTelResultInfo()
      this.getTelQuestionRemarks()
    },
    methods:{
      getTelResultInfo() {
        let para = {externalNo: this.externalNo}
        this.$api.sendRequest('getTelResultInfo', para, {}, true, "loading", this).then(res => {
          if (res.code == 200) {
            let data = res.data.telResultInfo;
            this.getTelResultInfoList = data.answerList.sort((a,b)=>{
              return a.qid-b.qid
            })
            this.tableData2[0].result = this.returnDealResult(data.result)
            this.tableData2[0].updateTime = this.$Func.timeConversion(data.updateTime)
            this.tableData2[0].name = data.adminInfo.name

          } else {
            alert("请求失败");
          }
        })
      },
      getTelQuestionRemarks() {
        let para = {loanId: this.loanId}
        this.$api.sendRequest('getTelQuestions', para, {}, true, "loading", this).then(res => {
          if (res.code == 200) {
            let data = res.data;
            this.getQuestionList = data.questions
          } else {
            alert("请求失败");
          }
        })
      },
      returnContent1(str){
        let arr = [this.$t('m.add155'),this.$t('m.add154')]
        return arr[str]
      },
      returnContent2(str){
        let arr = [this.$t('m.marrying'), this.$t('m.marryed'), this.$t('m.Divorce'), this.$t('m.Widowed')];
        return arr[str]
      },
      returnLoanUse(str) {
        let arr = [this.$t('m.rupiahone14a'), this.$t('m.rupiahone14b'), this.$t('m.rupiahone14c'),
          this.$t('m.rupiahone14d'), this.$t('m.rupiahone14e'), this.$t('m.rupiahone14f'),
          this.$t('m.rupiahone14g'), this.$t('m.rupiahone14h'), this.$t('m.rupiahone14i'),
          this.$t('m.rupiahone14j'), this.$t('m.rupiahone14k'), this.$t('m.rupiahone14l'),
          this.$t('m.rupiahone14m'), this.$t('m.rupiahone14n'), this.$t('m.rupiahone14o'), this.$t('m.rupiahone14p')]
        return arr[str]
      },
      returnEducation(str){
        let arr = ['SD', 'SMP/SLTP', 'SMA /SLTA', 'Diploma_I', 'Diploma_II', 'Diploma_III', 'S1', 'S2', 'S3'];
        return arr[str]
      },
      returnMariy(str){
        let arr = [this.$t('m.marrying'), this.$t('m.marryed'), this.$t('m.Divorce'), this.$t('m.Widowed')];
        return arr[str]
      },
      returnDealResult(str) {
        let arr = ['',this.$t('m.add159'),this.$t('m.add160'),this.$t('m.add161'),this.$t('m.add162'),this.$t('m.add163'),this.$t('m.add164'),this.$t('m.add165')]
        return arr[str]
      }
    }

  }
</script>

<style scoped lang="less">
  .telRecord {
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
            .question-name{
              font-weight: bolder;
              display: inline-block;

            }
            .question-note{
              display: inline-block;
              margin-left: 50px;
              i{
                color: rgb(255, 208, 75);
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
