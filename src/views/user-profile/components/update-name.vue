<template>
    <div class="update-name">
        <van-nav-bar
        title="设置昵称"
        left-text="取消"
        right-text="完成"
        @click-left="$emit('close')"
        @click-right="onUpdata"
        >
        </van-nav-bar>
        <div class="field-wrap">
            <van-field
            v-model.trim="localName"
            rows="2"
            autosize
            type="textarea"
            maxlength="7"
            placeholder="请输入昵称"
            show-word-limit
            />
        </div>
    </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
    name: 'updateName',
    components: {},
    props: {
        value: {
            type: String,
            require: true
        }
    },
    data () {
        return {
            localName: this.value
        }
    },
    computed: {},
    watch: {},
    methods: {
        async onUpdata () {
            this.$toast.loading({
                message: '保存中...',
                forbidClick: true,
                duration: 0
            })
            try {
                const localName = this.localName
                if (!localName.length) {
                    this.$toast('昵称不能为空')
                    return
                }
                await updateUserProfile({
                    name: localName
                })
                this.$emit('input', localName)
                this.$emit('close')
                this.$toast.success('更新完成')
            } catch (err) {
                this.$toast.fail('更新失败')
            }
        }
    },
    created () {},
    mounted () {}
}
</script>

<style scoped lang='less'>
    .update-name {
        ::v-deep .van-nav-bar__content{
            background-color: white;
            .van-nav-bar__title, .van-icon{
                color: black;
            }
        }
    }
    .field-wrap {
        padding: 20px;
    }

</style>
