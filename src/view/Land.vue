<template>
  <div class="land">
    <x-header style='background-color:#5eadd6'>登陆 <router-link slot="right" to="/RegiSter">注册</router-link></x-header>
    <div class="loge">
      <h1>校 e 家</h1>
    </div>
    <div class="land-page" style="background: none;">
      <div title="" class="login-input">
        <x-input
          class="login-input"
          :icon-type="iconType"
          :max="11"
          title="账号"
          name="mobile"
          v-model="landform.tel"
          placeholder="请输入手机号码"
          keyboard="number"
          is-type="china-mobile">
          <div
            slot="label"
            style="padding-right:10px;color:white"
          >
            <i
              class="iconfont iconzhanghao"
              style= "color:blue"
              width="24"
              height="24"/>
          </div>
        </x-input>
        <x-input
          style='color:white'
          class="login-input"
          type="password"
          title="密码"
          name="mobile"
          :min="6"
          v-model="landform.password"
          placeholder="请输入密码"
          keyboard="pasword"
          is-type="password"
        >
          <div
            slot="label"
            style="padding-right:10px;color:white"
          >
            <i
              style= "color:blue"
              class="iconfont iconmima"
              width="24"
              height="24"
            />
          </div>
        </x-input>
      </div>
      <div class="passforget">
        <router-link to=""><span>忘记密码<i class="iconfont iconmima"/>？</span></router-link>
      </div>
      <div class="btn-all">
        <x-button type="primary" @click.native="land">登陆</x-button>
      </div>
    </div>
    <div>
      <toast v-model="showPositionValue" type="text" :time="1000" is-show-mask :text="title" :position="position">{{ }}</toast>
    </div>

  </div>
</template>
<script>
import axios from 'axios'
import {Blur, Toast, Group, XSwitch, XButton, Icon} from 'vux'
import SIdentify from '../components/Yz'
export default {
  name: 'Land',
  components: {
    Blur,
    SIdentify,
    Toast,
    Group,
    XSwitch,
    XButton,
    Icon
  },
  data () {
    return {
      position: 'middle',
      iconType: '',
      title: '',
      showPositionValue: false,
      landform: {
        tel: '',
        password: '',
        num: ''
      },
      identifyCodes: '1234567890',
      identifyCode: '',
      height: window.screen.height,
      show: false
    }
  },
  mounted () {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    // 登陆提示弹窗
    showPosition (position, title) {
      this.position = position
      this.title = title
      this.showPositionValue = true
    },
    // 获取验证码
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

    // 登陆请求
    land: function () {
      axios.post('/api/login', {
        tel: this.landform.tel,
        password: this.landform.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        console.log(res)
        // 登录失败,先不讨论
        if (res.data.num === 1) {
          console.log(this.$store)
          // 我们设置一个名为Flag，值为isLogin的字段，作用是如果Flag有值且为isLogin的时候，证明用户已经登录了。
          localStorage.setItem('Flag', 'isLogin')
          localStorage.setItem('tel', this.landform.tel)
          localStorage.setItem('src', res.data.src)
          this.title = res.data.title
          // 登录成功后跳转到指定页面
          this.showPosition('middle', res.data.title)
          this.$router.push('/HomePage')
        } else {
          console.log(res.data.title)
          this.showPosition('middle', res.data.title)
        }
      })
    }
  }
}
</script>

<style scoped>
.loge {
  height: 200px;
}
.land {
  height: 100vh;
  background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552458143705&di=9da45ed2d258e4d2e113cafc4fe8be83&imgtype=0&src=http%3A%2F%2Fimg18.3lian.com%2Fd%2Ffile%2F201705%2F10%2F23aa260746631af7a83052e2e9272a00.jpg');
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
}
.passforget span {
  margin-top: 25px;
  display: inline-block;
  margin-left: 65%;
}
.land-page {
  width: 80%;
  margin-left: 10%;
}
.btn-all {
  margin-top: 20px;
}
.login-input {
  background: none;
}
h1 {
  display: block;
  text-align: center;
  color: #04be02;
  line-height: 250px;
}
i {
  font-size: 20px;
}
li {
  list-style-type: none;
  text-align: center
}
* {
  margin: 0;
  padding: 0;
}
</style>
