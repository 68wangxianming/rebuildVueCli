export default {
  '/login': {
    name: 'login',
    meta: {title: 'login'},
    component: (resolve) => {
      require(['@views/login/login.vue'], resolve)
    }
  },
  '/': {
    name: 'index',
    meta: {title: 'index'},
    component: (resolve) => {
      require(['@views/layout/index.vue'], resolve)
    },
    children: [
      {
        meta: ['系统管理', '用户信息'],
        path: 'user-role',
        component: (resolve) => {
          require(['@views/system/user-role.vue'], resolve)
        }
      },
      {
        meta: ['系统管理', '参数与规则'],
        path: 'rule-set',
        component: (resolve) => {
          require(['@views/system/rule-set.vue'], resolve)
        }
      },
      {
        meta: ['系统管理', '费用设置'],
        path: 'cost-set',
        component: (resolve) => {
          require(['@views/system/cost-set.vue'], resolve)
        }
      },
      {
        meta: ['系统管理', '短信设置'],
        path: 'sort-set',
        component: (resolve) => {
          require(['@views/system/sort-set.vue'], resolve)
        }
      },
    ]
  },
}
