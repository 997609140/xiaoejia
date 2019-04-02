<template>
  <div class="home-page">
    <x-header style='background-color:#5eadd6' :title="title.title"/>
    <h3>{{title.title}}</h3>
    <div class="span">
      <span>来源:{{title.source}}</span>
      <!-- <span>点击:{{title.clicks}}</span> -->
    </div>
    <img :src="title.src" width="100%">
    <pre class="pre">{{title.desc}}</pre>
    <i>{{this.converTime(time)}}</i>
    <p>{{title.author}}</p>
  </div>
</template>
<script>
import Vue from 'vue'
// import {fromatdata} from '../assets/js/data.js'
export default {
  name: 'Information',
  components: {
    Vue
  },
  data () {
    return {
      title: this.$route.query.list,
      time: new Date(this.$route.query.list.time)
    }
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
      var hour = date2.getHours()
      // var noon = hour >= 12 ? 'PM' : 'AM'
      hour = hour >= 12 ? hour : hour
      hour = formatFunc(hour)
      var min = formatFunc(date2.getMinutes())
      var dateStr = year + '-' + mon + '-' + day + ' ' + ' ' + hour + ':' + min
      return dateStr
    }
  }
}
</script>

<style scoped>
.pre, img, h3, p, i, .span {
  display: inline-block;
  width: 90%;
  margin-left: 5%;
}
.span span {
  font-size: 14px;
}
.pre {
  font-size: 14px;
  color: gray;
  text-indent: 2em;
}
pre{
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
}
p, i{
  text-align: right;
  display: block;
  color: gray
}

</style>
