<template>
    <div class="article-container" fixed>
        <van-nav-bar
            class="page-nav-bar"
            title="黑马头条"
            @click-left="onClickLeft"
            @click-right="onClickRight"
        >
        <template #left>
            <i slot="icon" class="toutiao icon-zuojiantou"/>
        </template>
        <template #right>
            <i slot="icon" class="toutiao icon-gengduo"/>
        </template>
        </van-nav-bar>

        <div class="main-wrap">
            <div v-if="loading" class="loading-wrap">
                <van-loading
                color="#3296fa"
                vertical>
                加载中
                </van-loading>
            </div>

            <div v-else-if="article.title" class="article-detail">
                <h1 class="article-title">{{ article.title }}</h1>
                <van-cell class="user-info" center :border="false">
                <van-image
                    class="avatar"
                    slot="icon"
                    round
                    fit="cover"
                    :src="article.aut_photo"
                />
                <div slot="title" class="user-name">{{ article.aut_name }}</div>
                <div slot="label" class="publish-date">{{ article.pubdate | relativeTime }}</div>
                <follow-user
                :is-followed = "article.is_followed"
                class = "follow-btn"
                :user-id = "article.aut_id"
                @update-is_followed = "article.is_followed = $event"
                />
                </van-cell>
                <div class="article-content markdown-body"
                v-html="article.content"
                ref="article-content"
                >
                </div>
                <van-divider>正文结束</van-divider>
                <comment-list
                :source="article.art_id"
                @onload-success="totalCommentCount = $event.total_count"
                :list="commentList"
                />
                <div class="article-bottom">
                    <van-button
                        class="comment-btn"
                        type="default"
                        round
                        size="small"
                        @click="isPostShow = true"
                    >写评论</van-button>
                    <van-icon
                        name="comment-o"
                        :info="totalCommentCount"
                        color="#777"
                    />
                    <collect-article
                    v-model="article.is_collected"
                    :article-id="article.art_id"
                    />
                    <like-article
                    v-model="article.attitude"
                    :article-id="article.art_id"
                    />
                    <van-icon name="share" color="#777777"></van-icon>
                </div>
                <van-popup
                v-model="isPostShow"
                closeable
                position="bottom"
                >
                    <comment-post
                    :artId="article.art_id"
                    @post-success="onPostSuccess"
                    />
                </van-popup>
            </div>

            <div v-else-if="errStatus === 404" class="error-wrap">
                <van-icon name="failure" />
                <p class="text">该资源不存在或已删除！</p>
            </div>

            <div v-else class="error-wrap">
                <van-icon name="failure" />
                <p class="text">内容加载失败！</p>
                <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant'
import FollowUser from '@/components/follow-user'
import CollectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-article'
import CommentList from './components/comment-list'
import CommentPost from './components/comment-post'

export default {
    name: 'ArticleIndex',
    components: {
        FollowUser,
        CollectArticle,
        LikeArticle,
        CommentList,
        CommentPost
    },
    props: {
        articleId: {
            type: [Number, String, Object],
            required: true
        }
    },
    data () {
        return {
            article: {},
            loading: true,
            errStatus: 0,
            followLoading: false,
            totalCommentCount: 0,
            isPostShow: false,
            commentList: []
        }
    },
    computed: {},
    watch: {},
    methods: {
        onClickLeft () {
            this.$router.back()
        },
        onClickRight () {
            this.$toast('按钮')
        },
        async loadArticle () {
            this.loading = true
            try {
                const { data } = await getArticleById(this.articleId)
                this.article = data.data
                setTimeout(() => {
                    this.previewImage()
                }, 0)
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    this.errStatus = 404
                }
                this.$toast('获取失败，请稍后重试')
            }
            this.loading = false
        },
        previewImage () {
            const articleContent = this.$refs['article-content']
            const imgs = articleContent.querySelectorAll('img')
            const images = []
            imgs.forEach((img, index) => {
                images.push(img.src)
                img.onclick = () => {
                    ImagePreview({
                        images: images,
                        startPosition: index
                    })
                }
            })
        },
        onPostSuccess (data) {
            this.isPostShow = false
            this.commentList.unshift(data.new_obj)
        }
    },
    created () {
        this.loadArticle()
    },
    mounted () {}
}
</script>

<style scoped lang='less'>
@import "./github-markdown.css";

    .article-container {
        .page-nav-bar {
            .icon-gengduo,.icon-zuojiantou {
                color: #fff
            }
        }
        .main-wrap {
            position: fixed;
            left: 0;
            right: 0;
            top: 92px;
            bottom: 88px;
            overflow-y: scroll;
            background-color: #fff;
        }
        .article-detail {
            .article-title {
                font-size: 40px;
                padding: 50px 32px;
                margin: 0;
                color: #3a3a3a;
            }

            .user-info {
                padding: 0 32px;
                .avatar {
                    width: 70px;
                    height: 70px;
                    margin-right: 17px;
                }
                .van-cell__label {
                    margin-top: 0;
                }
                .user-name {
                    font-size: 24px;
                    color: #3a3a3a;
                }
                .publish-date {
                    font-size: 23px;
                    color: #b7b7b7;
                }
                .follow-btn {
                    width: 170px;
                    height: 58px;
                }
            }

            .article-content {
                padding: 55px 32px;
                /deep/ p {
                    text-align: justify;
                }
            }
        }

        .loading-wrap {
            padding: 200px 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff;
        }

        .error-wrap {
            padding: 200px 32px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #fff;
            .van-icon {
                font-size: 122px;
                color: #b4b4b4;
            }
            .text {
                font-size: 30px;
                color: #666666;
                margin: 33px 0 46px;
            }
            .retry-btn {
                width: 280px;
                height: 70px;
                line-height: 70px;
                border: 1px solid #c3c3c3;
                font-size: 30px;
                color: #666666;
            }
        }

        .article-bottom {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: space-around;
            align-items: center;
            box-sizing: border-box;
            height: 88px;
            border-top: 1px solid #d8d8d8;
            background-color: #fff;
            .comment-btn {
                width: 282px;
                height: 46px;
                border: 2px solid #eeeeee;
                font-size: 30px;
                line-height: 46px;
                color: #a7a7a7;
            }
            /deep/ .van-icon {
                font-size: 40px;
                .van-info {
                    font-size: 16px;
                    background-color: #e22829;
                }
            }
        }
    }
</style>
