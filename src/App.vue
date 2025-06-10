<script setup>
import { RouterView } from 'vue-router';

</script>

<template>
  <!-- 一级路由出口组件 -->
  <RouterView />
  <el-button type="primary">Primary</el-button>
  <div class="test">
    test SCSS
  </div>
</template>

<style scoped lang="scss">
.test {
  color: $priceColor;
}
</style>
