<template>
  <div class="index">
    <template>
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" style="width: 98.5%;">
        <el-tab-pane  :label="$t('m.label44')" name="first">
          <ParamsSet></ParamsSet>
        </el-tab-pane>
        <el-tab-pane :label="$t('m.label45')" name="second">
          <RefuseType></RefuseType>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>
  import ParamsSet from '../../components/paramsRules/paramsSet.vue'
  import RefuseType from '../../components/paramsRules/RefuseType.vue'

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
      ParamsSet,
      RefuseType
    }
  };
</script>

<style scoped lang="less">
  .index {
    padding: 8px;
  }
</style>
