<template>
    <div class="my-container">
        <div class="header not-login">
            <div class="login-btn" @click="$router.push('/login')">
                <img class="mobile-img" src="@/assets/mobile.png" alt="" />
                <span class="text">登录 / 注册</span>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'MyIndex',
        components: {},
        props: {},
        data () {
            return {}
        },
        methods: {},
        mounted () {}
    }
</script>

<style scoped lang='less'>
.my-container {
    .header {
        height: 361px;
        background: url("~@/assets/banner.png");
        background-size: cover
    }
}

.not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .mobile-img {
            height: 132px;
            width: 132px;
            margin-bottom: 15px;
        }
        .text {
            font-size: 28px;
            color: white;
        }
    }
}
</style>
