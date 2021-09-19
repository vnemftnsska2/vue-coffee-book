import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import AppHeader from '@/components/AppHeader'
import PostListPage from '@/pages/PostListPage'
import PostViewPage from '@/pages/PostViewPage'
import PostCreatePage from '@/pages/PostCreatePage'
import PostEditPage from '@/pages/PostEditPage'
import Signup from '@/pages/Signup'
import Signin from '@/pages/Signin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'PostListPage',
      components: {
        header: AppHeader,
        default: PostListPage,
      },
    },
    {
      path: '/post/create',
      name: 'PostCreatePage',
      components: {
        header: AppHeader,
        default: PostCreatePage,
      },
      beforeEnter (to, from, next) {
        const { isAuthorized } = store.getters
        if (!isAuthorized) {
          alert('로그인이 필요합니다.')
          next({ name: 'Signin' })
        }
        next()
      }
    },
    {
      path: '/post/:postId',
      name: 'PostViewPage',
      components: {
        header: AppHeader,
        default: PostViewPage
      },
      props: {
        default: true,
      },
    },
    {
      path: '/post/:postId/edit',
      name: 'PostEditPage',
      components: {
        header: AppHeader,
        default: PostEditPage,
      },
      props: {
        default: true
      },
      beforeEnter(to, from, next) {
        const { isAuthorized } = store.getters
        if (!isAuthorized) {
          alert('로그인이 필요합니다.')
          next({ name: 'Signin' })
          return false;
        }
        store.dispatch('fetchPost', to.params.postId)
          .then(res => {
            const post = store.state.post
            const isAuthor = post.user.id === store.state.me.id
            if (isAuthor) {
              next()
            } else {
              alert('본인의 게시물만 수정할 수 있습니다.')
              next(from)
            }
          })
          .catch(err => {
            alert(err.response.data.msg)
            next(from)
          })
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      components: {
        header: AppHeader,
        default: Signup,
      }
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
    },
  ]
})
