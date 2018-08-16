import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      },
      addPost(state, post) {
        state.loadedPosts.push(post)
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id)
        state.loadedPosts[postIndex] = editedPost
      },
      setToken(state, token) {
        state.token = token
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) { // dispatched by nuxt immediately and initialises store
        return context.app.$axios
          .$get('/posts.json')
          .then(data => {
            const postsArray =[]
            for (const key in data) {
              postsArray.push({ ...data[key], id:key })
            }
            vuexContext.commit('setPosts', postsArray)
          })
          .catch(e => context.error(e))
      },
      addPost(vuexContext, post) {
        const createdPost = {
          ...post, 
          updatedDate: new Date() 
        }
        return this.$axios.$post('https://nuxt-blog-b6c4a.firebaseio.com/posts.json', createdPost)
        .then(data => {
          vuexContext.commit('addPost', {...createdPost, id: data.name})          
        })
        .catch(e => console.log(e))
      },
      editPost(vuexContext, editedPost) {
        return this.$axios.$put('https://nuxt-blog-b6c4a.firebaseio.com/posts/' + editedPost.id + '.json', editedPost)
        .then(res => {
          vuexContext.commit('editPost', editedPost)
        })
        .catch(e => console.log(e))
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts)
      },
      authenticateUser(vuexContext, authData) {
        let authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCEFYYwB574kt1frbixyOovoc6_Z52uUD0'
        if (!authData.isLogin) {
          authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCEFYYwB574kt1frbixyOovoc6_Z52uUD0'
        } 
        return this.$axios
          .$post(authUrl, {
              email: authData.email,
              password: authData.password,
              returnSecureToken: true
          })
          .then(result => {
            vuexContext.commit('setToken', result.idToken)
          })
          .catch(e => console.log(e))
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      }
    }
  })
}

export default createStore