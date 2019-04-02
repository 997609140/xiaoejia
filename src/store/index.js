import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  // 设置属性
  state: {
    isLogin: false
  },

  // 获取属性的状态
  getters: {
    // 获取登录状态
    isLogin: state => state.isLogin
  },

  // 设置属性状态
  mutations: {
    // 保存登录状态
    login: (state) => {
      // 传入登录状态islogin
      localStorage.setItem('Flag', 'islogin')
      state.Flag = 'islogin'
    }
  },

  // 应用mutations
  actions: {
    // 获取登录状态
    setUser ({commit}, Flag) {
      commit('userStatus', Flag)
    }
  }
})
