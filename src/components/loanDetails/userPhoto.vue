<template>
  <div class="index">
    <div class="baseInfo">
      <div><span class="name">姓名：</span><span>Matthew  Snow</span></div>
      <div><span class="name">性别：</span><span>男</span></div>
      <div><span class="name">年龄：</span><span>28</span></div>
      <div><span class="name">身份证号：</span><span>3273011409810003</span></div>
    </div>
    <div class="imgGrop">
      <template>
        <viewer :images="images" style="display: flex;justify-content: space-between;">
          <img v-for="src in images" :src="src" :key="src">
        </viewer>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        images: [
          "http://oss.tdcloud.trmap.cn/producephoto/1807311736/2c9180845e18bf9b015e19f1d3440010/1248064370052.jpg",
          "http://oss.tdcloud.trmap.cn/producephoto/1807311737/2c9180845e18bf9b015e19f1d3440010/201709260737493750.png"
        ]
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {

      }
    }
  }
</script>

<style scoped lang="less">
  .index {
    margin-top: 20px;
    .baseInfo {
      width: 90%;
      display: flex;
      justify-content: space-between;
      margin: 0 auto;
    }
    .imgGrop{
      img{
        width: 45%;
        height: auto;
      }
    }
  }
</style>
