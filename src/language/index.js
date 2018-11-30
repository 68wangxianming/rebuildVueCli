import Vue from "vue"
import VueI18n from "vue-i18n"
import enLocale from 'element-ui/lib/locale/lang/en'
import idLocale from 'element-ui/lib/locale/lang/id'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import locale from 'element-ui/lib/locale'
Vue.use(VueI18n);


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
    'zh-CN': require('./zh'),   // 中文语言包
    'en-US': require('./en'),  // 英文语言包
    'id-US': require('./id')    // 印尼语言包
  }
});

export default i18n
