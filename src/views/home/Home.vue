<script setup>
import HomeNavBar from './cpns/HomeNavBar.vue'
import HomeBanner from './cpns/HomeBanner.vue'
import HomeSearchBox from './cpns/HomeSearchBox.vue'
import HomeCategories from './cpns/HomeCategories.vue'
import HomeHouseList from './cpns/HomeHouseList.vue'

import { useHomeStore } from '@/stores/modules/home';
import { useRouter } from 'vue-router'
import { ref, computed, watch } from 'vue'

// 钩子函数
import { useScroll } from '@/hooks/useScroll'

const homeStore = useHomeStore()
homeStore.fetchHotSuggestsData()
homeStore.fetchCategories()
homeStore.fetchHouseList()

// search搜索
const searchValue = ref('')
// 点击取消按钮
const router = useRouter()
const cancelClick = () => {
  router.back()
}

// 滚动条逻辑
const { isReachBottom, scrollTop } = useScroll()
watch(isReachBottom, newValue => {
  if (newValue) {
    homeStore.fetchHouseList().then(() => {
      isReachBottom.value = false
    })
  }
})

// 用computed计算函数来做, 因为有缓存, 可以减少性能消耗
const isShowSearch = computed(() => {
  return scrollTop.value > 100
})
</script>

<template>
  <div class="home">

    <!-- <div class="top"> -->
      <HomeNavBar />
      <HomeBanner />
    <!-- </div> -->

    <!-- <div class="content"> -->
      <HomeSearchBox />
      <HomeCategories />

      <!-- search搜索 -->
      <van-search 
        class="search"
        v-if="isShowSearch"
        v-model="searchValue" 
        placeholder="城市/区域/位置"
        shape="round"
        show-action
        @cancel="cancelClick"
      />


      <HomeHouseList />
    <!-- </div> -->

  </div>
</template>

<style lang="less" scoped>
.home {
  padding-bottom: 100px;
}

.top {
  position: relative;
  z-index: 9;
}

.content {
  height: calc(100vh - 172px);
  overflow-y: auto;
}

// 搜索框
.search {
  position: fixed;
  top: 0;
  z-index: 9;
  width: 100%;
}
</style>