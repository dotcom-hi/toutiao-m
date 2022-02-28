<template>
    <div class="search-container">
        <form action="/">
            <van-search
                v-model="searchText"
                show-action
                placeholder="请输入搜索关键词"
                background="#3296fa"
                @search="onSearch"
                @cancel="onCancel"
            />
        </form>

        <search-history />
        <search-suggestion />
        <search-result />
    </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import SearchSuggestion from './components/search-suggestion'

export default {
    name: 'SearchIndex',
    components: {
        SearchHistory,
        SearchResult,
        SearchSuggestion
    },
    props: {},
    data () {
        return {
            searchText: ''
        }
    },
    computed: {},
    watch: {},
    methods: {
        onSearch (val) {
            this.$toast(val)
        },
        onCancel () {
            this.$router.back()
        }
    },
    created () {},
    mounted () {}
}
</script>

<style scoped lang='less'>
    .search-container {
        ::v-deep .van-search__action{
            color: #fff;
        }
    }
</style>
