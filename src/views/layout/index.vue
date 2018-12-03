<template>
  <div class="index" v-loading="loading">
    <div class="layout-left">
      <div class="logo">
        <span class="name">Management System</span>
      </div>
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
               :collapse="isCollapse" background-color="#222d32"
               text-color="#fff"
               active-text-color="#ffd04b"
               router>
        <!--<el-submenu index="1">-->
        <!--<template slot="title">-->
        <!--<i class="el-icon-location"></i>-->
        <!--<span>系统管理</span>-->
        <!--</template>-->
        <!--<el-menu-item index="user-role">用户与角色</el-menu-item>-->
        <!--<el-menu-item index="params-rules">参数与规则</el-menu-item>-->
        <!--<el-menu-item index="cost-set">费用设置</el-menu-item>-->
        <!--<el-menu-item index="notify-set">通知设置</el-menu-item>-->
        <!--</el-submenu>-->
        <!--<el-submenu index="2">-->
        <!--<template slot="title">-->
        <!--<i class="el-icon-menu"></i>-->
        <!--<span>借款管理</span>-->
        <!--</template>-->
        <!--<el-menu-item index="loan-user-manage">借款用户管理</el-menu-item>-->
        <!--<el-menu-item index="loan-order-manage">借款订单管理</el-menu-item>-->
        <!--</el-submenu>-->
        <!--<el-submenu index="3">-->
        <!--<template slot="title">-->
        <!--<i class="el-icon-document"></i>-->
        <!--<span>统计管理</span>-->
        <!--</template>-->
        <!--<el-menu-item index="operation-analyze">业务统计</el-menu-item>-->
        <!--<el-menu-item index="income-analyze">收益统计</el-menu-item>-->
        <!--</el-submenu>-->
        <NavMenu :nav-menus="authList"></NavMenu>
      </el-menu>
    </div>
    <div class="layout-right">
      <div class="layout-nav">
        <!--<i @click="shrink" id="shrink" class="iconfont icon-fold topfont" style=""></i>-->
        <el-dropdown class="righticon" @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="iconfont icon-user-o topfont "></i>
            {{userName}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item command="resetPassword">重置密码</el-dropdown-item>
            <el-dropdown-item command="logOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown class="righticon" style="margin-right: -10px;">
          <span class="el-dropdown-link">
            <i class="iconfont icon-lvzhou_yuyanqiehuan topfont righticon"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="chineseChange">中 文</el-dropdown-item>
            <el-dropdown-item @click.native="englishChange">English</el-dropdown-item>
            <el-dropdown-item @click.native="idChange">id</el-dropdown-item>
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
    <AddPopup PopupTitle="修改密码" :showPopUp="showPopUp" @saveForm="saveForm" @closePopup="closePopup"
              @before-close="beforeClose">
      <el-form :rules="rules" ref="form" :model="form" label-width="80px">
        <el-form-item label="旧密码" prop="oldPass">
          <el-input v-model="form.oldPass" size="small"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input v-model="form.newPass" size="small"></el-input>
        </el-form-item>
      </el-form>
    </AddPopup>
  </div>
</template>

<script>
  import NavBar from './NavBar.vue'
  import screenfull from 'screenfull'
  import NavMenu from '../../components/navMenu.vue'
  import AddPopup from '../../components/addPopup.vue'
  import locale from 'element-ui/lib/locale'
  import enLocale from 'element-ui/lib/locale/lang/en'
  import idLocale from 'element-ui/lib/locale/lang/id'
  import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

  export default {
    data() {
      return {
        showPopUp: false,
        isCollapse: false,
        isFullscreen: false,
        switchTabBar: true,
        fixedTabBar: true,
        authList: [],
        userName: '',
        loading: false,
        rules: {
          oldPass: [
            {required: true, message: '旧密码不能为空', trigger: 'blur'}
          ],
          newPass: [
            {required: true, message: '旧密码不能为空', trigger: 'blur'}
          ],
        },
        form: {
          oldPass: '',
          newPass: '',
        },
      };
    },
    created() {
      this.getAdminAuth()
      this.userName = localStorage.getItem("adminInfo") && JSON.parse(localStorage.getItem("adminInfo")).name || 'Admin';
    },
    methods: {
      getAdminAuth() {
        this.$api.sendRequest('getAdminAuth').then(res => {
          this.authList = res.data.authList
        })
      },
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
      },
      handleCommand(command) {
        if (command == 'resetPassword') {
          this.showPopUp = true
        } else if (command == 'logOut') {
          this.$message({
            message: '退出成功',
            type: 'success'
          });
          localStorage.clear()
          setTimeout(() => {
            this.$router.push('login')
          }, 300)
        }
      },
      closePopup() {
        this.showPopUp = false
      },
      beforeClose(done) {
        this.showPopUp = false;
        done && done();
      },
      saveForm() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$api.sendRequest('changePasswd', {
              oldPass: this.form.oldPass,
              newPass: this.form.newPass,
            }).then(res => {
              if (res.code == 200) {
                this.showPopUp = false;
                this.$message({
                  message: this.$t('m.label31'),
                  type: 'success'
                });
                localStorage.clear()
                setTimeout(() => {
                  this.$router.push('login')
                }, 300)
              } else {
                this.$message.error(this.$t('m.label30'));
              }
            });
          }
        })
      },
      englishChange() {
        this.loading = true
        this.$i18n.locale = 'en-US'
        window.localStorage.setItem('language', 'en-US')
        locale.use(enLocale)
        setTimeout(() => {
          this.$router.go(0);
          this.loading = false
        }, 500)
      },
      chineseChange() {
        this.loading = true
        this.$i18n.locale = 'zh-CN'
        window.localStorage.setItem('language', 'zh-CN')
        locale.use(zhLocale)
        setTimeout(() => {
          this.$router.go(0);
          this.loading = false
        }, 500)
      },
      idChange() {
        this.loading = true
        this.$i18n.locale = 'id-US'
        window.localStorage.setItem('language', 'id-US')
        locale.use(idLocale)
        setTimeout(() => {
          this.$router.go(0);
          this.loading = false
        }, 500)
      }

    },
    components: {
      NavBar,
      NavMenu,
      AddPopup
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
      .layout-content {
        position: relative;
        margin: 8px;
        min-height: calc(100vh - 120px);
        background: #fff;
      }
    }

    .el-input {
      width: 250px;
    }
  }

</style>
