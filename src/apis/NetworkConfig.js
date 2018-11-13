import Vue from 'vue'

const baseUrl = (location.host != 'www.rupiahone.com' ? 'https://lendingone.yuanstar.com/apis/' : '/apis/')

let config = {

  _beforeHttpFunc: function (para, headers = {}) {
    para = Object.assign({}, {appId: 'yue'}, para)
    return {para, headers}
  },

  _afterHttpFunc: function (res) {
    if (res.code != '200') {
      Vue.$messagebox.alert('网络异常！请稍后再试');
      return null;
    }
    return res.data;
  },

  captcha: {method: 'get', url: 'auth/captcha'}
}

Object.keys(config).forEach(v => config[v].url = baseUrl + config[v].url);
export default config
