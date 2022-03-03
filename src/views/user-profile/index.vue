<template>
    <div class="user-profile">
        <van-nav-bar
        class="page-nav-bar"
        title="个人信息"
        left-arrow
        @click-left="$router.back()"
        >
        </van-nav-bar>

        <input
        type="file"
        hidden
        ref="file"
        @change="onFileChange"
        >
        <van-cell class="avatar-cell" title="头像" is-link center>
            <van-image
            class="avatar"
            round
            fit="cover"
            :src="user.photo"
            @click="$refs.file.click()"
            />
        </van-cell>
        <van-cell
        title="昵称"
        :value="user.name"
        is-link
        @click="isUpdataNameShow = true"
        />
        <van-cell
        title="性别"
        :value="user.gender === 0 ? '男' : '女'"
        is-link
        @click="isUpdataGenderShow = true"/>
        <van-cell
        title="生日"
        :value="user.birthday"
        is-link
        @click="isUpdataBirthdayShow = true"
        />

        <van-popup
        v-model="isUpdataNameShow"
        style="height: 100%;"
        position="bottom"
        >
            <update-name
            v-if="isUpdataNameShow"
            @close="isUpdataNameShow = false"
            v-model="user.name"
            />
        </van-popup>

        <van-popup
        v-model="isUpdataGenderShow"
        position="bottom"
        >
            <update-gender
            v-if="isUpdataGenderShow"
            @close="isUpdataGenderShow = false"
            v-model="user.gender"
            />
        </van-popup>

        <van-popup
        v-model="isUpdataBirthdayShow"
        position="bottom"
        >
            <update-birthday
            v-if="isUpdataBirthdayShow"
            @close="isUpdataBirthdayShow = false"
            v-model="user.birthday"
            />
        </van-popup>

        <van-popup
        v-model="isUpdataPhotoShow"
        position="bottom"
        style="height: 100%"
        >
            <update-photo
            v-if="isUpdataPhotoShow"
            @close="isUpdataPhotoShow = false"
            @update-photo="user.photo = $event"
            :img="img"
            />
        </van-popup>
    </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import updateName from './components/update-name'
import updateGender from './components/update-gender'
import updateBirthday from './components/update-birthday'
import updatePhoto from './components/update-photo'

export default {
    name: 'userProfile',
    components: {
        updateName,
        updateGender,
        updateBirthday,
        updatePhoto
    },
    props: {},
    data () {
        return {
            user: {},
            isUpdataNameShow: false,
            isUpdataGenderShow: false,
            isUpdataBirthdayShow: false,
            isUpdataPhotoShow: false,
            img: null
        }
    },
    computed: {},
    watch: {},
    methods: {
        async loadUserProfile () {
            try {
                const { data } = await getUserProfile()
                this.user = data.data
            } catch (err) {
                this.$toast('fail')
            }
        },
        onFileChange () {
            const file = this.$refs.file.files[0]
            this.img = window.URL.createObjectURL(file)
            this.isUpdataPhotoShow = true
            this.$refs.file.value = ''
        }
    },
    created () {
        this.loadUserProfile()
    },
    mounted () {}
}
</script>

<style scoped lang='less'>
    .user-profile {
        .avatar-cell {
            .van-cell__value {
            display: flex;
            flex-direction: row-reverse;
            }
            .avatar {
                width: 60px;
                height: 60px;
            }
        }
        .van-popup {
            background: #f5f7f9;
        }
    }
</style>
