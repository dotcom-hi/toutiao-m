<template>
    <div class="layout-container">
        <router-view />
        <van-tabbar route class="layout-tabbar">
            <van-tabbar-item to="/">
                <i slot="icon" class="toutiao icon-shouye"></i>
                <span class="text">首页</span>
            </van-tabbar-item>
            <van-tabbar-item to="/qa">
                <i slot="icon" class="toutiao icon-wenda"></i>
                <span class="text">问答</span>
            </van-tabbar-item>
            <van-tabbar-item to="/video">
                <i slot="icon" class="toutiao icon-shipin"></i>
                <span class="text">视频</span>
            </van-tabbar-item>
            <van-tabbar-item to="/my">
                <i slot="icon" class="toutiao icon-wode"></i>
                <span class="text">{{ $store.state.user ? '我的' : '未登录'}}</span>
            </van-tabbar-item>
        </van-tabbar>
    </div>

</template>

<script>
    export default {
        name: 'LayoutIndex',
        components: {},
        props: {},
        data () {
            return {
            }
        },
        methods: {},
        mounted () { }
    }
</script>

<style scoped lang='less'>
    .layout-container {
        .layout-tabbar {
            i.toutiao {
                font-size: 40px;
            }
            span.text {
                font-size: 20px;
            }
        }
    }
</style>
