<template>
  <div>
    <x-header class='header' :title='news' style='background-color:#5eadd6'/>
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
            <span class="m-time">{{onClickItem(item.time)}}</span>
          </div>
        </masker>
      </div>
    </div>
  </div>
</template>
<script>
import { Masker } from 'vux'
import axios from 'axios'
export default {
  name: 'SecondHand',
  components: {
    Masker
  },
  data () {
    return {
      news: '跳蚤市场',
      list1: [],
      list: [{
        title: '洗颜新潮流！人气洁面皂排行榜',
        img: 'https://cdn.xiaotaojiang.com/uploads/82/1572ec37969ee263735262dc017975/_.jpg'
      }, {
        title: '美容用品 & 日用品（上）',
        img: 'https://cdn.xiaotaojiang.com/uploads/59/b22e0e62363a4a652f28630b3233b9/_.jpg'
      }, {
        title: '远离车内毒气，日本车载空气净化器精选',
        img: 'https://cdn.xiaotaojiang.com/uploads/56/4b3601364b86fdfd234ef11d8712ad/_.jpg'
      }]
    }
  },
  created: function () {
    this.loading()
  },
  methods: {
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
    onImgError (item, $event) {
      console.log(item, $event)
    },
    loading () {}
  }
}
</script>
