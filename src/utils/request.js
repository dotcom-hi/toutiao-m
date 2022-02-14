// 请求模块
import axios from 'axios'
import store from '@/store'

const request = axios.create({
    baseURL: 'https://www.fastmock.site/mock/22b986f0589d2f6c88685635cf2c87d4/' // 接口的基础路径 http://ttapi.research.itcast.cn/
})

request.interceptors.request.use(config => {
    const { user } = store.state
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
}, err => {
    return Promise.reject(err)
})

export default request
