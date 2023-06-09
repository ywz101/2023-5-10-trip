import { onMounted, onUnmounted, ref } from 'vue'
import { throttle } from 'underscore'

export function useScroll() {
  const isReachBottom = ref(false)
  const scrollTop = ref(0)
  const clientHeight = ref(0)
  const scrollHeight = ref(0)

  const scrollListenerHandler = throttle(() => {
    scrollTop.value = document.documentElement.scrollTop
    clientHeight.value = document.documentElement.clientHeight
    scrollHeight.value = document.documentElement.scrollHeight
    console.log('滚动中~')
    if (scrollTop.value + clientHeight.value >= scrollHeight.value) {
      console.log('滚动到底部了~')
      isReachBottom.value = true
    }
  }, 100)

  onMounted(() => {
    window.addEventListener('scroll', scrollListenerHandler)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', scrollListenerHandler)
  })

  return {
    isReachBottom,
    scrollTop
  }
}