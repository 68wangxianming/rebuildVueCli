<template>
  <div class="loan-details">
    <div class="detailsTop">
      <div class="top">
        <div class="personTitle">SISKA KRISDIAN NINGRUM - Rp1,000,000.00 - 15*D/</div>
        <div>
          <el-button size="small" type="primary">推送</el-button>
        </div>
      </div>
      <div class="middle">
        <div class="item">
          <div><span>订单ID：</span> <span class="val">P20181116122409</span></div>
          <div><span>借款金额：</span> <span class="val">Rp 1,000,000</span></div>
          <div><span>申请期限：</span> <span class="val">15天</span></div>
          <div><span>借款目的：</span> <span class="val">学费</span></div>
          <div><span>电话审核结果：</span> <span class="val">还未电核</span></div>
        </div>

        <div class="item">
          <div><span>用户ID：</span> <span class="val">U20181116122409</span></div>
          <div><span>手机号：</span> <span class="val">8201811160</span></div>
          <div><span>客户状态：</span> <span class="val">新贷</span></div>
          <div><span>风控结果：</span> <span class="val">不合格</span></div>
        </div>

        <div class="item">
          <div><span>状态</span> <span class="val"></span></div>
          <div><span>待审核：</span> <span class="val">8201811160</span></div>
          <div><span>修改于：</span> <span class="val">2018-11-15 17:12:21</span></div>
        </div>
      </div>
    </div>
    <div class="detailsMiddle">
      <div class="step">
        <el-steps :active="2" finish-status="success">
          <el-step title="创建" description="2018-11-23 10:46:28"></el-step>
          <el-step title="提交" description="2018-11-23 10:47:33"></el-step>
          <el-step title="审核通过" description="2018-11-23 10:47:56"></el-step>
          <el-step title="放款" description="2018-11-23 10:47:56"></el-step>
          <el-step title="还款" description="2018-11-23 10:47:56"></el-step>
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
        activeName: '1'
      }
    },
    created() {

    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
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
