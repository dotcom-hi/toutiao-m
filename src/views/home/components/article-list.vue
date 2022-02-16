<template>
    <div class="article-list">
        <van-pull-refresh
        v-model="isRefreshLoading"
        @refresh="onRefresh"
        :success-text="reFreshSuccessText"
        :success-duration="1500"
        >
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                :error.sync="error"
                error-text="请求失败，点击重新加载"
                @load="onLoad"
            >
                <article-item v-for="item in list" :key="item.art_id" :article="item" />
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import { getArticle } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
    name: 'ArticleList',
    components: {
        ArticleItem
    },
    props: {
        channel: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            list: [],
            loading: false,
            finished: false,
            timestamp: null,
            error: false,
            isRefreshLoading: false,
            reFreshSuccessText: '刷新成功'
        }
    },
    computed: {},
    watch: {},
    methods: {
        async onLoad () {
            try {
                const { data } = await getArticle({
                    channel_id: this.channel.id,
                    timestamp: this.timestamp || Date.now(),
                    with_top: 1
                })
                const res = data.data.results
                this.list.push(...res)
                this.loading = false
                if (res.length) {
                    this.timestamp = data.data.pre_timestamp
                } else {
                    this.finished = true
                }
            } catch (err) {
                this.error = true
                this.loading = false
            }
        },
        async onRefresh () {
            try {
                const { data } = await getArticle({
                    channel_id: this.channel.id,
                    timestamp: Date.now(),
                    with_top: 1
                })
                this.list.unshift(...data.data.results)
                this.reFreshSuccessText = `刷新成功,更新了${data.data.results.length}条数据`
                this.isRefreshLoading = false
            } catch (err) {
                this.reFreshSuccessText = '刷新失败'
                this.isRefreshLoading = false
            }
        }
    },
    created () {},
    mounted () {}
}
</script>

<style scoped lang='less'>
    .article-list {
        height:79vh;
        overflow-y: auto;
    }
</style>
