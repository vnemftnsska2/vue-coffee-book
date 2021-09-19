<template>
    <div class="post-edit-page">
        <h1>수정하기</h1>
        <post-edit-form v-if="post"
            :post="post"
            @submit="onSubmit" />
        <p v-else>게시물 불러오는 중...</p>
    </div>
</template>

<script>
import api from '@/api'
import { mapState } from 'vuex'
import PostEditForm from '@/components/PostEditForm.vue'
export default {
    name: 'PostEditPage',
    props: {
        type: String,
        required: true,
    },
    components: { PostEditForm },
    methods: {
        onSubmit(payload) {
            const { title, contents } = payload;
            api.put(`/posts/${this.post.id}`, { title, contents })
                .then(res => {
                    alert('게시물 수정이 완료되었습니다.')
                    this.$router.push({
                        name: 'PostViewPage',
                        params: { postId: res.data.id.toString() },
                    })
                })
                .catch(err => {
                    const errStatus = err.response.status;
                    if (errStatus === 401) {
                        alert('로그인이 필요합니다.')
                        this.$router.push({ name: 'Signin' })
                    } else if (errStatus === 403) {
                        alert(err.response.data.msg)
                        this.$router.back()
                    } else {
                        alert(err.response.data.msg)
                    }
                })
        }
    },
    computed: {
        ...mapState([ 'post' ])
    }
}
</script>