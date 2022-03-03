<template>
    <div class="search-history">
        <van-cell title="搜索历史">
            <template v-if="isDeleteShow">
                <span @click="searchHistories = []">全部删除</span>
                &nbsp;&nbsp;
                <span @click="isDeleteShow = false" >完成</span>
            </template>
            <van-icon v-else name="delete" @click="isDeleteShow = true" />
        </van-cell>
        <van-cell
        v-for="(item, index) in searchHistories"
        :key="index"
        :title="item"
        @click="onHistoryClick(item, index)"
        >
            <van-icon v-show="isDeleteShow" name="close"/>
        </van-cell>
    </div>
</template>

<script>
export default {
    name: 'SearchHistory',
    components: {},
    props: {
        searchHistories: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
            isDeleteShow: false
        }
    },
    computed: {},
    watch: {},
    methods: {
        onHistoryClick (item, index) {
            if (this.isDeleteShow) {
                this.searchHistories.splice(index, 1)
            } else {
                this.$emit('search', item)
            }
        }
    },
    created () {},
    mounted () {}
}
</script>

<style scoped lang='less'></style>
