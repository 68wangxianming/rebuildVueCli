<template>
  <div class="telephoneCollection">
    <div class="contactInfo">
      <h4>个人信息</h4>
      <div class="content">
        <div class="item">
          <p><span class="label">姓名：</span><span>Matthew  Snow</span></p>
          <p><span class="label">手机号：</span><span>8201809020</span></p>
        </div>
        <div class="item">
          <el-checkbox v-model="checked">备选项</el-checkbox>
        </div>
      </div>
    </div>
    <div class="contactInfo">
      <h4>联系人信息</h4>
      <div class="content">
        <div class="item">
          <p><span class="label">联系人1：</span><span>Matthew  Snow</span></p>
          <p><span class="label">亲属关系：</span><span>兄弟姐妹</span></p>
          <p><span class="label">联系电话：</span><span>8201809280</span></p>
        </div>
        <div class="item">
          <el-checkbox v-model="checked">是否催收</el-checkbox>
        </div>
      </div>

      <div class="content">
        <div class="item">
          <p><span class="label">联系人1：</span><span>Matthew  Snow</span></p>
          <p><span class="label">亲属关系：</span><span>兄弟姐妹</span></p>
          <p><span class="label">联系电话：</span><span>8201809280</span></p>
        </div>
        <div class="item">
          <el-checkbox v-model="checked">是否催收</el-checkbox>
        </div>
      </div>
    </div>
    <div class="contactDetails">

    </div>
    <div class="submitGroup">

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checked: true
      };
    }
  }
</script>

<style lang="less">
  .telephoneCollection {
    width: 100%;
    .contactInfo {
      width: 98%;
      height: auto;
      margin: 10px auto;
      h4 {
        border-bottom: 2px solid #F5F5F5;
        line-height: 40px;
      }
      .content {
        display: flex;
        .item {
          margin-right: 70px;
          line-height: 40px;
          letter-spacing: 1px;
          color: rgba(0, 0, 0, 0.65);
          .label {
            display: inline-block;
            min-width: 100px;
          }
        }
      }
    }

  }
</style>
