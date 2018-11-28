<template>
  <div class="telephoneDetails">
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
    <div class="middle">
      <h4 class="title">
        电话详情
      </h4>
      <div class="content">
        <div class="item">
          <p>1、您是XX吗？</p>
        </div>
      </div>
    </div>
    <div class="bottom">
      <span>电核结果:</span>
      <el-input placeholder="请选择日期" suffix-icon="el-icon-date" v-model="input2"></el-input>
      <el-button type="primary">提交</el-button>
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
        input2: '',
      }
    }
  }
</script>

<style scoped lang="less">
  .telephoneDetails {
    width: 98%;
    margin: 0 auto;
    .top {
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
      .title {
        height: 40px;
        border-bottom: 1px solid gainsboro;
        line-height: 40px;
        text-indent: 5px;
        letter-spacing: 1px;
        margin: 30px auto;
      }
      .content{
        font-size: 14px;
      }
    }
    .bottom {
      width: 100%;
      height: 100px;
      background-color: #EBF6FE;
      line-height: 100px;
      span{
        margin-left: 15px;
      }
      .el-input{
        width: 200px;
        margin-left: 15px;
      }
      .el-button{
        margin-left: 15px;
      }
    }
  }
</style>
