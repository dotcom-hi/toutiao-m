<template>
    <van-cell class="article-item" :to="`/article/${article.art_id}`">
        <template #title class="title van-multi-ellipsis--l2">
            {{article.title}}
        </template>
        <template #label>
            <div v-if="article.cover.type === 3" class="cover-wrap">
                <div class="cover-item" v-for="( img, index ) in article.cover.images" :key="index">
                    <van-image
                    class="cover-item-img"
                    fit="cover"
                    :src="img"
                    />
                </div>
            </div>
            <div class="label-info-wrap">
                <span>{{article.aut_name}}</span>
                <span>{{article.comm_count}}</span>
                <span>{{article.pubdate | relativeTime}}</span>
            </div>
        </template>
        <template #default v-if="article.cover.type === 1">
            <van-image
            class="right-cover"
            fit="cover"
            :src="article.cover.images[0]"
            />
        </template>
    </van-cell>
</template>

<script>
export default {
    name: 'ArticleItem',
    components: {},
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    data () {
        return {}
    },
    computed: {},
    watch: {},
    methods: {},
    created () {},
    mounted () {}
}
</script>

<style scoped lang='less'>
    .article-item{
        min-height: 146px;
        .title{
            font-size: 32px;
            color: #3a3a3a;
            word-wrap: break-word;
            word-break: break-all;
            overflow: hidden;
        }
        .van-cell__value{
            flex: unset;
            width: 232px;
            height: 146px;
            padding-left: 25px;
            position: absolute;
            right: 32px;
        }
        .right-cover{
            width: 100%;
            height: 146px;
        }
        .label-info-wrap span{
            font-size: 22px;
            color: #b4b4b4 ;
            margin-right: 25px;
        }
        .cover-wrap{
            display: flex;
            padding: 30px 0;
            .cover-item{
                flex:1;
                height: 146px;
                &:not(:last-child){
                    padding-right: 4px;
                }
                .cover-item-img{
                    width: 100%;
                    height: 146px;
                }
            }
        }
    }
</style>
