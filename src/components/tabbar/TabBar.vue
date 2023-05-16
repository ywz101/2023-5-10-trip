<script setup>
import { ref } from 'vue';

import { tabbarData } from '@/assets/data/tabbarData'
import { getAssetURL } from '@/utils/load_assets'
import { useRoute } from 'vue-router';
import { watch } from 'vue';

const route = useRoute()
const tabbarActive = ref(0)
watch(route, newRoute => {
  const index = tabbarData.findIndex(item => item.path === newRoute.path)
  if (index === -1) return
  tabbarActive.value = index
})
</script>

<template>
  <div class="tab-bar">
    <van-tabbar v-model="tabbarActive"
                active-color="#ff9854"
                route>
      <template v-for="(item, index) in tabbarData"      
                :key="index">
        <van-tabbar-item :to="item.path">
          <span>{{ item.text }}</span>
          <template #icon>
            <img v-if="tabbarActive !== index"
                 :src="getAssetURL(item.image)" alt="">
            <img v-else
                 :src="getAssetURL(item.imageActive)" alt="">
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<style lang="less" scoped>
.tab-bar {
  img {
    height: 26px;
  }
}
</style>