<template>
    <van-button
        v-if="isFollowed"
        class="follow-btn"
        round
        size="small"
        @click="onFollow"
        :loading="loading"
    >已关注</van-button>
    <van-button
        v-else
        class="follow-btn"
        type="info"
        color="#3296fa"
        round
        size="small"
        icon="plus"
        @click="onFollow"
        :loading="loading"
    >关注</van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'

export default {
    name: 'FollowUser',
    components: {},
    props: {
        isFollowed: {
            type: Boolean,
            required: true
        },
        userId: {
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
        async onFollow () {
            this.loading = true
            try {
                if (this.isFollowed) {
                    await deleteFollow(this.userId)
                } else {
                    await addFollow(this.userId)
                }
                this.$emit('update-is_followed', !this.isFollowed)
            } catch (err) {
                let message = '操作失败，请稍后再试'
                if (err.response && err.response.status === 400) {
                    message = '你不能关注自己！'
                }
                this.$toast(message)
            }
            this.loading = false
        }
    },
    created () {},
    mounted () {}
}
</script>

<style scoped lang='less'></style>
