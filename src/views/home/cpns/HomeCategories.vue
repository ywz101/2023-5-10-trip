<script setup>
import { useHomeStore } from '@/stores/modules/home';
import { storeToRefs } from 'pinia';

const homeStore = useHomeStore()
const { categories } = storeToRefs(homeStore)
</script>

<template>
  <div class="home-categories">
    <!-- 推荐分类 -->
    <template v-for="item in categories" :key="item.id">
      <div class="item">
        <img :src="item.pictureUrl" alt="">
        <div class="text">{{ item.title }}</div>
      </div>
    </template>
  </div>
</template>

<style lang="less" scoped>
// 推荐分类
.home-categories {
  display: flex;
  align-items: center;
  height: 80px;
  overflow-x: auto;
  padding: 0 14px;

  &::-webkit-scrollbar {
    display: none;
  }

  .item {
    flex-shrink: 0;
    width: 70px;
    text-align: center;

    img {
      width: 32px;
      height: 32px;
    }

    .text {
      margin-top: 3px;
      font-size: 12px;
    }
  }
}
</style>