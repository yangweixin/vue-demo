import * as types from './mutation-types'

export default {
    [ types.UPDATE_COMPANY ]( state, newName) {
        state.company = newName
      }
}