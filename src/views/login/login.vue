<template>
  <div class="index">
    <p>This is login pages!</p>
    <p>Welcome to here!</p>
    <div class="test">测试前缀</div>
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: "login"
  }
</script>

<style scoped lang="less">
  .index {
    p{
      color: cornflowerblue;
      line-height: 30px;
      letter-spacing: 1px;
    }
    .test{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
  }
</style>
