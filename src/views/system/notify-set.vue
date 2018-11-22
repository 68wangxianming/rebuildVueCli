<template>
  <div class="index">
    <template>
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" style="width: 98.5%;">
        <el-tab-pane label="通知模版" name="first">
          <NoticeTemplate></NoticeTemplate>
        </el-tab-pane>
        <el-tab-pane label="短信服务" name="second">
          <ProductDescription></ProductDescription>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>
  import NoticeTemplate from '../../components/noticeTemplate.vue'
  import ProductDescription from '../../components/productDescription.vue'

  export default {
    data() {
      return {
        activeName: 'first',
      };
    },
    methods: {
      handleClick(tab, event) {
      },
    },
    components: {
      NoticeTemplate,
      ProductDescription
    }
  };
</script>

<style scoped lang="less">
  .index {
    padding: 8px;
  }
</style>
