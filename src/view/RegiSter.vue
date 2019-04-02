<template>
  <div class="registerall">
    <div class="loge">
      <h1>校 e 家</h1>
    </div>
    <div class="land-page">
      <group class="register">
        <x-input title="姓名" name="username" v-model="username" placeholder="请输入姓名" is-type="china-name"></x-input>
        <x-input title="手机" name="mobile" v-model="tel" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
        <x-address
          @on-hide="logHide"
          @on-show="logShow"
          title="学生信息"
          v-model="collegelist.value"
          :list="collegelist.addressData"
          @on-shadow-change="onShadowChange"
          placeholder="请选择"
          :show.sync="collegelist.showAddress"
          class="college"/>
        <x-input
          title="密码"
          type="password"
          placeholder=""
          v-model="password"
          :min="6" :max="12"
          @on-change="change"></x-input>
        <x-input title="确认密码" v-model="password2" type="password" placeholder="" :equal-with="password"></x-input>
        <x-input v-model="identif" title="验证码">
          <s-identify slot="right-full-height" style = "touch-action: none;" :identifyCode="identifyCode" @click.native="refreshCode"></s-identify>
        </x-input>
      </group>
      <div class="btn-all">
        <x-button type="primary" @click.native="register">注册</x-button>
      </div>
      <div>
        <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask :text="title" :position="position">{{ }}</toast>
      </div>
    </div>

  </div>
</template>
<script>
import {Blur, Group, Toast, XAddress, XButton, Cell, Value2nameFilter as value2name} from 'vux'
import FooTer from '../components/FooTer'
import SIdentify from '../components/Yz'
import axios from 'axios'

export default {
  name: 'RegiSter',
  components: {
    FooTer,
    Blur,
    Group,
    XAddress,
    XButton,
    Cell,
    SIdentify,
    Toast
  },
  data () {
    return {
      position: 'middle',
      showPositionValue: false,
      title: '',
      username: '',
      tel: '',
      password: '',
      password2: '',
      identif: '',
      identifyCodes: '1234567890',
      identifyCode: '',
      collegelist: {
        title: '',
        value_0_1: [],
        value: [],
        name: [],
        addressData: [
          {
            'name': '电子信息工程学院',
            'value': '110000'
          },
          {
            'name': '文学院',
            'value': '120000'
          },
          {
            'name': '马克思学院',
            'value': '140000'
          },
          {
            'name': '电子信息工程',
            'value': '110100',
            'parent': '110000'
          },
          {
            'name': '电气工程',
            'value': '110200',
            'parent': '110000'
          },
          {
            'name': '通信工程',
            'value': '110300',
            'parent': '110000'
          },
          {
            'name': '2015级',
            'value': '110101',
            'parent': '110100'
          },
          {
            'name': '2016级',
            'value': '110105',
            'parent': '110100'
          }
        ],
        showAddress: false
      }
    }
  },
  // 验证码位数
  mounted () {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    // 注册提示弹窗
    showPosition (position, title) {
      this.position = position
      this.title = title
      this.showPositionValue = true
    },

    doShowAddress () {
      this.collegelist.showAddress = true
      setTimeout(() => {
        this.collegelist.showAddress = false
      }, 2000)
    },
    onShadowChange (ids, names) {
      console.log(1)
      console.log(ids, names)
    },
    getName (value) {
      return value2name(value)
    },
    logHide (str) {
      console.log('on-hide', str)
      console.log(this.collegelist.addressData[0])
    },
    logShow (str) {
      console.log('on-show')
    },
    change (val) {
      console.log('on change', val)
    },
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
      console.log(this.identifyCode)
      console.log(this.height)
    },
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
    },
    // 注册
    register: function () {
      if (this.identif === this.identifyCode) {
        axios.post('/api/register', {
          name: this.username,
          tel: this.tel,
          studentview: this.collegelist.value,
          password: this.password
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          console.log(res)
          if (res.data.num === 1) {
            this.showPosition('middle', res.data.title)
            this.$router.push('/HomePage')
            localStorage.setItem('Flag', 'isLogin')
            localStorage.setItem('src', 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg')
          } else {
            this.showPosition('middle', res.data.title)
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.registerall {
  height: 100vh;
  background-color: white
}
.loge {
  height: 200px;
}
.land-page {
  width: 80%;
  margin-left: 10%;
}
.register {
  background: none;
}
input {
  border: none
}
.btn-all {
  margin-top: 30px;
}
h1 {
  display: block;
  text-align: center;
  color: lightskyblue;
  line-height: 200px;
}
</style>
