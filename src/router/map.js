export default {
  '/': {
    name: 'test',
    meta: {title: 'test'},
    component: (resolve) => {
      require(['@views/test.vue'], resolve)
    }
  },
  '/login': {
    name: 'login',
    meta: {title: 'login'},
    component: (resolve) => {
      require(['@views/login/login.vue'], resolve)
    }
  },
}
