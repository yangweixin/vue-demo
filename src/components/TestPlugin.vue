<template>
    <div>
        <input v-model="company" placeholder="新的公司名称"/>
        <button @click="updateCompany"> 提交 </button>
    </div>
</template>

<script>
import * as MUTATIONS from '@/store/mutation-types'

export default {
    name: 'TestPlugin',
    props: {

    },
    data() {
        return {
            company: ''
        }
    },
    created: function(){
        // this.$http.get('/discussion/comments',{
        //     source: 'WORK',
        //     offset: 0,
        //     limit: 5
        // })

        // this.$http.post('/discussion/objects/2/comment',{
        //     user_id: 1001,
        //     source: "WORK",
        //     content: "世界第一等",
        //     rich_content: "世界第一等"
        // })

        // this.$http.del('/discussion/comments/2?user_id=1001')

        this.$http.patch('/discussion/comments/2')
    },
    methods: {
        updateCompany: function() {
            this.$store.commit( MUTATIONS.UPDATE_COMPANY , this.company)
        },

        updateCompanyAsync: function() {
            this.$store.dispatch({
                type: 'UPDATE_COMPANY_ASYNC',
                company: this.company
            })
        }
    }
}
</script>

<style scoped lang="scss">

</style>

