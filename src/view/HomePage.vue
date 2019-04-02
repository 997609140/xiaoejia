<template>
  <div class='home-page'>
    <x-header class='header' title='今日校园' style='background-color:#5eadd6'>
      <div slot='overwrite-left'></div>
    </x-header>

    <div>
      <search
      v-model="value"
      :results="results"
      position="absolute"
      auto-scroll-to-top
      top="46px"
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      @result-click="resultClick"
      @on-change="getResult"
      ref="search"/>
    </div>

    <div>
      <swiper
        :list="demo01_list"
        v-model="demo01_index"
        @on-index-change="demo01_onIndexChange"
        :auto = true
        :loop = true></swiper>
      <div v-transfer-dom>
        <previewer
          :list="demo01_list"
          ref="previewer"
          :options="options"
          @on-index-change="logIndexChange"></previewer>
      </div>
    </div>

    <div class="list" style="padding:5px;">
      <grid :show-lr-borders="false">
        <grid-item
          v-for='(item, index) in list2'
          :key="index"
          :label="item.name"
          :link="item.url"
          :style="item.style">
          <i slot="icon" :class="item.icon"/>
        </grid-item>
      </grid>
      <grid :show-lr-borders="false">
        <grid-item
          :label="item.name"
          v-for='(item, index) in list3'
          :key="index"
          :style="item.style">
          <i slot="icon" :class="item.icon" />
        </grid-item>
      </grid>
    </div>

    <div>
      <div
        style="margin: 10px;overflow: hidden;"
        v-for="(item, index) in list"
        :key= index
      >
          <masker style="border-radius: 2px;">
            <div class="m-img" :style="{backgroundImage: 'url(' + item.img + ')'}"></div>
            <div slot="content" class="m-title">
              {{item.title}}
              <br/>
              <span class="m-time">{{converTime(item.time)}}</span>
            </div>
          </masker>
      </div>
    </div>

    <div>
      <panel
        :header="news"
        :list="list1"
        type="1"
        @on-click-item="onClickItem"
        @on-img-error="onImgError"
        :footer="footer1"
        v-model="list1"></panel>
    </div>
    <div>
      <panel
        header="校务通知"
        :list="list1"
        type="2"
        @on-click-item="onClickItem"
        @on-img-error="onImgError"
        :footer="footer2"
        v-model="list1">
      </panel>
    </div>
    <div>
      <panel
        header="公告公示"
        :list="list1"
        type="2"
        @on-click-item="onClickItem"
        @on-img-error="onImgError"
        :footer="footer3"
        v-model="list1"></panel>
    </div>

  <div style="height:60px"/>
  <foo-ter/>
  </div>
</template>
<script>
import FooTer from '../components/FooTer'
import InforMation from './Information'
// import Vue from 'vue'
import { Tab, TabItem, Swiper, SwiperItem, Masker, Search, Group, Panel, Radio, Grid, GridItem, Previewer, TransferDom } from 'vux'
import axios from 'axios'

export default {
  name: 'HomePage',
  directives: {
    TransferDom
  },
  components: {
    FooTer,
    InforMation,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Masker,
    Search,
    Panel,
    Group,
    Radio,
    Grid,
    GridItem,
    Previewer
  },
  data () {
    return {
      list2: [
        {
          name: '校园事件',
          icon: 'iconfont iconxiaoyuan',
          style: 'color:#55d436;background-color:#a3daf759',
          url: '/SecondHand'
        },
        {
          name: '二手市场',
          icon: 'iconfont iconershou1',
          style: 'color:#79ccf7;background-color:#80e29e6e',
          url: '/SecondHand'
        },
        {
          name: '校园比赛',
          icon: 'iconfont iconQYHD_YH',
          style: 'color:#a6d436;background-color:#b6d8d86e',
          url: '/SecondHand'
        },
        {
          name: '班级',
          icon: 'iconfont iconwodexuesheng1',
          style: 'color:#eac248;background-color:#cdc8dc6e',
          url: '/SecondHand'
        }
      ],
      list3: [
        {
          name: '兼职招聘',
          icon: 'iconfont iconjianzhi2',
          style: 'color:#d29f05;background-color:#a3daf759',
          url: '/SecondHand'
        },
        {
          name: '失物招领',
          icon: 'iconfont iconshiwuzhaoling1',
          style: 'color:#03d2ec;background-color:#a3daf759',
          url: '/SecondHand'
        },
        {
          name: '外卖订餐',
          icon: 'iconfont iconxiaoyuansongcan',
          style: 'color:#a7226beb;background-color:#a3daf759',
          url: '/SecondHand'
        },
        {
          name: '更多',
          icon: 'iconfont icongengduo4',
          style: 'color:#55d436;background-color:#a3daf759',
          url: '/SecondHand'
        }
      ],
      demo2: '',
      index: 0,
      demo01_list: [],
      demo01_index: 0,
      list: [],
      results: [],
      value: '',
      list1: [],
      footer1: {
        title: '更多',
        url: '/CampusInformation?list=school'
      },
      footer2: {
        title: '更多',
        url: '/CampusInformation?list=notice'
      },
      footer3: {
        title: '更多',
        url: '/CampusInformation?list=proclamation'
      },
      news: '校园资讯',
      options: {
        getThumbBoundsFn (index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          // get window scroll Y
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
          // w = width
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    }
  },
  // 加载页面数据

  created: function () {
    axios.get('/api/list', {
      params: {
        start: 'homepage'
      }
    })
    .then(function (res) {
      this.list1 = res.data
    }.bind(this))

    axios.get('/api/list1')
    .then(function (res) {
      this.demo01_list = res.data
    }.bind(this))

    axios.get('/api/list2')
    .then(function (res) {
      this.list = res.data
    }.bind(this))
  },

  methods: {
    converTime (UTCDateString) {
      if (!UTCDateString) {
        return '-'
      }
      function formatFunc (str) {    // 格式化显示
        return str > 9 ? str : '0' + str
      }
      var date2 = new Date(UTCDateString)     // 这步是关键
      var year = date2.getFullYear()
      var mon = formatFunc(date2.getMonth() + 1)
      var day = formatFunc(date2.getDate())
      // var hour = date2.getHours()
      // var noon = hour >= 12 ? 'PM' : 'AM'
      // hour = hour >= 12 ? hour : hour
      // hour = formatFunc(hour)
      // var min = formatFunc(date2.getMinutes())
      var dateStr = year + '-' + mon + '-' + day
      return dateStr
    },
    onImgError (item, $event) {
      console.log(item, $event)
    },
    onSwiperItemIndexChange (index) {
      console.log('demo item change', index)
    },
    demo01_onIndexChange (index) {
      this.demo01_index = index
    },
    logIndexChange (arg) {
      console.log(arg)
    },
    show (index) {
      this.$refs.previewer.show(index)
    },
    onClickItem (item) {
      console.log(item)
      axios.get('/api/list')
      .then(function (res) {
        console.log(res.data[item.h_id - 1])
      })
      this.$router.push({
        path: '/Information',
        query: { list: item }
      })
    },

    // 搜索
    onFocus () {
      console.log('on focus')
    },
    onCancel () {
      console.log('on cancel')
    },
    onSubmit () {
      this.$refs.search.setBlur()
      this.$vux.toast.show({
        type: 'text',
        position: 'top',
        text: 'on submit'
      })
    },
    resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
    setFocus () {
      this.$refs.search.setFocus()
    },
    getResult (val) {
      console.log('on-change', val)
      this.results = val ? getResult(this.value) : []
    }
  }
}
function getResult (val) {
  let rs = []
  for (let i = 0; i < 20; i++) {
    rs.push({
      title: `${val}`,
      other: i
    })
  }
  return rs
}
</script>

<style scoped>
.m-img {
  padding-bottom: 33%;
  display: block;
  position: relative;
  max-width: 100%;
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  border-radius: 2px;
}

.m-title {
  color: #fff;
  text-align: center;
  text-shadow: 0 0 2px rgba(0, 0, 125, 0.5);
  font-weight: 500;
  font-size: 16px;
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
}

.m-time {
  font-size: 12px;
  padding-top: 4px;
  border-top: 1px solid #f0f0f0;
  display: inline-block;
  margin-top: 5px;
}

.grid-center {
  display: block;
  text-align: center;
}
.weui-grids {
  background-color: #fff;
}
.list i {
  font-size: 30px;
}
</style>
