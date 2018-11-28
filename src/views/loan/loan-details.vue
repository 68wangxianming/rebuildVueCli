<template>
  <div class="loan-details">
    <div class="detailsTop">
      <div class="top">
        <div class="personTitle">{{profileInfo.name}} - Rp{{loanInfo.amount}} - {{loanInfo.period}}*D/1</div>
        <div>
          <el-button size="small" type="primary">推送</el-button>
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
            <el-popover
              @show="showPopper('Created')"
              slot="title"
              placement="bottom-start"
              title="操作记录"
              width="500"
              trigger="hover">
              <el-table :data="stepsList">
                <el-table-column property="operatorType" label="操作人"></el-table-column>
                <el-table-column property="action" label="动作"></el-table-column>
                <el-table-column property="createTime" label="时间"></el-table-column>
              </el-table>
              <div slot="reference"><span>创建 </span><i class="header-icon el-icon-info"></i></div>
            </el-popover>
          </el-step>
          <el-step :description="loanInfo.submitTime">
            <el-popover
              @show="showPopper('Submitted')"
              slot="title"
              placement="bottom-start"
              title="操作记录"
              width="500"
              trigger="hover">
              <el-table :data="stepsList">
                <el-table-column property="operatorType" label="操作人"></el-table-column>
                <el-table-column property="action" label="动作"></el-table-column>
                <el-table-column property="createTime" label="时间"></el-table-column>
              </el-table>
              <div slot="reference"><span>提交 </span><i class="header-icon el-icon-info"></i></div>
            </el-popover>
          </el-step>
          <el-step :description="loanInfo.approveTime">
            <el-popover
              @show="showPopper('Approved')"
              slot="title"
              placement="bottom-start"
              title="操作记录"
              width="500"
              trigger="hover">
              <el-table :data="stepsList">
                <el-table-column property="operatorType" label="操作人"></el-table-column>
                <el-table-column property="action" label="动作"></el-table-column>
                <el-table-column property="createTime" label="时间"></el-table-column>
              </el-table>
              <div slot="reference"><span>审核 </span><i class="header-icon el-icon-info"></i></div>
            </el-popover>
          </el-step>
          <el-step :description="loanInfo.fundTime">
            <el-popover
              @show="showPopper('Funded')"
              slot="title"
              placement="bottom-start"
              title="操作记录"
              width="500"
              trigger="hover">
              <el-table :data="stepsList">
                <el-table-column property="operatorType" label="操作人"></el-table-column>
                <el-table-column property="action" label="动作"></el-table-column>
                <el-table-column property="createTime" label="时间"></el-table-column>
              </el-table>
              <div slot="reference"><span>放款 </span><i class="header-icon el-icon-info"></i></div>
            </el-popover>
          </el-step>
          <el-step :description="loanInfo.paidOffTime">
            <el-popover
              @show="showPopper('PaidOff')"
              slot="title"
              placement="bottom-start"
              title="操作记录"
              width="500"
              trigger="hover">
              <el-table :data="stepsList">
                <el-table-column property="operatorType" label="操作人"></el-table-column>
                <el-table-column property="action" label="动作"></el-table-column>
                <el-table-column property="createTime" label="时间"></el-table-column>
              </el-table>
              <div slot="reference"><span>还款 </span><i class="header-icon el-icon-info"></i></div>
            </el-popover>
          </el-step>
        </el-steps>
      </div>
    </div>
    <div class="detailsBottom">
      <div class="content">
        <template>
          <el-tabs v-model="activeName" @tab-click="handleClick" lazy size="small">
            <el-tab-pane label="用户信息" name="1">
              <userInfo></userInfo>
            </el-tab-pane>
            <el-tab-pane label="自拍照" name="2">
              <userPhote></userPhote>
            </el-tab-pane>
            <el-tab-pane label="合同" name="3">
              <contract></contract>
            </el-tab-pane>
            <el-tab-pane label="历史借款订单" name="4">
              <historyLoanOrder></historyLoanOrder>
            </el-tab-pane>
            <el-tab-pane label="借款订单审核记录" name="5">
              <auditRecordLoanOrder></auditRecordLoanOrder>
            </el-tab-pane>
            <el-tab-pane label="规则引擎结果" name="6">
              <ruleEngineResult></ruleEngineResult>
            </el-tab-pane>
            <el-tab-pane label="电核记录" name="7">
              <callRecord></callRecord>
            </el-tab-pane>
            <el-tab-pane label="催核记录" name="8">
              <collectionRecord></collectionRecord>
            </el-tab-pane>
            <el-tab-pane label="客服记录" name="9">
              <customerServiceRecord></customerServiceRecord>
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
      }
    },
    created() {
      this.loanNo = this.$route.query.loanNo || localStorage.getItem("loanNo")
      this.userId = this.$route.query.userId || localStorage.getItem("userId")
      localStorage.setItem("loanNo", this.loanNo);
      localStorage.setItem("userId", this.userId);
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
        this.$api.sendRequest('getLifeCycle', para, {}, true, "loading", this).then(res => {
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
          } else {
            this.$alert('请求失败')
          }
        })
      },
      handleClick(tab, event) {
        console.log(tab, event, '🐔臭逼');
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
  }
</style>
