<template>
  <div>
    <x-header class='header' :title='news' style='background-color:#5eadd6'>
    </x-header>
    <panel
      :list="list1"
      type="1"
      @on-click-item="onClickItem"
      @on-img-error="onImgError"
      v-model="list1"></panel>
  </div>
</template>
<script>
// import { PaneL } from 'vux'
import { Tab, TabItem, Swiper, SwiperItem, Masker, Search, Group, Panel, Radio, Grid, GridItem, Previewer } from 'vux'
import axios from 'axios'
export default {
  name: 'CampusInformation',
  components: {
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
      news: '校园资讯',
      list1: []
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
    loading () {
      console.log(this.$route.query.list)
      if (this.$route.query.list === 'school') {
        axios.get('/api/list', {
          params: {
            start: 'school'
          }
        })
        .then(function (res) {
          this.list1 = res.data
        }.bind(this))
      }
      if (this.$route.query.list === 'notice') {
        axios.get('/api/list', {
          params: {
            start: 'notice'
          }
        })
        .then(function (res) {
          this.list1 = res.data
        }.bind(this))
      }
      if (this.$route.query.list === 'proclamation') {
        axios.get('/api/list', {
          params: {
            start: 'proclamation'
          }
        })
        .then(function (res) {
          this.list1 = res.data
        }.bind(this))
      }
    }
  }
}
</script>
