<template>
    <div class="update-photo">
        <img :src="img" class="img" ref="img"/>
        <div class="toolbar">
            <div class="cancel" @click="$emit('close')">取消</div>
            <div class="confirm" @click="onConfirm">完成</div>
        </div>
    </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user'

export default {
    name: 'updatePhoto',
    components: {},
    props: {
        img: {
            type: [String, Object],
            required: true
        }
    },
    data () {
        return {
            cropper: null
        }
    },
    computed: {},
    watch: {},
    methods: {
        onConfirm () {
            this.cropper.getCroppedCanvas().toBlob(async (blob) => {
                // const formData = new FormData()
                // formData.append('photo', blob)
                // const { data } = await updateUserPhoto(formData)
                const { data } = await updateUserPhoto({
                    photo: blob
                })
                this.$emit('close')
                this.$emit('update-photo', data.data.photo)
            })
        }
    },
    created () {},
    mounted () {
        const image = this.$refs.img
        this.cropper = new Cropper(image, {
            viewMode: 1,
            dragMode: 'move',
            aspectRatio: 1,
            autoCropArea: 1,
            cropBoxMovable: false,
            cropBoxResizable: false,
            background: false,
            movable: true
        })
    }
}
</script>

<style scoped lang='less'>
    .img {
        max-width: 100%;
        display: block;
    }
    .update-photo {
        background: black;
        height: 100%;
        .toolbar {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: space-between;
            .cancel, .confirm {
                width: 90px;
                height: 90px;
                font-size: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
            }
        }
    }
</style>
