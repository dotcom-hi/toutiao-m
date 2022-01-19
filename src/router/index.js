import Vue from 'vue'
import VueRouter from 'vue-router'
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(VueRouter)

// 注册使用 vant 组件库
Vue.use(Vant)

// 路由表
const routes = []

const router = new VueRouter({
  routes
})

export default router
