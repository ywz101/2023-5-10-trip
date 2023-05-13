<script setup>
import { useCityStore } from '@/stores/modules/city';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import { formatMonthDay, getDiffDays } from '@/utils/format_date'
import { useHomeStore } from '@/stores/modules/home';

// 城市/我的位置
// 城市点击
const router = useRouter()
const cityClick = () => {
  router.push('/city')
}
// 我的位置点击(获取经纬度坐标)
const positionClick = () => {
  navigator.geolocation.getCurrentPosition(res => {
    console.log(res)
  })
}

// 城市回显
const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)

// 日期与日历
// 日期范围的点击(触发显示日历)
const calendarShow = ref(false)
const dateRangeClick = () => {
  calendarShow.value = true
}

// 入住和离店时间
const nowDate = new Date()
const newDate = new Date()
newDate.setDate(nowDate.getDate() + 1)
const startDate = ref(formatMonthDay(nowDate))
const endDate = ref(formatMonthDay(newDate))

// 共n晚
const stayCount = ref(getDiffDays(nowDate, newDate))

// 日历的确认事件
const confirmClick = value => {
  // 选择开始日期时间
  const startCalendar = value[0]
  // 选择结束日期时间
  const endCalendar = value[1]
  // 关闭日历
  calendarShow.value = false
  // 重新赋值入住和离店时间
  startDate.value = formatMonthDay(startCalendar)
  endDate.value = formatMonthDay(endCalendar)
  // 重新赋值共n晚
  stayCount.value = getDiffDays(startCalendar, endCalendar)
}

// 热门建议
const homeStore = useHomeStore()
const { hotSuggests } = storeToRefs(homeStore)

// 开始搜索
const searchBtnClick = () => {
  router.push({
    path: '/search',
    query: {
      startDate: startDate.value,
      endDate: endDate.value
    }
  })
}
</script>

<template>
  <div class="home-search-box">
    <!-- 城市/我的位置 -->
    <div class="location bottom-gray-line">
      <div class="city" @click="cityClick">
        {{ currentCity.cityName }}
      </div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="">
      </div>
    </div>

    <!-- 日期范围 -->
    <div class="date-range section bottom-gray-line" @click="dateRangeClick">
      <div class="start">
        <div class="date">
          <div class="tip">入住</div>
          <div class="time">{{ startDate }}</div>
        </div>
      </div>
      <div class="stay">共 {{ stayCount }} 晚</div>
      <div class="end">
        <div class="date">
          <div class="tip">离店</div>
          <div class="time">{{ endDate }}</div>
        </div>
      </div>
    </div>

    <!-- 日历信息 -->
    <van-calendar v-model:show="calendarShow" 
                  @confirm="confirmClick"
                  color="#ff9854" 
                  type="range"
                  :show-confirm="false"
                  :round="false"
    />

    <!-- 价格不限/人数不限 -->
    <div class="price-counter section bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>

    <!-- 关键字 -->
    <div class="keywords section bottom-gray-line">关键字/位置/民宿名</div>

    <!-- 热门建议(网络数据) -->
    <div class="hot-suggests section">
      <template v-for="(item, index) in hotSuggests" 
                :key="index">
        <div class="item"
           :style="{ 
              color: item.tagText.color,
              background: item.tagText.background.color
            }"  
        >
          {{ item.tagText.text }}
        </div>
      </template>
    </div>

    <!-- 开始搜索 -->
    <div class="search-btn section"
         @click="searchBtnClick">
      <div class="btn">开始搜索</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
// 城市/我的位置
.location {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 44px;

  .city {
    font-size: 15px;
    color: #333;
  }

  .position {
    width: 72px;

    .text {
      font-size: 12px;
      color: #666;
    }

    img {
      margin-left: 5px;
      width: 18px;
      height: 18px;
    }
  }
}

// 日期范围
.date-range {
  .date {
    .tip {
      font-size: 12px;
    }

    .time {
      margin-top: 3px;
      font-size: 15px;
      color: #666;
    }
  }
}

// 价格不限/人数不限
.price-counter {
  .start {
    flex: 1;
    display: flex;
    align-items: center;
    border-right: 1px solid var(--line-color);
    height: 100%;
  }

  .end {
    margin-left: 2em;
  }
}

// 热门建议
.hot-suggests {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  height: auto;

  .item {
    margin: 4px;
    padding: 4px 6px;
    // background-color: #F1F3F5;
    border-radius: 14px;
    font-size: 12px;
    // color: #3F4954;
  }
}

// 开始搜索
.search-btn {
  margin-top: 10px;
  padding: 0 20px;

  .btn {
    width: 342px;
    height: 38px;
    line-height: 38px;
    max-height: 50px;
    text-align: center;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    border-radius: 50px;
    background-image: var(--theme-linear-gradient);
  }
}
</style>