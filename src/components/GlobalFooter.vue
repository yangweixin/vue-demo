<template>
    <footer class="global-footer">
        <span @click="doClick">{{ this.$store.state.company }} @ {{ year }}</span>
    </footer>
</template>

<script>
export default {
    name: 'GlobalFooter',
    props: {
        year: String
    }, 
    data() {
        return {
            // msg: this.$store.state.company+'@'+year,
            clickTimes: 0
        }
    },
    methods: {
        doClick() {
            console.log(this)
            this.clickTimes++;
            this.$emit('sonSay', this.clickTimes)
        }
    }   
}
</script>

<style scoped lang='scss'>
* {
    color: #FFF;
    margin: 0;
    padding: 0
}
.global-footer {
    background: green
}
footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    text-align: center;
    opacity: 0.5;
    line-height: 50px;
    font-size: 20px
}
</style>

