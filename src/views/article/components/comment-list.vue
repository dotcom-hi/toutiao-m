<template>
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
    >
        <comment-item
        v-for="(result, index) in list"
        :key="index"
        :comment="result"
        />
    </van-list>
</template>

<script>
import { getComment } from '@/api/comment'
import CommentItem from './comment-item'

export default {
    name: 'CommentList',
    components: {
        CommentItem
    },
    props: {
        source: {
            type: [Number, String, Object],
            required: true
        },
        list: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            // list: [],
            loading: false,
            finished: false,
            offset: null,
            limit: 10,
            error: false
        }
    },
    computed: {},
    watch: {},
    methods: {
        async onLoad () {
            try {
                const { data } = await getComment({
                    type: 'a',
                    source: this.source,
                    offset: this.offset,
                    limit: this.limit
                })
                const res = data.data.results
                this.list.push(...res)
                this.$emit('onload-success', data.data)
                this.loading = false
                if (res.length) {
                    this.offset = data.data.last_id
                } else {
                    this.finished = true
                }
            } catch (err) {
                this.error = true
                this.loading = false
            }
        }
    },
    created () {
        this.onLoad()
    },
    mounted () {}
}
</script>

<style scoped lang='less'></style>
