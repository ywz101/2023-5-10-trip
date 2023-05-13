<script setup>
import { computed } from 'vue'

const props = defineProps({
  itemData: {
    type: Object,
    default: () => ({})
  }
})
const rateValue = computed(() => {
  return +props.itemData.commentScore
})
</script>

<template>
  <div class="house-item">
    <!-- 边距 -->
    <div class="item-inner">
      <!-- 封面 -->
      <div class="cover">
        <img :src="itemData.image.url" alt="">
      </div>
      <!-- 信息 -->
      <div class="info">
        <!-- 总结 -->
        <div class="summary">{{ itemData.summaryText }}</div>
        <!-- 描述 -->
        <div class="name">{{ itemData.houseName }}</div>
        <!-- 价格 -->
        <div class="price">
          <!-- 评分 -->
          <van-rate v-model="rateValue" :size="15" color="#fff" allow-half readonly />
          ¥{{ itemData.finalPrice }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>

.house-item {
  width: 50%;

  .item-inner {
    position: relative;
    margin: 5px;
    background-color: #fff;
    border-radius: 6px;
    overflow: hidden;

    .cover {
      img {
        width: 100%;
      }
    }

    .info {
      position: absolute;
      bottom: 0;
      padding: 8px 10px;
      color: #fff;

      .summary {
        font-size: 12px;
      }

      .name {
        margin: 5px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .price {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
      }
    }
  }
}
</style>