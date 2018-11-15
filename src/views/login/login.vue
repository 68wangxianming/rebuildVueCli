<template>
  <div class="login">
    <div class="login-form">
      <div class="login-header">
        <img src="../../assets/superman.gif" width="100" height="100" alt="">
        <p>Welcome to Management System!</p>
      </div>
      <el-form :model="user" :rules="rules" ref="loginForm">
        <el-form-item prop="email">
          <el-input
            placeholder="请输入用户名"
            suffix-icon="el-icon-search"
            v-model="user.email"
          >
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            suffix-icon="el-icon-view"
            v-model="user.password"
            type="password"
          >
          </el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-input
            placeholder="请输图形验证码"
            v-model="user.code"
          >
            <template slot="append">
              <span v-html="captcha" @click="changeCaptcha"></span>
            </template>
          </el-input>
        </el-form-item>

      </el-form>

      <el-button
        type="primary" :loading="loginLoading"
        style="width: 100%;margin-bottom: 18px"
        @click.native="login"
      >登录
      </el-button>
      <div>
        <el-checkbox v-model="Remenber"> Remenber</el-checkbox>
        <a href="javascript:;" style="float: right;color: #3C8DBC;font-size: 14px">Register</a>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        adminName: '',
        captcha: "",
        uuid: '',
        Remenber: true,
        loginLoading: false,
        user: {
          email: '',
          password: '',
          captcha: ''
        },
        rules: {
          email: [
            {required: true, message: '用户名不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ],
          code: [
            {required: true, message: '图形验证码不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.getCaptcha()
    },
    methods: {
      getCaptcha() {
        this.$api.sendRequest('captcha', {width: 120, height: 30, fontSize: 25}).then(res => {
          this.uuid = res.data && res.data.uuid || null;
          this.captcha = res.data && res.data.captcha || null;
          // this.$store.commit('UPDATE_USERNAME', this.uuid);
        })
      },
      login() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            let loginInfo = {
              email: this.user.email,
              password: this.user.password,
              captcha: this.user.code,
              uuid: this.uuid
            };
            this.$api.sendRequest('login', loginInfo).then(res => {
              this.adminName = res.data.adminInfo.name
              let accessToken = res.data && res.data.accessToken || null;
              if (!accessToken) {
                alert('请求失败')
                return false;
              } else {
                localStorage.setItem("adminName", this.adminName);
                this.$store.commit('UPDATE_ADMIN_TOKEN', accessToken);
                this.$router.push('/menu/home')
              }
            })
          }
        })

      },
      changeCaptcha() {
        this.getCaptcha();
      }
    }
  }
</script>

<style scoped lang="less">
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgba(64, 78, 103, 1);
    .login-form {
      width: 375px;
      height: 400px;
      padding: 30px;
      background-color: white;
      text-align: left;
      border-radius: 4px;
      position: relative;
      margin-left: 0;
      margin-right: 0;
      zoom: 1;
      display: block;
      .login-header {
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 20px;
      }
    }
  }
</style>
