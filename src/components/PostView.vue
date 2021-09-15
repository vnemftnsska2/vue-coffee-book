<template>
    <div class="post-view">
        <div>
            <h1>{{ post.title}}</h1>
            <span>게시판 번호 {{ post.id }}</span>
            <strong>{{ post.user.name }} . {{ post.createdAt }}</strong>
        </div>
        <p>{{ post.contents }}</p>
    </div>
</template>

<script>
export default {
    name: 'PostView',
    props: {
        post: {
            type: Object,
            required: true,
            validator(post) {
                const isValidPostId = typeof post.id === 'number'
                const isValudtitle = !!post.title && post.title.length
                const isValidContents = post.contents && post.contents.length
                return isValidPostId && isValudtitle && isValidContents
            }
        }
    }
}
</script>