import Vue from 'vue'

import PostList from '@/components/Posts/PostList'
import AppButton from '@/components/UI/AppButton'
import AppControlInput from '@/components/UI/AppControlInput'

Vue.component('AppButton', AppButton) //global component that can be used in any page without importing
Vue.component('AppControlInput', AppControlInput)
Vue.component('PostList', PostList)