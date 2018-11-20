import Vue from 'vue'
import store from "../store/store.js";

// const baseUrl = (location.host != 'www.rupiahone.com' ? 'https://lendingone.yuanstar.com/adminapi/' : '/api/')
const baseUrl = (location.host != 'www.rupiahone.com' ? 'http://admin-api.dev.yuanstar.com' : '/api/')


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
      Vue.prototype.$alert(res.msg || (res.error&& res.error.msg) || "网络异常");
      return null;
    }
    return res;
  },

  captcha: {method: 'get', url: '/api/captcha'},
  login: {method: 'post', url: '/api/adminLogin'},
  getAdminList: {method: 'get', url: '/api/getAdminList'},
  getRoleList: {method: 'get', url: '/api/getRoleList'},
  updateAdmin: {method: 'post', url: '/api/updateAdmin'},
  addAdmin: {method: 'post', url: '/api/addAdmin'},
  deleteAdmin: {method: 'delete', url: '/api/deleteAdmin'},
  getAuthTree: {method: 'get', url: '/api/getAuthTree'},
  saveRole:{method:'post',url:'/api/saveRole'},
  removeRole:{method:'delete',url:'/api/removeRole'},
  getAdminAuth:{method:'get',url:'/api/getAdminAuth'},
  getSysConfig:{method:'get',url:'/api/getSysConfig'},
  saveSysConfig:{method:'post',url:'/api/saveSysConfig'},
  removeSysConfig:{method:'get',url:'/api/removeSysConfig'},
  getRejectConfig:{method:'get',url:'/api/getRejectConfig'},
  saveRejectConfig:{method:'post',url:'/api/saveRejectConfig'},
  removeRejectConfig:{method:'delete',url:'/api/removeRejectConfig'},



}

Object.keys(config).forEach(v => config[v].url = baseUrl + config[v].url);
export default config
