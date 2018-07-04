import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    author: 'Young',
    company: 'OYOUNG'
  },
  mutations: {
    updateCompany( state, newName) {
      state.company = newName
    }
  },
  actions: {
    updateCompanyAsync( { commit }, params) {
      setTimeout( () => {
        commit( 'updateCompany', params.company )
      } , 3000)
    }
  }
})
