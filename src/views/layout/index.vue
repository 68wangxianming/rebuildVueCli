<template>
  <div class="index">
    <div class="layout-left">
      <div class="logo">
        <span class="name">Management System</span>
      </div>
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
               :collapse="isCollapse" background-color="#222d32"
               text-color="#fff"
               active-text-color="#ffd04b"
               router>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>系统管理</span>
          </template>
          <el-menu-item index="user-role">用户与角色</el-menu-item>
          <el-menu-item index="rule-set">参数与规则</el-menu-item>
          <el-menu-item index="cost-set">费用设置</el-menu-item>
          <el-menu-item index="sort-set">短信设置</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>借款管理</span>
          </template>
          <el-menu-item index="2-1">用户与角色</el-menu-item>
          <el-menu-item index="2-2">参数与规则</el-menu-item>
          <el-menu-item index="2-3">费用设置</el-menu-item>
          <el-menu-item index="2-4">短信设置</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>借款管理</span>
          </template>
          <el-menu-item index="3-1">用户与角色</el-menu-item>
          <el-menu-item index="3-2">参数与规则</el-menu-item>
          <el-menu-item index="3-3">费用设置</el-menu-item>
          <el-menu-item index="3-4">短信设置</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>借款列表</span>
          </template>
          <el-menu-item index="4-1">用户与角色</el-menu-item>
          <el-menu-item index="4-2">参数与规则</el-menu-item>
          <el-menu-item index="4-3">费用设置</el-menu-item>
          <el-menu-item index="4-4">短信设置</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="layout-right">
      <div class="layout-nav">
        <i @click="shrink" id="shrink" class="iconfont icon-fold topfont" style=""></i>
        <el-dropdown class="righticon">
          <span class="el-dropdown-link">
            <i class="iconfont icon-user-o topfont "></i>
            Admin
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item>重置密码</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown class="righticon" style="margin-right: -10px;">
          <span class="el-dropdown-link">
                   <i class="iconfont icon-lvzhou_yuyanqiehuan topfont righticon"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>中 文</el-dropdown-item>
            <el-dropdown-item>English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <i class="iconfont icon-quanping topfont righticon" @click="buttoncli"></i>
        <i class="iconfont icon-shezhi topfont righticon"></i>

      </div>
      <NavBar id="nav-bar"></NavBar>
      <div class="layout-content">
        <transition name="move" mode="out-in">
          <router-view style="min-height: 100%;"></router-view>
        </transition>

      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from './NavBar.vue'
  import screenfull from 'screenfull'

  export default {
    data() {
      return {
        isCollapse: false,
        isFullscreen: false,
        switchTabBar: true,
        fixedTabBar: true,
      };
    },
    created() {
      this.nowDate = new Date();
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      shrink() {
        if (!this.isCollapse) {
          this.isCollapse = true
          return false
        }
        this.isCollapse = false
      },
      buttoncli() {
        if (!screenfull.enabled) { // 如果不允许进入全屏，发出不允许提示
          this.$message({
            message: '不支持全屏',
            type: 'warning'
          })
          return false
        }
        screenfull.toggle()
      }

    },
    components: {
      NavBar,
    }
  }
</script>

<style scoped lang="less">
  .index {
    display: flex;
    width: 100%;
    .layout-left {
      width: 230px;
      height: auto;
      .logo {
        width: 230px;
        height: 64px;
        text-align: center;
        line-height: 64px;
        color: #fff;
        font-weight: bolder;
        font-size: 18px;
        background-color: #424E65;
        transition: all 0.3s ease-in-out;
      }
      .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 230px;
        height: 100%;
      }
    }
    .layout-right {
      flex: 1;
      background: #f0f2f5;
      .layout-nav {
        width: 100%;
        height: 64px;
        background: ghostwhite;
        #shrink {
          padding-left: 24px;
        }
        .topfont {
          line-height: 64px;
          cursor: pointer;
          color: rgba(0, 0, 0, .65);
          font-size: 20px;
        }
        .righticon {
          float: right;
          margin-right: 25px;
        }
      }
      .layout-content{
        position: relative;
        margin: 8px;
        min-height: calc(100vh - 120px);
        background: #fff;
      }
    }
  }

</style>
