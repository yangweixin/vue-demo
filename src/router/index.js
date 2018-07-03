import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/top',
      name: 'top',
      component: () => import('@/views/user'),
      children: [
          {
            path: 'young',
            name: 'young',
            component: () => import('@/views/user/young')
          }
      ]
    }
  ]
})