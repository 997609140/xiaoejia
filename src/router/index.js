import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // 登陆注册
    {
      path: '/',
      redirect: '/HomePage'
    },
    {
      path: '/Login',
      name: 'Login',
      meta: {
        isLogin: false
      },
      component: () => import('../view/Land')
    },
    {
      path: '/RegiSter',
      name: 'RegiSter',
      meta: {
        isLogin: false
      },
      component: () => import('../view/RegiSter')
    },

    // 首页
    {
      path: '/HomePage',
      name: 'HomePage',
      component: () => import('../view/HomePage')
    },
    {
      path: '/Information',
      name: 'Information',
      component: () => import('../view/Information')
    },

    // 导航
    {
      path: '/SecondHand',
      name: 'SecondHand',
      component: () => import('../view/Navigation/SecondHand.vue')
    },
      // 资讯更多页面
    {
      path: '/CampusInformation',
      name: 'CampusInformation',
      meta: {
        isLogin: false
      },
      component: () => import('../view/CampusInformation')
    },
    // 发现
    {
      path: '/Find',
      name: 'Find',
      component: () => import('../view/Find')
    },

    // 我的
    {
      path: '/MyHome',
      name: 'MyHome',
      component: () => import('../view/MyHome.vue')

    },
    {
      path: '/aaa',
      name: 'aaa',
      meta: {
        isLogin: true
      },
      component: () => import('@/components/aaa')
    },
    {
      path: '/help',
      name: 'Help',
      meta: {
        isLogin: true
      },
      component: () => import('../view/Help')
    },
    {
      path: '/setup',
      name: 'Setup',
      meta: {
        isLogin: true
      },
      component: () => import('../view/Setup')
    },
    {
      path: '/myviews',
      name: 'myviews',
      meta: {
        isLogin: true
      },
      component: () => import('../view/Myviews')
    }
  ]
})
