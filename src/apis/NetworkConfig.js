import Vue from 'vue'
import store from "../store/store.js";
// const baseUrl = (location.host != 'www.rupiahone.com' ? 'https://lendingone.yuanstar.com/adminapi/' : '/api/')
const baseUrl = (location.host != 'www.rupiahone.com' ? 'http://admin-api.dev.yuanstar.com' : '/api/')
Vue.prototype.$baseUrl = baseUrl

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
      Vue.prototype.$alert(res.msg || (res.error && res.error.msg) || "网络异常");
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
  saveRole: {method: 'post', url: '/api/saveRole'},
  removeRole: {method: 'delete', url: '/api/removeRole'},
  getAdminAuth: {method: 'get', url: '/api/getAdminAuth'},
  getSysConfig: {method: 'get', url: '/api/getSysConfig'},
  saveSysConfig: {method: 'post', url: '/api/saveSysConfig'},
  removeSysConfig: {method: 'get', url: '/api/removeSysConfig'},
  getRejectConfig: {method: 'get', url: '/api/getRejectConfig'},
  saveRejectConfig: {method: 'post', url: '/api/saveRejectConfig'},
  removeRejectConfig: {method: 'delete', url: '/api/removeRejectConfig'},
  getFeeTemplate: {method: 'get', url: '/api/getFeeTemplate'},
  saveFeeTemplate: {method: 'post', url: '/api/saveFeeTemplate'},
  removeFeeTemplate: {method: 'delete', url: '/api/removeFeeTemplate'},
  getProductConfig: {method: 'get', url: '/api/getProductConfig'},
  saveProductConfig: {method: 'post', url: '/api/saveProductConfig'},
  getNotifyType: {method: 'get', url: '/api/getNotifyType'},
  saveNotifyTemplate: {method: 'post', url: '/api/saveNotifyTemplate'},
  getNotifyTemplate: {method: 'get', url: '/api/getNotifyTemplate'},
  removeNotifyTemplate: {method: 'delete', url: '/api/removeNotifyTemplate'},
  getSmsConfig: {method: 'get', url: '/api/getSmsConfig'},
  saveSmsConfig: {method: 'post', url: '/api/saveSmsConfig'},
  getUser: {method: 'get', url: '/api/getUser'},
  exportUser: {method: 'get', url: '/api/exportUser'},
  forbiddenUser: {method: 'get', url: '/api/forbiddenUser'},//禁用
  enableUser: {method: 'get', url: '/api/enableUser'},//启用
  blockUser: {method: 'get', url: '/api/blockUser'},
  unblockUser: {method: 'get', url: '/api/unblockUser'},
  getLoanList: {method: 'get', url: '/api/getLoanList'},
  getLoanInfo: {method: 'get', url: '/api/getLoanInfo'},
  getLifeCycle: {method: 'get', url: '/api/getLifeCycle'},

  getProfile: {method: 'get', url: '/api/getProfile'},
  getJob: {method: 'get', url: '/api/getJob'},
  getContact: {method: 'get', url: '/api/getContact'},
  getBankCard: {method: 'get', url: '/api/getBankCard'},

  getTelQuestions: {method: 'get', url: '/api/getTelQuestions'},
  insertTelResult: {method: 'post', url: '/api/insertTelResult'},
  getTelResultList: {method: 'get', url: '/api/getTelResultList'},
  getTelResultInfo: {method: 'get', url: '/api/getTelResultInfo'},

  cancelLoan: {method: 'post', url: '/api/cancelLoan'},
  sendManual: {method: 'post', url: '/api/sendManual'},//待审核
  approveLoan: {method: 'post', url: '/api/approveLoan'},//待电核
  confirmLoan: {method: 'post', url: '/api/confirmLoan'},//待放款
  fundApproveLoan: {method: 'post', url: '/api/fundApproveLoan'},//同意放款
  rejectLoan: {method: 'post', url: '/api/rejectLoan'},//审核拒绝
  telRejectLoan: {method: 'post', url: '/api/telRejectLoan'},//电核拒绝
  fundRejectLoan : {method: 'post', url: '/api/fundRejectLoan '},//放款拒绝
  reFundLoan  : {method: 'post', url: '/api/reFundLoan  '},//重新放款

  addCustomRecord  : {method: 'post', url: '/api/addCustomRecord'},//新增客服
  getCustomRecord  : {method: 'get', url: '/api/getCustomRecord'},//客服列表
  saveCustomRecord  : {method: 'post', url: '/api/saveCustomRecord'},//修改客服列表
  getSmsRecord  : {method: 'get', url: '/api/getSmsRecord'},//修改客服列表
  sendCollectSms  : {method: 'post', url: '/api/sendCollectSms'},
  addCollectRecord  : {method: 'post', url: '/api/addCollectRecord'},
  getCollectRecord  : {method: 'get', url: '/api/getCollectRecord'},
  changePasswd  : {method: 'post', url: '/api/changePasswd'},
}

Object.keys(config).forEach(v => config[v].url = baseUrl + config[v].url);
export default config

