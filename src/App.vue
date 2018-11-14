<template>
  <div class="index">
    <div class="logoImg"></div>
    <h1>唐山三百首</h1>
    <p>锄禾日当午</p>
    <p>汗滴禾下土</p>
    <p>谁知盘中餐</p>
    <p>粒粒皆辛苦</p>
    <h1>{{$t("m.name")}}</h1>
    <img src="./assets/superman.gif" alt="">
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        transitionName: 'slide-left'
      }
    },
    created() {
      this.captcha()
    },
    watch: {
      '$route'(to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    },
    methods: {
      captcha() {
        // this.$api.sendRequest('captcha').then(res => {
        //   console.log(res, '验证码');
        // })
      }
    },
  }
</script>

<style scoped lang="less">
  .index {
    background-color: azure;
    .logoImg {
      width: 100px;
      height: 100px;
      background: url("./assets/webpack.png");
      background-size: 100% 100%;
    }
    h1 {
      color: red;
    }
    p {
      color: aquamarine;
    }
    img {
      width: 100px;
      height: 100px;
    }

    .haha {
      width: 100px;
      height: 100px;
    }
    .good{
      color: red;
    }
    .bad{
      color: red;
    }

    .child-view {
      position: absolute;
      transition: all .4s cubic-bezier(.55, 0, .1, 1);
    }

    .slide-left-enter, .slide-right-leave-active {
      opacity: 0;
      -webkit-transform: translate(30px, 0);
      transform: translate(30px, 0);
    }

    .slide-left-leave-active, .slide-right-enter {
      opacity: 0;
      -webkit-transform: translate(-30px, 0);
      transform: translate(-30px, 0);
    }
  }
</style>
