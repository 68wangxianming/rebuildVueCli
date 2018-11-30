import Vue from 'vue'
import App from './App.vue'
import router from "./router/index";
import store from "./store/store.js";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import NetworkHandler from "./plugins/NetworkHandler";
import NetworkConfig from "./apis/NetworkConfig"
import './assets/icon/iconfont.css'
import './assets/css/rest.css'
import Function from './plugins/index'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import i18n from "./language"

Vue.config.productionTip = false;//作用是阻止 vue 在启动时生成生产提示
Vue.prototype.$Func = Function
Vue.use(ElementUI);
Vue.use(NetworkHandler, NetworkConfig);
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
})
// console.log("Running App version " + CONSTANTS.APP_VERSION);

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount("#app");
