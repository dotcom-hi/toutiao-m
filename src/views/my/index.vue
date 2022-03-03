<template>
    <div class="my-container">
        <div v-if="user" class="header user-info">
            <div class="base-info">
                <div class="left">
                    <van-image class="avatar" :src="userInfo.photo" round fit="cover" />
                    <span class="name">{{ userInfo.name }}</span>
                </div>
                <div class="right">
                    <van-button size="mini" round to="/user/profile">编辑资料</van-button>
                </div>
            </div>
            <div class="data-status">
                <div class="data-item">
                    <span class="count">{{ userInfo.art_count }}</span>
                    <span class="text">头条</span>
                </div>
                <div class="data-item">
                    <span class="count">{{ userInfo.follow_count }}</span>
                    <span class="text">关注</span>
                </div>
                <div class="data-item">
                    <span class="count">{{ userInfo.fans_count }}</span>
                    <span class="text">粉丝</span>
                </div>
                <div class="data-item">
                    <span class="count">{{ userInfo.like_count }}</span>
                    <span class="text">获赞</span>
                </div>
            </div>
        </div>
        <div v-else class="header not-login">
            <div class="login-btn" @click="$router.push('/login')">
                <img class="mobile-img" src="@/assets/mobile.png" alt="" />
                <span class="text">登录 / 注册</span>
            </div>
        </div>
        <van-grid class="grid-nav" :column-num="2" clickable>
            <van-grid-item class="grid-item">
                <i slot="icon" class="toutiao icon-shoucang"></i>
                <span slot="text" class="text">收藏</span>
            </van-grid-item>
            <van-grid-item class="grid-item">
                <i slot="icon" class="toutiao icon-lishi"></i>
                <span slot="text" class="text">历史</span>
            </van-grid-item>
        </van-grid>
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
        <van-cell v-if="user" class="logout-cell" title="退出登录" @click="onLogout"  clickable/>
    </div>
</template>

<script>
    import { getUserInfo } from '@/api/user'
    import { mapState } from 'vuex'
    export default {
        name: 'MyIndex',
        components: {},
        props: {},
        data () {
            return {
                userInfo: {}
            }
        },
        created () {
            if (this.user) {
                this.loadUserInfo()
            }
        },
        computed: {
            ...mapState(['user'])
        },
        methods: {
            onLogout () {
                this.$dialog.confirm({
                    title: '确认退出吗？'
                })
                    .then(() => {
                        this.$store.commit('setUser', null)
                    })
                    .catch(() => {
                        // on cancel
                    })
            },
            async loadUserInfo () {
                try {
                    const { data } = await getUserInfo()
                    this.userInfo = data.data
                } catch (err) {
                    this.$toast('获取数据失败，请稍后重试')
                }
            }
        },
        mounted () { }
    }
</script>

<style scoped lang='less'>
    .my-container {
        .header {
            height: 361px;
            background: url("~@/assets/banner.png");
            background-size: cover;
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

        .user-info {
            .base-info {
                height: 231px;
                padding: 76px 32px 23px;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .left {
                    display: flex;
                    align-items: center;

                    .avatar {
                        width: 132px;
                        height: 132px;
                        margin-right: 23px;
                        border: 4px solid #fff;
                    }

                    .name {
                        font-size: 30px;
                        color: #fff;
                    }
                }
            }

            .data-status {
                height: 130px;
                display: flex;

                .data-item {
                    height: 100%;
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    color: #fff;

                    .count {
                        font-size: 36px;
                    }

                    .text {
                        font-size: 23px;
                    }
                }
            }
        }

        .grid-nav {
            margin-bottom: 15px;

            .grid-item {
                height: 141px;

                i.toutiao {
                    font-size: 45px;
                }

                .icon-shoucang {
                    color: #eb5253;
                }

                .icon-lishi {
                    color: #ff9d1d;
                }

                span.text {
                    font-size: 28px;
                }
            }
        }

        .logout-cell {
            margin-top: 15px;
            color: red;
            text-align: center;
        }
    }
</style>
