<template>
    <van-icon
        :color="value === 1 ? '#e5645f' : '#777'"
        :name="value  === 1 ? 'good-job' : 'good-job-o'"
        @click="onLike"
        :loading="loading"
    />
</template>

<script>
import { addLike, deleteLike } from '@/api/article'

export default {
    name: 'LikeArticle',
    components: {},
    props: {
        value: {
            type: Number,
            required: true
        },
        articleId: {
            type: [Number, String, Object],
            required: true
        }
    },
    data () {
        return {
            loading: false
        }
    },
    computed: {},
    watch: {},
    methods: {
        async onLike () {
            this.loading = true
            try {
                if (this.value) {
                    await deleteLike(this.articleId)
                    this.$emit('input', this.value = 0)
                } else {
                    await addLike(this.articleId)
                    this.$emit('input', this.value = 1)
                }
                this.$toast.success(this.value === 1 ? '点赞成功' : '取消点赞')
                this.loading = false
            } catch (err) {
                this.$toast('操作失败，请稍后重试')
            }
        }
    },
    created () {},
    mounted () {}
}
</script>

<style scoped lang='less'></style>
