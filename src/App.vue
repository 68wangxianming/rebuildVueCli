<template>
  <div class="index">
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

<style lang="less">

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

  .detailsBottom .el-tabs__item {
    font-size: 15px !important;
    letter-spacing: 1px;
  }

  .telephoneCollection .el-tabs__item{
    height: 50px;
    line-height: 50px;
    font-size: 18px !important;
    letter-spacing: 1px;
  }

  .el-step__head.is-success {
    color: #409EFF !important;
    border-color: #409EFF !important;
  }

  .el-step__description.is-success {
    color: #409EFF !important;
  }

  .el-step__title.is-success {
    color: #409EFF !important;
  }
</style>
