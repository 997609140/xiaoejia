<template>
  <div class="home-page">
    <div class="header-t">
      <flexbox class="heater-j">
        <flexbox-item :span="4">
          <div class="flex-demo">
            <img  :src="this.url">
          </div>
        </flexbox-item>
        <flexbox-item :style="{ 'display' :Flag == 'isLogin'?'block':'none' }">
          <div class="flex-demo1" style="text-aline:left;">
            <span style="font-size:24px;">{{username}}</span> <br/>
            <span>简介:</span><span style="font-size:13px;">这个人很懒啥都没留下~</span>
          </div>
        </flexbox-item>
        <flexbox-item :style="{ 'display' :Flag == 'isLogin'?'none':'block' }">
          <div class="flex-demo1" style="text-aline:left;color:lightblue">
            <router-link to="/login">请先登录</router-link>
          </div>
        </flexbox-item>
      </flexbox>
      <div class="view">
        <flexbox>
          <flexbox-item
            v-for="(list, i) in list"
            :key="i"
            :style="list.color"
          ><div class="flex-demo"><i :class="list.class" /></div></flexbox-item>
        </flexbox>
        <flexbox>
          <flexbox-item
            v-for="(list, i) in list"
            :key="i"
            style="color:black"
          ><div class="flex-demo">{{list.name}}:{{list.num}}</div></flexbox-item>
        </flexbox>
      </div>
    </div>

    <group>
      <cell
        v-for="(tab, i) in tabs"
        :key="i"
        style="color:black;"
        :title="tab.title"
        :link="tab.url"
      >
      <div slot="icon" style="margin-right:5px;" ><i :style="tab.color" :class="tab.icon"/></div>
      </cell>
    </group>
    <group>
      <cell
        v-for="(tab, i) in tabs1"
        :key="i"
        style="color:black;"
        :title="tab.title"
        :link="tab.url"
      >
      <div slot="icon" style="margin-right:5px;" ><i :style="tab.color" :class="tab.icon"/></div>
      </cell>
    </group>
    <foo-ter/>
  </div>
</template>
<script>
import {Blur} from 'vux'
import FooTer from '../components/FooTer'
export default {
  name: 'MyHome',
  components: {
    FooTer,
    Blur
  },
  data () {
    return {
      Flag: localStorage.getItem('src'),
      url: localStorage.getItem('src'),
      username: '...',
      varmax: 1,
      list: [{
        class: 'iconfont iconwodeguanzhu',
        color: 'color:#41cdfb;',
        name: '关注',
        num: 0
      }, {
        class: 'iconfont iconwodexiaoxi',
        color: 'color:green;',
        name: '消息',
        num: 0
      }, {
        class: 'iconfont iconwodeqiaquan1',
        color: 'color:#2153affa;',
        name: '分享',
        num: 0
      }],
      images: [],
      uploadUrl: '',
      params: {},
      previewMethod: '',
      addImageMethod: '',
      removeImageMethod: '',
      tabs: [{
        title: '我的信息',
        icon: 'iconfont icon04',
        color: 'color:red;font-siae:29px;',
        iconActive: '\ue63b',
        url: '/myviews'
      }, {
        title: '我的班级',
        icon: 'iconfont iconfanhuishouye1',
        color: 'color:#41cdfb;font-siae:29px;',
        iconActive: '\ue63f',
        url: '/main/loan'
      }, {
        title: '我的福利',
        icon: 'iconfont iconiconfontzhizuobiaozhun023140',
        color: 'color:#920d0d;font-siae:29px;',
        iconActive: '\ue63d',
        url: '/main/my'
      }, {
        title: '我的回复',
        icon: 'iconfont iconwodexiaoxi',
        color: 'color:green;font-siae:29px;',
        iconActive: '\ue63d',
        url: '/main/my'
      }],
      tabs1: [{
        title: '帮助与反馈',
        icon: 'iconfont iconwodeziliao',
        color: 'color:lightgreen;font-siae:29px;',
        iconActive: '\ue63d',
        url: '/help'
      }, {
        title: '设置',
        icon: 'iconfont iconzhanghaoguanli',
        color: 'color:#2153affa;font-siae:29px;',
        iconActive: '\ue63d',
        url: '/setup'
      }]
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      console.log(localStorage.getItem)
      this.Flag = localStorage.Flag
    }
  }
}
</script>

<style scoped>
.home-page {
  height: 100vh;
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
}
.header-t {
  height: 250px;
  color: white;
  position: relative;
  background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552456383177&di=7ac5e64db6f7bf46a4ca6dede6aee31b&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F03%2F73%2F73%2F2057bafeaa64193.jpg')
}
.heater-j {
  position: relative;
  top: 25px;
}
.header-t1 {
  position: relative;
  text-align: center;
  bottom: 142px;
}
.flex-demo {
  text-align: center;
  border-radius: 4px;
  background-clip: padding-box;
}
.flex-demo1 {
  text-align: left;
  color: #2db3de;
}
.photo {
  height: 100px;
  border: none;
  display: flex;
  justify-content: center;
  position: relative;
  top: 30px;
}
.view {
  padding-top: 60px;
}
img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
i {
  font-size: 25px;
}
li {
  list-style-type: none;
}
* {
  margin: 0;
  padding: 0;
}
</style>
