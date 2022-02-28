<template>
    <div class="home-container">
        <van-nav-bar fixed>
            <template #title>
                <van-button class="search-btn" round type="info" size="small" to="/search" >
                    <i slot="icon" class="toutiao icon-sousuo" />
                    搜索</van-button>
            </template>
        </van-nav-bar>
        <van-tabs class="channel-tabs" v-model="active" animated swipeable>
            <van-tab v-for="item in userChannels" :key="item.id" :title="item.name">
                <article-list :channel="item"  />
            </van-tab>
            <div slot="nav-right" class="placeholder"></div>
            <div slot="nav-right" class="ham-btn" @click="isChannelEditShow = true" >
                <i class="toutiao icon-gengduo" />
            </div>
        </van-tabs>
        <van-popup
        v-model="isChannelEditShow"
        position="bottom"
        closeable
        close-icon-position="top-left"
        :style="{ height: '100%' }"
        >
            <channel-edit :myChannels="userChannels" :active='active' @update-active="onUpdateActive"></channel-edit>
        </van-popup>
    </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import { mapState } from 'vuex'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { getItem } from '@/utils/storage'

    export default {
        name: 'HomeIndex',
        components: {
            ArticleList,
            ChannelEdit
        },
        props: {},
        data () {
            return {
                active: 0,
                userChannels: {},
                isChannelEditShow: false
            }
        },
        created () {
            this.loadUserChannels()
        },
        computed: {
            ...mapState(['user'])
        },
        methods: {
            async loadUserChannels () {
                try {
                    let channels = []
                    if (this.user) {
                        const { data } = await getUserChannels()
                        channels = data.data.channels
                    } else {
                        const localChannels = getItem('TOUTIAO_CHANNELS')
                        if (localChannels) {
                            channels = localChannels
                        } else {
                            const { data } = await getUserChannels()
                            channels = data.data.channels
                        }
                    }
                    this.userChannels = channels
                } catch (err) {
                    this.$toast('获取数据失败，请稍后重试')
                }
            },
            onUpdateActive (index, isChannelEditShow = true) {
                this.active = index
                this.isChannelEditShow = isChannelEditShow
            }
        },
        mounted () {}
    }
</script>

<style scoped lang='less'>
    .home-container{
        padding-top: 174px;
        padding-bottom: 100px;
        ::v-deep .van-nav-bar__title {
            max-width: unset;
        }
        .search-btn{
            width: 555px;
            height:64px;
            background-color: #5babfb;
            border: none;
            font-size: 28px;
            .icon-sousuo{
                font-size: 30px;
            }
        }

        .channel-tabs{
            ::v-deep .van-tabs__wrap{
                height: 82px;
                position: fixed;
                z-index: 1;
                left:0;
                right: 0;
                top:92px;
            }
            ::v-deep .van-tab {
                border-right:1px solid #edeff3;
                min-width:200px;
                font-size: 30px;
                color: #777777;
            }
            ::v-deep .van-tab--active{
                color: #333;
            }
            ::v-deep .van-tabs__line{
                background-color: rgb(25, 137, 250);
                width: 31px;
                height: 6px;
                margin-bottom: 8px;
            }

            .placeholder{
                width: 66px;
                height: 82px;
                flex-shrink: 0;
            }

            .ham-btn{
                position: fixed;
                right: 0px;
                width: 66px;
                height: 82px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #fff;
                opacity: 0.902;
                i.toutiao{
                    font-size: 33px;
                }
                &:before {
                    content: "";
                    width: 1px;
                    height: 100%;
                    background-image: url(~@/assets/gradient-gray-line.png);
                    position: absolute;
                    left: 0;
                    background-size: contain;
                }
            }
        }
    }
</style>
