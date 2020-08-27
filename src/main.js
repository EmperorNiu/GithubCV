import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'

Vue.use(ElementUI)
Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:8002/api'
Vue.prototype.$http = axios
axios.defaults.headers.post['Content-Type'] = 'application/json'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
