import Vue from 'vue'
import App from './App.vue'
import router from "./router/index";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import NetworkHandler from "./plugins/NetworkHandler";
import NetworkConfig from "./apis/NetworkConfig"

Vue.use(ElementUI);
Vue.use(NetworkHandler, NetworkConfig);
Vue.config.productionTip = false;//作用是阻止 vue 在启动时生成生产提示
console.log("Running App version " + CONSTANTS.APP_VERSION);


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
