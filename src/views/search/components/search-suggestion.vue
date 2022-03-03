<template>
    <div class="search-suggestion">
        <van-cell
        v-for="(text, index) in suggestions"
        :key="index"
        icon="search"
        @click="$emit('search', text)">
            <div slot="title" v-html="highlight(text)"></div>
        </van-cell>
    </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
    name: 'SearchSuggestion',
    components: {},
    props: {
        searchText: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            suggestions: []
        }
    },
    computed: {},
    watch: {
        searchText: {
            handler: debounce(function (value) {
                this.loadSearchSuggestions(value)
            }, 200),
            immediate: true
        }
    },
    methods: {
        async loadSearchSuggestions (q) {
            try {
                const { data } = await getSearchSuggestions(q)
                this.suggestions = data.data.options
            } catch (err) {
                this.$toast('数据获取失败,请稍后重试')
            }
        },
        highlight (text) {
            const reg = new RegExp(this.searchText, 'gi')
            return text.replace(reg, `<span class="active">${this.searchText}</sapn>`)
        }
    },
    created () {},
    mounted () {}
}
</script>

<style scoped lang='less'>
    .search-suggestion {
        ::v-deep span.active {
            color:#3296fa;
        }
    }
</style>
