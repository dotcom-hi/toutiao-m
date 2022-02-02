<template>
    <div class="login-container">
        <van-nav-bar title="登录">
            <template #left>
                <van-icon name="cross" color="#fff" @click='$router.back()'/>
            </template>
        </van-nav-bar>
        <van-form ref="loginForm" @submit="onSubmit">
            <van-field v-model='user.mobile' name="mobile" placeholder="请输入手机号" :rules='userFormRules.mobile' type='number' maxlength='11'>
                <i slot='left-icon' class="toutiao icon-shouji"></i>
            </van-field>
            <van-field v-model='user.code' name="code" placeholder="请输入验证码"
                :rules='userFormRules.code' type='number' maxlength='6'>
                <i slot="left-icon" class="toutiao icon-yanzhengma"></i>
                <template #button>
                    <van-count-down v-if='isCountDownShow' :time="1000 * 10" format="ss s" @finish='isCountDownShow = False' />
                    <van-button v-else class="send-sms-btn" round size="small" @click='onSendSms' native-type="button">获取验证码</van-button>
                </template>
            </van-field>
            <div class="login-btn-wrap">
                <van-button block type="info" native-type="submit"><span class="login-text">登录</span></van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
    import { login, sendSms } from '@/api/user'
    export default {
        name: 'LoginPage',
        components: {},
        props: {},
        data () {
            return {
                user: {
                    mobile: '',
                    code: ''
                },
                userFormRules: {
                    mobile: [{
                        required: true,
                        message: '手机号不能为空'
                    }, {
                        pattern: /^1[3|5|7|8]\d{9}$/,
                        message: '手机号格式错误'
                    }],
                    code: [{
                        required: true,
                        message: '验证码不能为空'
                    }, {
                        pattern: /^\d{6}$/,
                        message: '验证码格式错误'
                    }]
                },
                isCountDownShow: false
            }
        },
        computed: {},
        watch: {},
        methods: {
            async onSubmit () {
                const user = this.user
                this.$toast.loading({
                    message: '登录中...',
                    forbidClick: true,
                    duration: 0
                })
                try {
                    const { data } = await login(user)
                    this.$store.commit('setUser', data.data)
                    this.$toast.success('登录成功')
                } catch (err) {
                    if (err.response.status === 400) {
                        this.$toast.fail('手机号或验证码错误')
                    } else {
                        this.$toast.fail('登陆失败，请稍后重试')
                    }
                }
            },
            async onSendSms () {
                try {
                    await this.$refs.loginForm.validate('mobile')
                    console.log('验证通过')
                } catch (err) {
                    return console.log('验证失败', err)
                }
                this.isCountDownShow = true
                try {
                    await sendSms(this.user.mobile)
                    this.$toast('发送成功')
                } catch (err) {
                    this.isCountDownShow = false
                    console.log('发送失败', err)
                    if (err.response.status === 429) {
                        this.$toast('发送太频繁了，请稍后重试')
                    } else {
                        this.$toast('发送失败，请稍后重试')
                    }
                }
            }
        }
    }
</script>

<style scoped lang='less'>
    .login-container .toutiao {
        font-size: 37px;
    }
    .send-sms-btn {
        background-color: rgb(237,237,237);
        color: rgb(125, 125, 125);
        height: 46px;
        line-height: 46px;
    }
    .login-btn-wrap{
        padding: 53px 33px;
    }
    .login-text{
        font-size: 32px;
    }
</style>
