<template>
  <div>

    <label v-for="menu in navMenus">

      <el-menu-item v-if="!menu.children" :key="menu.id" :data="menu" :index="menu.index">
        <i :class="menu.icon"></i>
        <span slot="title">{{$t('message.'+menu.title)}}</span>
      </el-menu-item>


      <el-submenu v-if="menu.children" :key="menu.id" :data="menu" :index="menu.index">

        <template slot="title">
          <i :class="menu.icon"></i>
          <span>{{$t('message.'+menu.title)}}</span>
        </template>

        <NavMenu :navMenus="menu.children"></NavMenu>

      </el-submenu>

    </label>

  </div>
</template>

<script>
  export default {
    name: 'NavMenu',
    props: ['navMenus'],
    data(){
      return {}
    }

  }
</script>

<style scoped>

</style>
