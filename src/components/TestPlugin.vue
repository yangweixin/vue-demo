<template>
    <div>
        <input v-model="company" placeholder="新的公司名称"/>
        <button @click="updateCompany"> 提交 </button>
    </div>
</template>

<script>
export default {
    name: 'TestPlugin',
    props: {

    },
    data() {
        return {
            company: ''
        }
    },
    methods: {
        updateCompany: function() {
            window.HTTP.get('http://www.baidu.com')
            this.$store.commit('updateCompany', this.company)
        },

        updateCompanyAsync: function() {
            this.$store.dispatch({
                type: 'updateCompanyAsync',
                company: this.company
            })
        }
    }
}
</script>

<style scoped lang="scss">

</style>

