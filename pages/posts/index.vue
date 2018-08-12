<template>
  <div class="posts-page">
    <post-list :posts="loadedPosts"/>
  </div>
</template>

<script>
import PostList from '@/components/Posts/PostList'

export default {
  components: {
    PostList
  },
  // promise based approach
  asyncData(context) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
      resolve({
        loadedPosts: [
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
        ]
      }
    )}, 1500)
    // reject(new Error())
    })
    .then(data => {
      return data
    })
    .catch(e => {
      context.error(e)
    })  
  }
}
</script>


<style scoped>
.posts-page {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

