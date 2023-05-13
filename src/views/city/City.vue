<script setup>
import { useCityStore } from '@/stores/modules/city'
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import CityGroup from './cpns/CityGroup.vue'

// search搜索
const searchValue = ref('')
// 点击取消按钮
const router = useRouter()
const cancelClick = () => {
  router.back()
}

// tab标签页
const tabActive = ref(0)

// 发起网络请求: 获取城市所有数据
const cityStore = useCityStore()
cityStore.fetchCityAllData()
const { allCities } = storeToRefs(cityStore)
</script>

<template>
  <div class="city hide-tabbar">
    <!-- 顶部区域 -->
    <div class="top">
      <!-- search搜索 -->
      <van-search v-model="searchValue" 
                  placeholder="城市/区域/位置"
                  shape="round"
                  show-action
                  @cancel="cancelClick"
      />

      <!-- tab标签页 -->
      <van-tabs v-model:active="tabActive" 
                color="#ff9854">
        <template v-for="(value, key, index) in allCities" 
                  :key="index">
          <van-tab :title="value.title" :name="key">
          </van-tab>
        </template>
      </van-tabs>
    </div>

    <!-- 内容区域 -->
    <div class="content">
      <template v-for="(value, key, index) in allCities" 
                :key="index">
        <CityGroup :group-data="value"
                   v-show="tabActive === key" 
        />
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped>
.top {
  position: relative;
  z-index: 9;
}
.content {
  height: calc(100vh - 98px);
  overflow-y: auto;
}
</style>