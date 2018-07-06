import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import HTTP from '@/utils/http'

Vue.config.productionTip = false
Vue.prototype.$http = HTTP

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
