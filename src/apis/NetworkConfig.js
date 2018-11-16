import Vue from 'vue'
import store from "../store/store.js";

const baseUrl = (location.host != 'www.rupiahone.com' ? 'https://lendingone.yuanstar.com/adminapi/' : '/api/')


let config = {
  _beforeHttpFunc: function (para, headers) {

    store.dispatch("FLASH_ADMIN_TOKEN")
    store.state.adminToken && (headers = {Authorization: 'Bearer ' + store.state.adminToken, ...headers});

    if (para instanceof FormData)
      return {para, headers};
    para = Object.assign({}, {appId: 'yue'}, para)
    return {para, headers}
  },

  _afterHttpFunc: function (res) {
    if (res.code != '200') {
      Vue.prototype.$alert('网络异常！请稍后再试');
      return null;
    }
    return res;
  },

  captcha: {method: 'get', url: '/api/captcha'},
  login: {method: 'post', url: '/api/adminLogin'},
  searchAdminList: {method: 'post', url: '/api/searchAdminList'},
  getRoleList: {method: 'get', url: '/api/getRoleList'},
  updateAdmin: {method: 'post', url: '/api/updateAdmin'},
  addAdmin: {method: 'post', url: '/api/addAdmin'},
  deleteAdmin: {method: 'delete', url: '/api/deleteAdmin'},



}

Object.keys(config).forEach(v => config[v].url = baseUrl + config[v].url);
export default config
