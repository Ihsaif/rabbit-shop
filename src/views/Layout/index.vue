<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import LayoutNav from './components/LayoutNav.vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutFooter from './components/LayoutFooter.vue';
import LayoutFixed from './components/LayoutFixed.vue';

import { useCategoryStore } from '@/stores/category';
import { onMounted } from 'vue';

const categoryStore = useCategoryStore()

onMounted(() => categoryStore.getCategory())
</script>
<template>
  <div>
    <LayoutFixed />
    <LayoutNav />
    <LayoutHeader />
    <!-- 二级路由出口 -->
    <!-- 添加key 破坏复用机制 强制销毁重建 -->
    <!-- <RouterView :key="$route.fullPath" /> -->
    <RouterView />
    <LayoutFooter />
  </div>
</template>