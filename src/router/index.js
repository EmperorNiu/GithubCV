import Vue from 'vue'
import VueRouter from 'vue-router'
// import { component } from 'vue/types/umd'
import Home from '../views/Home.vue'
import Resume from '../views/Resume.vue'
import Resume2 from '../views/Resume2.vue'
import Profile from '../components/resume/Profile.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/resume',
    name: 'Resume',
    component: Resume
  },
  {
    path: '/resume2',
    name: 'Resume2',
    component: Resume2,
    children: [
      {
        path: '/',
        redirect: '/profile'
      },
      {
        path: '/profile',
        component: Profile
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
