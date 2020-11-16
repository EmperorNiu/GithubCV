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
import BarSum from '../components/repos/Bar_Sum.vue'
import BarOrigin from '../components/repos/Bar_Origin.vue'
import PrIssue from '../components/repos/Pr_Issue.vue'
import Compare from '../components/repos/Compare.vue'
import CompareOther from '../components/repos/Other.vue'
import Ability from '../components/repos/ability.vue'
import LanguageRank from '../components/repos/languageRank.vue'
import Loading from '../views/Loading2.vue'
import Tech from '../components/resume/Tech.vue'
import ContributionDetail from '../components/resume/ContributionDetail.vue'
import LanguagePop from '../views/LanguagePop.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/languagePop',
    name: 'LanguagePop',
    component: LanguagePop
  },
  {
    path: '/loading',
    name: 'Loading',
    component: Loading
  },
  {
    path: '/resume',
    name: 'Resume',
    component: Resume
  },
  {
    path: '/ability',
    name: 'Ability',
    component: Ability
  },
  {
    path: '/Compare',
    name: 'Compare',
    component: Compare
  },
  {
    path: '/Compare_Other',
    name: 'CompareOther',
    component: CompareOther
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
    path: '/languageRank',
    name: 'LanguageRank',
    component: LanguageRank
  },
  {
    path: '/bar_sum',
    name: 'Bar_Sum',
    component: BarSum
  },
  {
    path: '/bar_origin',
    name: 'Bar_Origin',
    component: BarOrigin
  },
  {
    path: '/pr_issue',
    name: 'Pr_Issue',
    component: PrIssue
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
        path: '/tech',
        component: Tech
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
  },
  {
    path: '/contributionDetail',
    name: 'ContributionDetail',
    component: ContributionDetail
  }
]

const router = new VueRouter({
  routes
})

export default router
