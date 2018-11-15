import Vue from 'vue'

const baseUrl = (location.host != 'www.rupiahone.com' ? 'https://lendingone.yuanstar.com/adminapi/' : '/api/')

let config = {

  _beforeHttpFunc: function (para, headers = {}) {
    if (para instanceof FormData)
      return {para, headers};
    para = Object.assign({}, {appId: 'yue'}, para)
    return {para, headers}
  },

  _afterHttpFunc: function (res) {
    if (res.code != '200') {
      alert('网络异常！请稍后再试');
      return null;
    }
    return res;
  },

  captcha: {method: 'get', url: '/api/captcha'},
  login: {method: 'post', url: '/api/adminLogin'}

}

Object.keys(config).forEach(v => config[v].url = baseUrl + config[v].url);
export default config
