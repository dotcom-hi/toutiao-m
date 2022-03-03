// 文章相关请求模块
import request from '@/utils/request'

export const getArticle = (params) => {
    return request({
        method: 'GET',
        url: '/app/v1_1/articles',
        params
    })
}

export const getArticleById = (articleId) => {
    return request({
        method: 'GET',
        url: `/app/v1_0/articles/${articleId}`
    })
}

export const addCollection = (target) => {
    return request({
        method: 'POST',
        url: '/app/v1_0/article/collections',
        data: {
            target
        }
    })
}

export const deleteCollection = (target) => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/article/collections/${target}`
    })
}

export const addLike = (target) => {
    return request({
        method: 'POST',
        url: '/app/v1_0/article/likings',
        data: {
            target
        }
    })
}

export const deleteLike = (target) => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/article/likings/${target}`
    })
}
