<template>
    <div class="post-list-page">
        <h1>포스트 게시글</h1>
        <post-list :posts="posts"></post-list>
    </div>
</template>

<!-- Script -->
<script>
import PostList from '@/components/PostList';
// import api from '@/api'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'PostListPage',
    components: {
        PostList,
    },
    // data() {
    //     return {
    //         posts: []
    //     }
    // },
    created() {
        this.fetchPostList()
        // api.get('/posts')
        //     .then(res => {
        //         this.posts = res.data;
        //     });
    },
    methods: {
        ...mapActions(['fetchPostList'])
    },
    computed: {
        ...mapState( ['posts'] )
    }
}
</script>