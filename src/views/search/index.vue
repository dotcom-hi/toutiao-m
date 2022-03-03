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
                @focus="isResultShow = false"
            />
        </form>
        <search-result
        v-if="isResultShow"
        :search-text = searchText
        />
        <search-suggestion
        v-else-if="searchText"
        :search-text = searchText
        @search="onSearch"
        />
        <search-history
        v-else
        :search-histories="searchHistories"
        @search="onSearch"
        @clear-search-histories="searchHistories = []"
        />
    </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import SearchSuggestion from './components/search-suggestion'
import { getItem, setItem } from '@/utils/storage'

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
            searchText: '',
            isResultShow: false,
            searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || []
        }
    },
    computed: {},
    watch: {
        searchHistories (val) {
            setItem('TOUTIAO_SEARCH_HISTORIES', val)
        }
    },
    methods: {
        onSearch (val) {
            this.searchText = val
            const index = this.searchHistories.indexOf(val)
            if (index !== -1) {
                this.searchHistories.splice(index, 1)
            }
            this.searchHistories.unshift(val)
            this.isResultShow = true
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
        padding-top: 108px;
        ::v-deep .van-search{
            position:fixed;
            left:0;
            top:0;
            right:0;
            z-index: 1;
            .van-search__action{
                color: #fff;
            }
        }

    }
</style>
