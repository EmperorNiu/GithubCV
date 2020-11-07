import Vue from 'vue'
import VueRouter from 'vue-router'
// import { component } from 'vue/types/umd'
import Home from '../views/Home.vue'
import Resume from '../views/Resume.vue'
import Resume2 from '../views/Resume2.vue'
import Profile from '../components/resume/Profile.vue'
import Languages from '../components/resume/Languages.vue'
import Repository from '../components/resume/Repository.vue'
import Contributions from '../components/resume/Contributions.vue'
import Relationship from '../components/resume/Relationship.vue'
import About from '../components/resume/About.vue'
import ReposDetail from '../components/resume/ReposDetail.vue'
import Fork from '../components/repos/Fork.vue'
import TimeSeries from '../components/repos/TimeSeries.vue'
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
    path: '/fork',
    name: 'Fork',
    component: Fork
  },
  {
    path: '/time',
    name: 'Time',
    component: TimeSeries
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
      },
      {
        path: '/languages',
        component: Languages
      },
      {
        path: '/repository',
        component: Repository
      },
      {
        path: '/contributions',
        component: Contributions
      },
      {
        path: '/relationship',
        component: Relationship
      },
      {
        path: '/about',
        component: About
      }
    ]
  },
  {
    path: '/reposDetail',
    name: 'ReposDetail',
    component: ReposDetail
  }
]

const router = new VueRouter({
  routes
})

export default router
