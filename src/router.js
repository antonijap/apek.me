import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './views/NotFound.vue'
import BlogPost from './views/BlogPost.vue'
import Home from './views/Home.vue'
import Project from './views/Project.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: "home",
      component: Home
    },
    {
      path: '/blog/:uid',
      name: 'blog-post',
      component: BlogPost
    },
    {
      path: '/project/:uid',
      name: 'project',
      component: Project
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: NotFound
    },
    {
      path: '*',
      redirect: {
        name: 'not-found'
      }
    }
  ]
})
