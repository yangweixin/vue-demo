import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      path: '/user',
      name: 'user',
      component: () => import('@/views/user'),
      children: [
          {
            path: 'details/:id',
            name: 'user-details',
            component: () => import('@/views/user/details')
          }
      ]
    }
  ]
})