<template>
  <div class="home-page">
    <x-header style='background-color:#5eadd6'><i class="iconfont iconquanzi"/>发现
      <div slot='overwrite-left'></div>
    </x-header>
    <foo-ter/>
  </div>
</template>

<script>
import FooTer from '../components/FooTer'
export default {
  name: 'Find',
  components: {
    FooTer
  },
  return: {}
}
</script>

<style scoped>
li {
  list-style-type: none;
}
* {
  margin: 0;
  padding: 0;
}
</style>
