<template>
  <div id="app">
    <!-- 路由的出口 -->
    <router-view />
    <div class="button">
      <input type="button" value="点我">
    </div>
    <div>
      <i class="iconfont icon-dianzan"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="less">
  .button {
    width: 100px;
    height: 200px;
  }
</style>
