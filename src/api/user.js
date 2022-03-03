// 用户相关请求模块
import request from '@/utils/request'
import store from '@/store'

export const login = data => {
    return request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data
    })
}

export const sendSms = mobile => {
    return request({
        method: 'GET',
        url: `/app/v1_0/sms/codes/${mobile}`
    })
}

export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user/',
        headers: {
            Authorization: `Bearer ${store.state.user.token}`
        }
    })
}

export const getUserChannels = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user/channels'
    })
}

export const addFollow = (target) => {
    return request({
        method: 'POST',
        url: '/app/v1_0/user/followings',
        data: {
            target
        }
    })
}

export const deleteFollow = (target) => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/followings/${target}`
    })
}

export const getUserProfile = (target) => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user/profile'
    })
}

export const updateUserProfile = (data) => {
    return request({
        method: 'PUT',
        url: '/app/v1_0/user/profile',
        data
    })
}

export const updateUserPhoto = (data) => {
    return request({
        method: 'PUT',
        url: '/app/v1_0/user/photo',
        data
    })
}
