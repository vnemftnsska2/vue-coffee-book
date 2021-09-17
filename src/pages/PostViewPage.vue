<template>
    <div class="post-view-page">
        <post-view v-if="post" :post="post"></post-view>
        <router-link :to="{ name: 'PostListPage'}">목록</router-link>
    </div>
</template>

<!-- Script -->
<script>
import { mapState, mapActions } from 'vuex'
import PostView from '@/components/PostView'

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
        ...mapActions([ 'fetchPost' ])
    },
    computed: {
        ...mapState([ 'post' ])
    },
}
</script>