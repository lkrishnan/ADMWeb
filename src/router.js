import Search from "./components/Search.vue"
import store from "./store"
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Search',
    component: Search
  }
]

const router = new VueRouter({
  routes
})

export default router
