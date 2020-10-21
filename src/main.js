import Vue from 'vue'
import App from './App.vue'
import router from './router'
// Element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// Echarts
import echarts from 'echarts'
import axios from 'axios'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
axios.defaults.baseURL = 'http://localhost:5000'
Vue.prototype.$http = axios
axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.headers.get.Authorization = 'token xxx' // xxx为你的个人GitHub token

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
