import Vue from 'vue'
import App from './App.vue'
import router from "./router/index";
import store from "./store/store.js";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import NetworkHandler from "./plugins/NetworkHandler";
import NetworkConfig from "./apis/NetworkConfig"
import VueI18n from 'vue-i18n'
import './assets/icon/iconfont.css'
import './assets/css/rest.css'
import Function from './plugins/index'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import enLocale from 'element-ui/lib/locale/lang/en'
import idLocale from 'element-ui/lib/locale/lang/id'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import locale from 'element-ui/lib/locale'

Vue.config.productionTip = false;//作用是阻止 vue 在启动时生成生产提示
Vue.prototype.$Func = Function
Vue.use(ElementUI);
Vue.use(NetworkHandler, NetworkConfig);
Vue.use(VueI18n)
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
})
// console.log("Running App version " + CONSTANTS.APP_VERSION);
let langer;
if(localStorage.getItem('language') == 'id-US') {
  langer = 'id-US'
  locale.use(idLocale)
}else if(localStorage.getItem('language') == 'zh-CN') {
  langer = 'zh-CN'
  locale.use(zhLocale)
}else {
  langer = 'en-US'
  locale.use(enLocale)
}

const i18n = new VueI18n({
  locale: langer,    // 语言标识
  messages: {
    'zh-CN': require('./language/zh'),   // 中文语言包
    'en-US': require('./language/en'),  // 英文语言包
    'id-US': require('./language/id')    // 印尼语言包
  }
});

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount("#app");
