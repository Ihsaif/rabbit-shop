<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useMouseInElement } from '@vueuse/core';
import { ref, watch } from 'vue';

//props适配图片列表
defineProps({
  imageList: {
    type: Array,
    default: () => []
  }
});

// 图片列表
/* const imageList = [
  "https://yanxuan-item.nosdn.127.net/d917c92e663c5ed0bb577c7ded73e4ec.png",
  "https://yanxuan-item.nosdn.127.net/e801b9572f0b0c02a52952b01adab967.jpg",
  "https://yanxuan-item.nosdn.127.net/b52c447ad472d51adbdde1a83f550ac2.jpg",
  "https://yanxuan-item.nosdn.127.net/f93243224dc37674dfca5874fe089c60.jpg",
  "https://yanxuan-item.nosdn.127.net/f881cfe7de9a576aaeea6ee0d1d24823.jpg"
] */

//  鼠标移入小图时，切换大图
const activeIndex = ref(0);

const enterhandle = (index) => {
  activeIndex.value = index;
}

//获取鼠标相对位置
const target = ref(null);
const { elementX, elementY, isOutside } = useMouseInElement(target)

//控制滑块跟随控制滑块跟随鼠标移动（监听elementX/Y变化，一旦变化 重新设置left/top）
const left = ref(0);
const top = ref(0);

const positionX = ref(0);
const positionY = ref(0);

watch([elementX, elementY, isOutside], () => {
  // console.log('X,Y变化了', elementX, elementY);
  if (isOutside.value) return; // 鼠标移出时不更新滑块位置
  // 如果鼠标移出图片区域，滑块不动
  //横向
  if (elementX.value > 100 && elementX.value < 300) {
    left.value = elementX.value - 100; // 200px的滑块，left从0开始
  }
  //纵向
  if (elementY.value > 100 && elementY.value < 300) {
    top.value = elementY.value - 100; // 200px的滑块，top从0开始
  }
  // 处理边界
  if (elementX.value > 300) { left.value = 200 }
  if (elementX.value < 100) { left.value = 0 }

  if (elementY.value > 300) { top.value = 200 }
  if (elementY.value < 100) { top.value = 0 }

  // 控制放大镜大图的显示位置
  positionX.value = -left.value * 2; // 放大镜大图的背景位置
  positionY.value = -top.value * 2; // 放大镜大图的背景位置
});
</script>

<template>
  <div class="goods-image">
    <!-- 左侧大图-->
    <div class="middle" ref="target">
      <img :src="imageList[activeIndex]" alt="" />
      <!-- 蒙层小滑块 -->
      <div class="layer" v-show="!isOutside" :style="{ left: `${left}px`, top: `${top}px` }"></div>
    </div>
    <!-- 小图列表 -->
    <ul class="small">
      <li v-for="(img, i) in imageList" :key="i" @mouseenter="enterhandle(i)" :class="{ active: i === activeIndex }">
        <img :src="img" alt="" />
      </li>
    </ul>
    <!-- 放大镜大图 -->
    <div class="large" :style="[
      {
        backgroundImage: `url(${imageList[activeIndex]})`,
        backgroundPositionX: `${positionX}px`,
        backgroundPositionY: `${positionY}px`,
      },
    ]" v-show="!isOutside"></div>
  </div>
</template>

<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    position: absolute;
    left: 0;
    top: 0;
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }
}
</style>