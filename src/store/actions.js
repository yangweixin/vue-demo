import * as types from './mutation-types'

export default {
    updateCompanyAsync ( { commit }, params) {
        setTimeout( () => {
            commit( types.UPDATE_COMPANY, params.company )
        } , 3000)
    }
}