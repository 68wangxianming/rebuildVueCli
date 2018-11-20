<template>
  <div class="index">
    <template>
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" style="width: 98.5%;">
        <el-tab-pane label="用户信息" name="first">
          <UserInfo></UserInfo>
        </el-tab-pane>
        <el-tab-pane label="角色设置" name="second">
          <RoleSet></RoleSet>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>
  import UserInfo from '../../components/userInfo.vue'
  import RoleSet from '../../components/roleSet.vue'

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
      UserInfo,
      RoleSet
    }
  };
</script>

<style scoped lang="less">
  .index {
    padding: 8px;
  }
</style>
