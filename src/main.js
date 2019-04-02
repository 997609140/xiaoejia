// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import router from './router'
import App from './App'
import SIdentify from './components/Yz.vue'
import axios from 'axios'
import './assets/confront/iconfont.css'
import './assets/css/index.css'
import store from './store'
import convertUTCTimeToLocalTime from './assets/js/data'
// import store from 'vuex'

import { Tabbar, TabbarItem, XHeader, Flexbox, FlexboxItem, PopupHeader, Cell, CellBox, CellFormPreview, Group, Badge, XInput, XButton, Alert } from 'vux'
Vue.prototype.$http = axios
Vue.prototype.$formatData = convertUTCTimeToLocalTime

Vue.use(VueRouter)
Vue.use(SIdentify)

Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
Vue.component('x-header', XHeader)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('popup-header', PopupHeader)
Vue.component('cell', Cell)
Vue.component('cell-box', CellBox)
Vue.component('cell-form-preview', CellFormPreview)
Vue.component('group', Group)
Vue.component('badge', Badge)
Vue.component('x-input', XInput)
Vue.component('x-button', XButton)
Vue.component('alert', Alert)

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */

// 路由守卫
router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  // 判断该路由是否需要登录权限
  if (to.meta.isLogin) {
    if (localStorage.getItem('Flag')) { // 判断本地是否存在access_token
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
  /* 如果本地 存在 token 则 不允许直接跳转到 登录页面 */
  if (to.fullPath === '/login') {
    if (localStorage.getItem('Flag')) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  }
})

router.afterEach(route => {
  window.scroll(0, 0)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
