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
        path: 'params-rules',
        component: (resolve) => {
          require(['@views/system/params-rules.vue'], resolve)
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
        meta: ['系统管理', '通知设置'],
        path: 'notify-set',
        component: (resolve) => {
          require(['@views/system/notify-set.vue'], resolve)
        }
      },
      {
        meta: ['借款管理', '借款用户管理'],
        path: 'loan-user-manage',
        component: (resolve) => {
          require(['@views/loan/loan-user-manage.vue'], resolve)
        }
      },
      {
        meta: ['借款管理', '借款订单管理'],
        path: 'loan-order-manage',
        component: (resolve) => {
          require(['@views/loan/loan-order-manage.vue'], resolve)
        }
      },
      {
        meta: ['借款管理', '借款详情'],
        path: 'loan-details',
        component: (resolve) => {
          require(['@views/loan/loan-details.vue'], resolve)
        }
      },
      {
        meta: ['统计管理', '业务统计'],
        path: 'operation-analyze',
        component: (resolve) => {
          require(['@views/analyze/operation-analyze.vue'], resolve)
        }
      },
      {
        meta: ['统计管理', '收益统计'],
        path: 'income-analyze',
        component: (resolve) => {
          require(['@views/analyze/income-analyze.vue'], resolve)
        }
      },
      {
        meta: ['借款详情', '电话催收'],
        path: 'telephoneCollection',
        component: (resolve) => {
          require(['@components/loanDetails/telephoneCollection.vue'], resolve)
        }
      },
      {
        meta: ['电核', '电核详情'],
        path: 'telephoneDetails',
        component: (resolve) => {
          require(['@components/telephoneInterview/telephoneDetails.vue'], resolve)
        }
      },
    ]
  },
}
