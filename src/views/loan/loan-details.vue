<template>
  <div class="loan-details">
    <div class="detailsTop" v-loading="loading">
      <div class="top">
        <div class="personTitle">{{profileInfo.name}} - Rp{{loanInfo.amount}} - {{loanInfo.period}}*D/1</div>
        <div>
          <el-dropdown trigger="click">
            <el-button size="small" type="primary">推 送 <i class="el-icon-arrow-down el-icon--right"></i></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item,index) in pushList" :key="item.index"
                                @click.native="choosePushList(item.action)">{{item.name}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="middle">
        <div class="item">
          <div><span>订单ID：</span> <span class="val">{{loanInfo.loanNo}}</span></div>
          <div><span>借款金额：</span> <span class="val">Rp {{loanInfo.amount}}</span></div>
          <div><span>申请期限：</span> <span class="val">{{loanInfo.period}}天</span></div>
          <div><span>借款目的：</span> <span class="val">{{this.$Func.returnLoanType(loanInfo.type)}}</span></div>
          <div><span>电话审核结果：</span> <span class="val">{{loanInfo.status>=6? '已电核':'未电核'}}</span></div>
        </div>
        <div class="item">
          <div><span>用户ID：</span> <span class="val">{{userInfo.id}}</span></div>
          <div><span>手机号：</span> <span class="val">{{userInfo.phone}}</span></div>
          <div><span>客户状态：</span>
            <el-button type="danger" size="mini">{{this.$Func.returnOldUserStatus(loanInfo.patron)}}</el-button>
          </div>
          <div><span>风控结果：</span> <span class="val"></span></div>
        </div>
        <div class="item">
          <div><span>状态：</span> <span class="val">{{this.$Func.returnOrderStatus(loanInfo.status)}}</span></div>
          <div><span>修改于：</span> <span class="val">{{this.$Func.timeConversion(loanInfo.updateTime)}}</span></div>
        </div>
      </div>
    </div>
    <div class="detailsMiddle">
      <div class="step">
        <el-steps :active=timeActive finish-status="success">
          <el-step :description="loanInfo.createTime">
            <div slot="title">
              <span>创建 </span>
              <el-popover
                @show="showPopper('Created')"
                placement="bottom-start"
                title="操作记录"
                width="650"
                trigger="hover">
                <el-table :data="stepsList" v-loading="loading1">
                  <el-table-column property="operatorType" label="操作人"></el-table-column>
                  <el-table-column property="action" label="动作"></el-table-column>
                  <el-table-column property="createTime" label="时间"></el-table-column>
                  <el-table-column property="note" label="备注"></el-table-column>
                </el-table>
                <i class="header-icon el-icon-info" slot="reference"> </i>
              </el-popover>
            </div>
          </el-step>
          <el-step :description="loanInfo.submitTime">
            <div slot="title">
              <span>提交 </span>
              <el-popover
                @show="showPopper('Submitted')"
                placement="bottom-start"
                title="操作记录"
                width="650"
                trigger="hover">
                <el-table :data="stepsList" v-loading="loading1">
                  <el-table-column property="operatorType" label="操作人"></el-table-column>
                  <el-table-column property="action" label="动作"></el-table-column>
                  <el-table-column property="createTime" label="时间"></el-table-column>
                  <el-table-column property="note" label="备注"></el-table-column>
                </el-table>
                <i class="header-icon el-icon-info" slot="reference"> </i>
              </el-popover>
            </div>
          </el-step>
          <el-step :description="loanInfo.approveTime">
            <div slot="title">
              <span>审核 </span>
              <el-popover
                @show="showPopper('Approved')"
                placement="bottom-start"
                title="操作记录"
                width="650"
                trigger="hover">
                <el-table :data="stepsList" v-loading="loading1">
                  <el-table-column property="operatorType" label="操作人"></el-table-column>
                  <el-table-column property="action" label="动作"></el-table-column>
                  <el-table-column property="createTime" label="时间"></el-table-column>
                  <el-table-column property="note" label="备注"></el-table-column>
                </el-table>
                <i class="header-icon el-icon-info" slot="reference"> </i>
              </el-popover>
            </div>
          </el-step>
          <el-step :description="loanInfo.fundTime">
            <div slot="title">
              <span>放款 </span>
              <el-popover
                @show="showPopper('Funded')"
                placement="bottom-start"
                title="操作记录"
                width="650"
                trigger="hover">
                <el-table :data="stepsList" v-loading="loading1">
                  <el-table-column property="operatorType" label="操作人"></el-table-column>
                  <el-table-column property="action" label="动作"></el-table-column>
                  <el-table-column property="createTime" label="时间"></el-table-column>
                  <el-table-column property="note" label="备注"></el-table-column>
                </el-table>
                <i class="header-icon el-icon-info" slot="reference"> </i>
              </el-popover>
            </div>
          </el-step>
          <el-step :description="loanInfo.paidOffTime">
            <div slot="title">
              <span>还款 </span>
              <el-popover
                @show="showPopper('PaidOff')"
                placement="bottom-start"
                title="操作记录"
                width="650"
                trigger="hover">
                <el-table :data="stepsList" v-loading="loading1">
                  <el-table-column property="operatorType" label="操作人"></el-table-column>
                  <el-table-column property="action" label="动作"></el-table-column>
                  <el-table-column property="createTime" label="时间"></el-table-column>
                  <el-table-column property="note" label="备注"></el-table-column>
                </el-table>
                <i class="header-icon el-icon-info" slot="reference"> </i>
              </el-popover>
            </div>
          </el-step>
        </el-steps>
      </div>
    </div>
    <div class="detailsBottom">
      <div class="content">
        <template>
          <el-tabs v-model="activeName" @tab-click="handleClick" lazy size="small">
            <el-tab-pane label="用户信息" name="1">
              <userInfo v-if="sendRequst.request1"></userInfo>
            </el-tab-pane>
            <el-tab-pane label="自拍照" name="2">
              <userPhote v-if="sendRequst.request2"></userPhote>
            </el-tab-pane>
            <el-tab-pane label="合同" name="3">
              <contract v-if="sendRequst.request3"></contract>
            </el-tab-pane>
            <el-tab-pane label="历史借款订单" name="4">
              <historyLoanOrder v-if="sendRequst.request4"></historyLoanOrder>
            </el-tab-pane>
            <el-tab-pane label="借款订单审核记录" name="5">
              <auditRecordLoanOrder v-if="sendRequst.request5"></auditRecordLoanOrder>
            </el-tab-pane>
            <el-tab-pane label="规则引擎结果" name="6">
              <ruleEngineResult v-if="sendRequst.request6"></ruleEngineResult>
            </el-tab-pane>
            <el-tab-pane label="电核记录" name="7">
              <callRecord v-if="sendRequst.request7"></callRecord>
            </el-tab-pane>
            <el-tab-pane label="催核记录" name="8">
              <collectionRecord v-if="sendRequst.request8"></collectionRecord>
            </el-tab-pane>
            <el-tab-pane label="客服记录" name="9">
              <customerServiceRecord v-if="sendRequst.request9"></customerServiceRecord>
            </el-tab-pane>
          </el-tabs>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import userInfo from '@components/loanDetails/userInfo.vue'
  import userPhote from '@components/loanDetails/userPhoto.vue'
  import contract from '@components/loanDetails/contract.vue'
  import historyLoanOrder from '@components/loanDetails/historyLoanOrder.vue'
  import auditRecordLoanOrder from '@components/loanDetails/auditRecordLoanOrder.vue'
  import ruleEngineResult from '@components/loanDetails/ruleEngineResult.vue'
  import callRecord from '@components/loanDetails/callRecord.vue'
  import collectionRecord from '@components/loanDetails/collectionRecord.vue'
  import customerServiceRecord from '@components/loanDetails/customerServiceRecord.vue'

  export default {
    data() {
      return {
        loading1:true,
        loading: true,
        loanId: '',
        loanNo: '',
        userId: '',
        activeName: '1',
        loanInfo: {},
        profileInfo: {},
        userInfo: {},
        timeActive: null,
        currentPage: 1,
        perPage: 10,
        totalPage: null,
        stepsList: [],
        pushList: [],
        note: '',
        sendRequst:{
          request1:true,
          request2:false,
          request3:false,
          request4:false,
          request5:false,
          request6:false,
          request7:false,
          request8:false,
          request9:false,
        }
      }
    },
    created() {
      this.loanNo = this.$route.query.loanNo || localStorage.getItem("loanNo")
      this.userId = this.$route.query.userId || localStorage.getItem("userId")
      this.loanId = this.$route.query.loanId || localStorage.getItem("loanId")
      localStorage.setItem("loanNo", this.loanNo);
      localStorage.setItem("userId", this.userId);
      localStorage.setItem("loanId", this.loanId);
      this.getLoanInfo()
    },
    methods: {
      showPopper(type) {
        let para = {
          loanId: this.loanInfo.id,
          type: type,
          perPage: this.perPage,
          currentPage: this.currentPage
        }
        this.$api.sendRequest('getLifeCycle', para, {}, true, "loading1", this).then(res => {
          if (res.code == 200) {
            let data = res.data;
            data.items.forEach((v) => {
              v.createTime = this.$Func.timeConversion(v.createTime)
              v.action = this.$t(`stepsFy.${v.action}`)
              if (v.operatorType == 'User') {
                v.operatorType = `${v.operatorType}(${v.userInfo.phone})`
              }
            })
            this.stepsList = data.items;
          }
        })
      },
      getLoanInfo() {
        this.$api.sendRequest('getLoanInfo', {
          loanNo: this.loanNo
        }, {}, true, "loading", this).then(res => {
          if (res.code == 200) {
            let data = res.data;
            this.loanInfo = data && data.loanInfo || {}
            this.profileInfo = data && data.profileInfo || {}
            this.userInfo = data && data.userInfo || {}
            this.loanInfo.createTime = data.loanInfo && data.loanInfo.createTime && this.$Func.timeConversion(data.loanInfo.createTime) || ''
            this.loanInfo.submitTime = data.loanInfo && data.loanInfo.submitTime && this.$Func.timeConversion(data.loanInfo.submitTime) || ''
            this.loanInfo.approveTime = data.loanInfo && data.loanInfo.approveTime && this.$Func.timeConversion(data.loanInfo.approveTime) || ''
            this.loanInfo.fundTime = data.loanInfo && data.loanInfo.fundTime && this.$Func.timeConversion(data.loanInfo.fundTime) || ''
            this.loanInfo.paidOffTime = data.loanInfo && data.loanInfo.paidOffTime && this.$Func.timeConversion(data.loanInfo.paidOffTime) || ''

            if (data.loanInfo.status == 0 || data.loanInfo.status == 2) {
              this.timeActive = 1
            } else if (data.loanInfo.status == 1 || data.loanInfo.status == 3 || data.loanInfo.status == 4 || data.loanInfo.status == 5 || data.loanInfo.status == 6) {
              this.timeActive = 2
            } else if (data.loanInfo.status == 7 || data.loanInfo.status == 8) {
              this.timeActive = 3
            } else if (data.loanInfo.status == 9 || data.loanInfo.status == 10) {
              this.timeActive = 4
            } else {
              this.timeActive = 5
            }

            //调用产生pushList
            this.getPushList(data.loanInfo.status)

          } else {
            this.$alert('请求失败')
          }
        })
      },
      getPushList(status) {
        if (status == 1) {
          this.pushList = [{name: '待审核', action: 'sendManual'}, {name: '取消', action: 'cancelLoan'}]
        } else if (status == 3) {
          this.pushList = [{name: '待电核', action: 'approveLoan'}, {name: '审核拒绝', action: 'rejectLoan'}, {
            name: '取消',
            action: 'cancelLoan'
          }]
        } else if (status == 5) {
          this.pushList = [{name: '待放款', action: 'confirmLoan'}, {name: '电核拒绝', action: 'telRejectLoan'}, {
            name: '取消',
            action: 'cancelLoan'
          }]
        } else if (status == 6) {
          this.pushList = [{name: '同意放款', action: 'fundApproveLoan'}, {name: '拒绝放款', action: 'fundRejectLoan'}, {
            name: '取消',
            action: 'cancelLoan'
          }]
        } else if (status == 8) {
          this.pushList = [{name: '重新放款', action: 'reFundLoan '}, {name: '取消', action: 'cancelLoan'}]
        } else {
          this.pushList = []
        }
      },
      choosePushList(str) {
        this.$prompt('备注信息', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          let para = {loanId: this.loanId, note: value}
          this.$api.sendRequest(str, para, {}, true, "loading", this).then(res => {
            if (res.code == 200 && res.data.result) {
              this.getLoanInfo()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
        let para = {loanId: this.loanId, note: this.note}

        console.log(str);
      },
      handleClick(tab, event) {
        this.sendRequst['request'+tab.name]=true;
      }
    },
    components: {
      userInfo,
      userPhote,
      contract,
      historyLoanOrder,
      auditRecordLoanOrder,
      ruleEngineResult,
      callRecord,
      collectionRecord,
      customerServiceRecord
    }
  }
</script>

<style scoped lang="less">
  .loan-details {
    width: 100%;
    height: auto;
    background-color: #F0F2F5;
    .detailsTop {
      width: 99%;
      height: auto;
      background: #FFFFFF;
      margin: 10px auto;
      padding: 20px 0px;
      border-radius: 10px;
      color: rgba(0, 0, 0, .65);
      .top {
        width: 96%;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        line-height: 40px;
        .personTitle {
          font-size: 24px;
          margin-bottom: 20px;
        }
        .el-button {
          width: 100px;
        }
      }
      .middle {
        width: 96%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        line-height: 35px;
        font-size: 15px;
        .item:last-child {
          text-align: right;
        }
      }
    }
    .detailsMiddle {
      width: 99%;
      height: auto;
      background: #FFFFFF;
      margin: 10px auto;
      padding: 20px 0px;
      border-radius: 10px;
      color: rgba(0, 0, 0, .65);
      .step {
        margin: 10px 30px;
      }
    }
    .detailsBottom {
      width: 99%;
      height: auto;
      background: #FFFFFF;
      margin: 10px auto;
      padding: 20px 0px;
      border-radius: 10px;
      color: rgba(0, 0, 0, .65);
      .content {
        width: 95%;
        height: auto;
        margin: 10px auto;
        .el-tabs {
          width: 79vw;
        }
      }
    }
    i{
      cursor: pointer;
    }
  }
</style>
