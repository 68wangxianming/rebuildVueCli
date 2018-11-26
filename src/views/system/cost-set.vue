<template>
  <div class="index">
    <template>
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" style="width: 98.5%;">
        <el-tab-pane label="费用模版" name="first">
          <CostTemplate></CostTemplate>
        </el-tab-pane>
        <el-tab-pane label="产品说明" name="second">
          <ProductDescription></ProductDescription>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>
  import CostTemplate from '../../components/costSet/costTemplate.vue'
  import ProductDescription from '../../components/costSet/productDescription.vue'

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
      CostTemplate,
      ProductDescription
    }
  };
</script>

<style scoped lang="less">
  .index {
    padding: 8px;
  }
</style>
