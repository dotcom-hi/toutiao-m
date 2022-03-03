<template>
    <div class="update-birthday">
        <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="性别"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="$emit('close')"
        @confirm="onConfirm"
        />
    </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'

export default {
    name: 'updateBirthday',
    components: {},
    props: {
        value: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            minDate: new Date(1970, 0, 1),
            maxDate: new Date(),
            currentDate: new Date(this.value)
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
                const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
                await updateUserProfile({
                    birthday: currentDate
                })
                this.$emit('input', currentDate)
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
    .update-birthday {
        ::v-deep .van-picker__confirm, ::v-deep .van-picker__cancel{
            color:rgb(25, 137, 250)
        }
    }
</style>
