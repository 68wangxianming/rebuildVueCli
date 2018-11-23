<template>
  <div class="index">
    <div class="item">
      <h4 class="title">个人信息</h4>
      <p><span>姓名：</span><span>Matthew  Snow</span></p>
      <p><span>性别：</span><span>男</span></p>
      <p><span>年龄：</span><span>28</span></p>
      <p><span>身份证号：</span><span>3273011409810003</span></p>
      <p><span>邮箱：</span><span>matthew@gmail.com</span></p>
      <p><span>学历：</span><span>S1</span></p>
      <p><span>婚姻状况：</span><span>已婚</span></p>
      <p><span>居住地址：</span><span>Bali, Denpasar,</span></p>
      <p><span>详细地址：</span><span>alan kusuma dewa 2 no 3</span></p>
    </div>

    <div class="item">
      <h4 class="title">联系方式</h4>
      <p><span>职业：</span><span>卡车司机</span></p>
      <p><span>月收入：</span><span>Rp 5,000,000</span></p>
      <p><span>工作年限：</span><span>3年</span></p>
      <p><span>公司名称：</span><span>pt. mekanika periangan</span></p>
      <p><span>公司电话：</span><span>226034766</span></p>
      <p><span>工作地址：</span><span>Bali, Denpasar,</span></p>
      <p><span>详细地址：</span><span>alan kusuma dewa 2 no 3</span></p>
    </div>

    <div class="item">
      <h4 class="title">联系人信息</h4>
      <p><span>联系人1：</span><span>Jason  Snow</span></p>
      <p><span>亲属关系：</span><span>兄弟姐妹</span></p>
      <p><span>联系电话：</span><span>8201809280</span></p>
      <p><span>联系人2：</span><span>Jackson  Snow</span></p>
      <p><span>亲属关系：</span><span>兄弟姐妹</span></p>
      <p><span>联系电话：</span><span>8201809280</span></p>
    </div>

    <div class="item">
      <h4 class="title">银行卡信息</h4>
      <p><span>所属银行：</span><span>BCA</span></p>
      <p><span>银行卡号：</span><span>3771241091</span></p>
      <p><span>电话：</span><span>8201809280</span></p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    created() {

    },
    methods: {}
  }
</script>

<style scoped lang="less">
  .index{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;
    .item{
      width: 43%;
      border: 1px solid #e8e8e8;
      border-radius: 5px;
      margin-bottom: 20px;
      padding: 5px 25px 25px 15px;
      line-height: 30px;
      h4{
        border-bottom: 1px solid #e8e8e8;
        font-size: 16px;
        line-height: 40px;
      }
    }
  }
</style>
