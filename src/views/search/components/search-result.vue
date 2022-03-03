<template>
    <div class="search-result">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            >
            <van-cell v-for="(result, index) in list" :key="index" :title="result.title" />
        </van-list>
    </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
    name: 'SearchResult',
    components: {},
    props: {
        searchText: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            list: [],
            loading: false,
            finished: false,
            page: 1,
            perPage: 20,
            error: false
        }
    },
    computed: {},
    watch: {},
    methods: {
        async onLoad () {
            try {
                const { data } = await getSearchResult({
                    page: this.page,
                    per_page: this.perPage,
                    q: this.searchText
                })
                const res = data.data.results
                this.list.push(...res)
                this.loading = false
                if (res.length) {
                    this.page++
                } else {
                    this.finished = true
                }
            } catch (err) {
                this.error = true
                this.loading = false
            }
        }
    },
    created () {},
    mounted () {}
}
</script>

<style scoped lang='less'></style>
