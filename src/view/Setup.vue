<template>
  <div class="home-page">
    <x-header style='background-color:#5eadd6'/>
    <group>
      <cell title="当前版本" is-link>
        <div slot="icon" style="margin-right:5px;" ><i style="color:#347eec" class="iconfont iconbanbenxinxi"/></div>
      </cell>
    </group>
    <group>
      <cell title="安全退出" is-link @click.native="showPlugin">
        <div slot="icon" style="margin-right:5px;" ><i style="color:red" class="iconfont iconanquantuichu"/></div>
      </cell>
    </group>

    <div v-transfer-dom>
      <confirm
        v-model="show"
        theme="android"
        @on-cancel="onCancel"
        @on-confirm="onConfirm"
        @on-show="onShow"
        @on-hide="onHide">
        <p style="text-align:center;">是否退出当前登陆？</p>
      </confirm>
    </div>

  </div>
</template>
<script>
import {Group, TransferDomDirective as TransferDom, Confirm, ConfirmPlugin} from 'vux'
import Vue from 'vue'
Vue.use(ConfirmPlugin)
export default {
  name: 'Setup',
  components: {
    Group,
    Confirm
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      position: 'middle',
      title: '已退出',
      showPositionValue: false,
      show: false,
      confirm
    }
  },
  methods: {
  // 退出当前登陆提示
    onHide () {
      console.log('on hide')
    },
    onShow () {
      console.log('on show')
    },
    onCancel () {
      console.log('on cancel')
    },
    onConfirm (msg) {
      console.log('on confirm')
      if (msg) {
        alert(msg)
      }
    },
    showPlugin () {
      var _that = this
      this.$vux.confirm.show({
        content: '退出当前登陆',
        // onShow () {
        //   console.log('plugin show')
        // },
        // onHide () {
        //   console.log('plugin hide')
        // },
        // onCancel () {
        //   console.log('plugin cancel')
        // },
        onConfirm () {
          localStorage.clear()
          _that.$router.push('/Myhome')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
