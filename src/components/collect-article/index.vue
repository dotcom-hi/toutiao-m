<template>
    <van-icon
        :name="value ? 'star' : 'star-o'"
        @click="onCollect"
        :color="value ? '#ffa500' : '#777'"
        :loading="loading"
    />
</template>

<script>
import { addCollection, deleteCollection } from '@/api/article'

export default {
    name: 'CollectArticle',
    components: {},
    props: {
        value: {
            type: Boolean,
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
        async onCollect () {
            this.loading = true
            try {
                if (this.value) {
                    await deleteCollection(this.articleId)
                } else {
                    await addCollection(this.articleId)
                }
                this.$emit('input', !this.value)
                this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
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
