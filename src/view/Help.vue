<template>
  <div class="home-page">
    <x-header style='background-color:#5eadd6'/>
    <group>
      <cell title="忘记密码和修改密码" is-link></cell>
      <cell title="隐私" is-link></cell>
      <cell icon title="帮助与反馈"></cell>
    </group>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'Help',
  components: {},
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
