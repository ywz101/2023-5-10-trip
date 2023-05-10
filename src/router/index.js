import { createRouter, createWebHashHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    // 重定向
    {
      path: '/',
      redirect: '/home'
    },
    {
      name: 'home',
      path: '/home',
      component: () => import('@/views/home/Home.vue')
    },
    {
      name: 'favor',
      path: '/favor',
      component: () => import('@/views/favor/Favor.vue')
    },
    {
      name: 'order',
      path: '/order',
      component: () => import('@/views/order/Order.vue')
    },
    {
      name: 'message',
      path: '/message',
      component: () => import('@/views/message/Message.vue')
    },
  ]
})