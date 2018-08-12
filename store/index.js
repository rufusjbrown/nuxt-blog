import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) { // dispatched by nuxt immediately and initialises store
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            vuexContext.commit('setPosts', [
              {
                id: '1', 
                title: 'First Post', 
                previewText: 'This is our first post!', 
                thumbnail: 'https://i1.wp.com/www.brookings.edu/wp-content/uploads/2017/11/metro_20171121_tech-empowers-tech-polarizes-mark-muro.jpg?w=745&crop=0%2C38px%2C100%2C421px&ssl=1'
              },
              {
                id: '2', 
                title: 'Second Post', 
                previewText: 'This is our second post!', 
                thumbnail: 'https://i1.wp.com/www.brookings.edu/wp-content/uploads/2017/11/metro_20171121_tech-empowers-tech-polarizes-mark-muro.jpg?w=745&crop=0%2C38px%2C100%2C421px&ssl=1'
              }
            ])
          resolve()
          }, 1500)
        })
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts)
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