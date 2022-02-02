// 用户相关请求模块
import request from '@/utils/request'

export const login = data => {
    return request({
        methods: 'POST',
        url: '/app/v1_0/authorizations',
        data
    })
}

export const sendSms = mobile => {
    return request({
        methods: 'GET',
        url: `/app/v1_0/sms/codes/${mobile}`
    })
}
