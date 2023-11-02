import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },

  // 歌单播放列表
  {
    path: '/itemMusic',
    name: 'itemMusic',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "itemMusic" */ '../views/ItemMusic.vue')
  },

  // 搜索
  {
    path: '/search',
    name: 'search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
  },


  // 登录
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },

  // 用户信息
  {
    path: '/userInfo',
    name: 'userInfo',

    beforeEnter: (to, from, next) => {
      if (store.state.isLogin || store.state.cookie || JSON.parse(localStorage.getItem('cookie')) || store.state.userInfo || JSON.parse(localStorage.getItem('userInfo'))) {
        next()
      } else {
        next('/login')
      }
    },

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "userInfo" */ '../views/UserInfo.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//定义全局路由守卫
router.beforeEach((to, from) => {
  // console.log(to);
  if (to.path === "/login" || to.path === '/userInfo') {
    store.state.playShow = false
  } else {
    store.state.playShow = true
  }
})

export default router
