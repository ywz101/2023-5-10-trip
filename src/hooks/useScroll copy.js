import { onMounted, onUnmounted, ref } from 'vue'
import { throttle } from 'underscore'

export function useScroll() {
  // 到达底部(默认false)
  const isReachBottom = ref(false)
  // 滚动距离
  const scrollTop = ref(0)
  // 客户端高度
  const clientHeight = ref(0)
  // 总高度
  const scrollHeight = ref(0)

  // 封装一个函数(滚动监听处理器)
  // 使用节流(100ms)
  const scrollListenerHandler = throttle(() => {
    // 滚动距离
    scrollTop.value = document.documentElement.scrollTop
    // 客户端高度
    clientHeight.value = document.documentElement.clientHeight
    // 总高度
    scrollHeight.value = document.documentElement.scrollHeight
    console.log('滚动了')
    // 如果(滚动距离 + 客户端高度 >= 总高度)
    if (scrollTop.value + clientHeight.value >= scrollHeight.value) {
      console.log('到达底部了~')
      // 将到达底部的值赋值为true
      isReachBottom.value = true
    }
  }, 100)


  // 挂载
  onMounted(() => {
    window.addEventListener('scroll', scrollListenerHandler)
  })

  // 卸载
  onUnmounted(() => {
    window.removeEventListener('scroll', scrollListenerHandler)
  })

  return {
    isReachBottom,
    scrollTop,
    clientHeight,
    scrollHeight
  }
}