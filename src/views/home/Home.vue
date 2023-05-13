<script setup>
import HomeNavBar from './cpns/HomeNavBar.vue'
import HomeBanner from './cpns/HomeBanner.vue'
import HomeSearchBox from './cpns/HomeSearchBox.vue'
import HomeCategories from './cpns/HomeCategories.vue'
import HomeHouseList from './cpns/HomeHouseList.vue'


import { useHomeStore } from '@/stores/modules/home';

const homeStore = useHomeStore()
homeStore.fetchHotSuggestsData()
homeStore.fetchCategories()
homeStore.fetchHouseList()

// 加载更多
const moreBtnClick = () => {
  homeStore.fetchHouseList()
}
</script>

<template>
  <div class="home">
    <div class="top">
      <HomeNavBar />
      <HomeBanner />
    </div>

    <div class="content">
      <HomeSearchBox />
      <HomeCategories />
      <HomeHouseList />
      <!-- 加载更多 -->
      <button @click="moreBtnClick">加载更多</button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.top {
  position: relative;
  z-index: 9;
}
.content {
  height: calc(100vh - 172px);
  overflow-y: auto;
}
</style>