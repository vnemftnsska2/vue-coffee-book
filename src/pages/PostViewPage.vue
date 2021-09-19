<template>
    <div class="post-view-page">
        <post-view v-if="post" :post="post"></post-view>
        <router-link :to="{ name: 'PostEditPage', params: { postId } }">수정</router-link>
        <button @click="onDelete">삭제</button>
        <router-link :to="{ name: 'PostListPage'}">목록</router-link>
    </div>
</template>

<!-- Script -->
<script>
import { mapState, mapActions } from 'vuex'
import PostView from '@/components/PostView'
import api from '@/api'

export default {
    name: 'PostViewPage',
    components: {
        PostView,
    },
    props: {
        postId: {
            type: String,
            required: true,
        }
    },
    created() {
        this.fetchPost(`/${this.postId}`)
            .catch(err => {
                alert(err.response.data.msg);
                this.$router.back();
            });
    },
    methods: {
        onDelete() {
            const { id } = this.post
            api.delete(`/posts/${id}`)
                .then(res => {
                    alert('게시글이 삭제되었습니다.')
                    this.$router.push({ name: 'PostListPage' })
                })
                .catch(err => {
                    const errStatus = err.response.status
                    if (errStatus === 401) {
                        alert('로그인이 필요합니다')
                        this.$router.push({ name: 'Signin' })
                    } else {
                        alert(err.response.data.msg)
                    }
                })
        },
        ...mapActions([ 'fetchPost' ])
    },
    computed: {
        ...mapState([ 'post' ])
    },
}
</script>