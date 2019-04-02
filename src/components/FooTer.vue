<template>
  <div>
    <tabbar class="footer">
      <tabbar-item
        v-for="(tab, i) in tabs"
        :key="i"
        :link="tab.url">
        <span slot="icon" :style="tab.color" :class="tab.icon"></span>
        <span slot="label">{{tab.title}}</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>

export default {
  name: 'FooTer',
  data () {
    return {
      tabs: [{
        title: '首页',
        icon: 'iconfont iconfanhuishouye1',
        color: 'font-size:25px;color:#41cdfb;',
        url: '/'
      }, {
        title: '发现',
        icon: 'iconfont iconquanzi',
        color: 'font-size:25px;color:#41cdfb;',
        iconActive: '\ue63f',
        url: '/Find'
      }, {
        title: '我的',
        icon: 'iconfont icon04',
        color: 'font-size:25px;color:#41cdfb;',
        iconActive: '\ue63d',
        url: '/MyHome'
      }]
    }
  }
}
</script>

<style scoped>
.footer {
  position: fixed;
}
</style>
