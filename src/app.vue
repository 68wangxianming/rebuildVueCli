<template>
    <div class="index">
        <div class="logoImg"></div>
        <h1>唐山三百首</h1>
        <p>锄禾日当午</p>
        <p>汗滴禾下土</p>
        <p>谁知盘中餐</p>
        <p>粒粒皆辛苦</p>
        <img src="./assets/superman.gif" alt="">
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: 'xianming',
                age: '18'
            }
        },
        create() {
            this.callName()
        },
        methods: {
            callName() {
                console.log('This is vue demo!');
            }
        }
    }
</script>

<style scoped lang="less">
    .index {
        background-color: azure;
        .logoImg{
            width: 100px;
            height: 100px;
            background: url("./assets/webpack.png");
            background-size: 100% 100%;
        }
        h1 {
            color: red;
        }
        p {
            color: aquamarine;
        }
        img{
            width: 100px;
            height: 100px;
        }
    }
</style>