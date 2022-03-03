<template>
    <div class="update-gender">
        <van-picker
        title="性别"
        show-toolbar
        :columns="columns"
        @change="onChange"
        @confirm="onConfirm"
        @cancel="$emit('close')"
        :default-index="value"
        />
    </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
    name: 'updateGender',
    components: {},
    props: {
        value: {
            type: Number,
            required: true
        }
    },
    data () {
        return {
            columns: ['男', '女'],
            localGender: this.value
        }
    },
    computed: {},
    watch: {},
    methods: {
        async onConfirm (value, index) {
            this.$toast.loading({
                message: '保存中...',
                forbidClick: true,
                duration: 0
            })
            try {
                const localGender = this.localGender
                await updateUserProfile({
                    gender: localGender
                })
                this.$emit('input', localGender)
                this.$emit('close')
                this.$toast.success('更新完成')
            } catch (err) {
                this.$toast.fail('更新失败')
            }
        },
        onChange (picker, value, index) {
            this.localGender = index
        }
    },
    created () {},
    mounted () {}
}
</script>

<style scoped lang='less'>
    .update-gender {
        ::v-deep .van-picker__confirm, ::v-deep .van-picker__cancel{
            color:rgb(25, 137, 250)
        }
    }

</style>
