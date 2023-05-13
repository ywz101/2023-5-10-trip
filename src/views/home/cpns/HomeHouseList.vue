<script setup>
import { useHomeStore } from '@/stores/modules/home';
import { storeToRefs } from 'pinia';

import HouseItemV9 from '@/components/house-item-v9/HouseItemV9.vue'
import HouseItemV3 from '@/components/house-item-v3/HouseItemV3.vue'

const homeStore = useHomeStore()
const { houseList } = storeToRefs(homeStore)
</script>

<template>
  <div class="home-house-list">
    <!-- 热门精选 -->
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template v-for="(item, index) in houseList" 
                :key="item.data.houseId">
                <!-- v-if="item.discoveryContentType === 9" -->
        <template v-if="item.discoveryContentType === 9">
          <HouseItemV9 :item-data="item.data" />
        </template>
        <template v-else-if="item.discoveryContentType === 3">
          <HouseItemV3 :item-data="item.data" />
        </template>
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped>
// 热门精选
.home-house-list {
  padding: 10px 8px;

  .title {
    padding: 10px;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>