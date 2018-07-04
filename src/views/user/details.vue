<template>
    <div>
        <router-link to='/'>Home</router-link> 

        <h1>编号：{{ this.$route.params.id }}, 来查看你的信息吧</h1>
        <h3>底部被点击次数：{{ sonClickedTimes }}</h3>
        
        <TestPlugin/>

        <GlobalFooter :year="year" @sonSay="listenToSon"/>
    </div>
</template>

<script>
    import GlobalFooter from '@/components/GlobalFooter'
    import TestPlugin from '@/components/TestPlugin'

    export default {
        components: {
            GlobalFooter,
            TestPlugin
        },
        data() {
            return {
                year: '2018',
                sonClickedTimes: 0
            }
        },
        methods: {
            listenToSon(times) {
                this.sonClickedTimes = times
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/user/details";
</style>


