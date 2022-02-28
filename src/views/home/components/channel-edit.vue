<template>
    <div class="channel-edit">
        <van-cell :border="false">
            <div slot="title" class="title-text">我的频道</div>
            <van-button type="danger" round plain size="mini" class="edit-btn" @click="isEdit = !isEdit">
                {{isEdit?"完成":"编辑"}}</van-button>
        </van-cell>
        <van-grid :gutter="10" class="my-grid">
            <van-grid-item
            class="grid-item"
            v-for=" (channel, index) in myChannels"
            :key="channel.id"
            @click="onMyChannelClick(channel, index)"
            >
                <van-icon v-show="isEdit && !fixChannels.includes(channel.id)" slot="icon" class="toutiao icon-guanbi"/>
                <span
                slot="text"
                class="text"
                :class="{active: index === active}"
                >{{channel.name}}
                </span>
            </van-grid-item>
        </van-grid>

        <van-cell :border="false">
            <div slot="title">频道推荐</div>
        </van-cell>
        <van-grid :gutter="10" class="recommand-grid">
            <van-grid-item
            class="grid-item"
            icon="plus"
            v-for="(channel, index) in recommandChannels"
            :key="index"
            :text="channel.name"
            @click="onAddChannel(channel)"/>
        </van-grid>
    </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
    name: 'ChannelEdit',
    components: {},
    props: {
        myChannels: {
            type: Array,
            required: true
        },
        active: {
            type: Number,
            required: true
        }
    },
    data () {
        return {
            allChannels: [],
            isEdit: false,
            fixChannels: ['001']
        }
    },
    computed: {
        ...mapState(['user']),
        recommandChannels () {
            const channels = []
            this.allChannels.forEach(channel => {
                const ret = this.myChannels.find(myChannel => {
                    return myChannel.id === channel.id
                })
                if (!ret) {
                    channels.push(channel)
                }
            })
            return channels
        }
    },
    watch: {},
    methods: {
        async loadAllChannels () {
            try {
                const { data } = await getAllChannels()
                this.allChannels = data.data.channels
            } catch (err) {
                this.$toast('数据获取失败')
            }
        },
        async onAddChannel (channel) {
            this.myChannels.push(channel)
            if (this.user) {
                try {
                    await addUserChannel({
                        id: channel.id,
                        seq: this.myChannels.length
                    })
                } catch (err) {
                    this.$toast('保存失败，请稍后重试')
                }
            } else {
                setItem('TOUTIAO_CHANNELS', this.myChannels)
            }
        },
        onMyChannelClick (channel, index) {
            if (this.isEdit) {
                if (this.fixChannels.includes(channel.id)) {
                    return
                }
                if (index <= this.active) {
                    this.$emit('update-active', this.active - 1, true)
                }
                this.myChannels.splice(index, 1)
                this.deleteChannel(channel)
            } else {
                this.$emit('update-active', index, false)
            }
        },
        async deleteChannel (channel) {
            try {
                if (this.user) {
                    await deleteUserChannel(channel.id)
                } else {
                    setItem('TOUTIAO_CHANNELS', this.myChannels)
                }
            } catch (err) {
                this.$toast('操作失败，请稍后重试')
            }
        }
    },
    created () {
        this.loadAllChannels()
    },
    mounted () {}
}
</script>

<style scoped lang='less'>
    .channel-edit {
        padding: 85px 0;
        .title-text {
            font-size: 32px;
            color: #333333;
        }
        .edit-btn{
            width: 104px;
            height: 48px;
            font-size: 26px;
            color:#f85959;
            border: 1px solid #f85959;
        }
        ::v-deep .grid-item{
            width: 160px;
            height: 86px;
            .van-grid-item__content{
                white-space: nowrap;
                background-color: #f4f5f6;
            }
            .van-grid-item__text, .text{
                font-size: 28px;
                color: #222;
                margin-top: 0px;
            }
            .van-grid-item__icon-wrapper{
                position: unset;
            }
        }
        .my-grid{
            ::v-deep .grid-item{
                .icon-guanbi{
                    position: absolute;
                    right: -10px;
                    top:-10px;
                    z-index: 2;
                    color: #cacaca;
                    font-size: 26px;
                }
                .active {
                    color:red;
                }
            }
        }
        .recommand-grid{
            ::v-deep .grid-item{
                .van-grid-item__content{
                    flex-direction: row;
                    .van-icon-plus{
                        font-size: 28px;
                        margin-right: 6px;
                    }
                    .van-grid-item__text{
                        margin-top: 0;
                    }
                }
            }
        }
    }
</style>
