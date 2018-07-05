import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { HTTP } from '@/utils/http'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate: function() {
      window.HTTP = HTTP;
  }
}).$mount('#app')
