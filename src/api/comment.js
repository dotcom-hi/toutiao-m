import request from '@/utils/request'

export const addComment = (data) => {
    return request({
        method: 'POST',
        url: '/app/v1_0/comments',
        data
    })
}

export const getComment = (params) => {
    return request({
        method: 'GET',
        url: '/app/v1_0/comments',
        params
    })
}

export const addLike = (target) => {
    return request({
        method: 'POST',
        url: '/app/v1_0/comment/likings',
        data: {
            target
        }
    })
}

export const deleteLike = (target) => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/comment/likings/${target}`
    })
}
