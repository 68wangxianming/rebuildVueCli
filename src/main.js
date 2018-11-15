import Vue from 'vue'
import App from './App.vue'
import router from "./router/index";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import NetworkHandler from "./plugins/NetworkHandler";
import NetworkConfig from "./apis/NetworkConfig"
import VueI18n from 'vue-i18n'
import './assets/icon/iconfont.css'
import './assets/css/rest.css'
import Function from './plugins/index'

Vue.prototype.$Func = Function
Vue.use(ElementUI);
Vue.use(NetworkHandler, NetworkConfig);
Vue.use(VueI18n)
Vue.config.productionTip = false;//作用是阻止 vue 在启动时生成生产提示
console.log("Running App version " + CONSTANTS.APP_VERSION);

const i18n = new VueI18n({
  locale: 'en',  // 语言标识
  messages: {
    'zh': require('./language/zh'),
    'en': require('./language/en')
  }
})



new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount("#app");
