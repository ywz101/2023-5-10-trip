<script setup>
const props = defineProps({
  itemData: {
    type: Object,
    default: () => ({})
  }
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
        <!-- 定位 -->
        <div class="location">
          <img src="@/assets/img/home/location.png" alt="">
          <span>{{ itemData.location }}</span>
        </div>
        <!-- 总结 -->
        <div class="summary">{{ itemData.summaryText }}</div>
        <!-- 描述 -->
        <div class="name">{{ itemData.houseName }}</div>
        <!-- 价格 -->
        <div class="price">
          <div class="new">¥{{ itemData.finalPrice }}</div>
          <div class="old">¥{{ itemData.productPrice }}</div>
          <div class="tip"
               v-if="itemData.priceTipBadge">
            {{ itemData.priceTipBadge.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>

.house-item {
  width: 50%;

  .item-inner {
    margin: 5px;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0 0 0 / .3);
    height: 226px;

    .summary {
      margin-top: 3px;
    }

    .cover {
      img {
        width: 100%;
      }
    }

    .info {
      padding: 8px 10px;
      color: #666;
      font-size: 12px;
    }

    .location {
      display: flex;
      align-items: center;
      img {
        width: 12px;
        height: 12px;
      }

      .text {
        margin-left: 2px;
        font-size: 12px;
        color: #666;
      }
    }

    .name {
      margin: 5px 0;
      font-size: 14px;
      color: #333;

      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .price {
      display: flex;
      align-items: center;

      margin: 8px 0;
      .new {
        color: #ff9645;
        font-size: 14px;
      }

      .old {
        margin: 0 3px;
        color: #999;
        font-size: 12px;
        text-decoration: line-through;
      }

      .tip {
        background-image: linear-gradient(270deg,#f66,#ff9f9f);
        color: #fff;
        padding: 0 6px;
        border-radius: 8px;
      }
    }
  }
}
</style>