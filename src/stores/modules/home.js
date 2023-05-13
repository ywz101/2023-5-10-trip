import { getHotSuggests, getCategories, getHouseList } from '@/services'

import { defineStore } from 'pinia'

export const useHomeStore = defineStore('home', {
  state: () => ({
    hotSuggests: [],
    categories: [],
    houseList: [],
    nextPage: 1 
  }),
  actions: {
    // 热门建议
    async fetchHotSuggestsData() {
      const res = await getHotSuggests()
      this.hotSuggests = res.data
    },
    // 推荐分类
    async fetchCategories() {
      const res = await getCategories()
      this.categories = res.data
    },
    // 房屋列表
    async fetchHouseList() {
      const res = await getHouseList(this.nextPage)
      this.houseList.push(...res.data)
      this.nextPage++
    }
  }
})
