import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import '@/utils/element-ui'
import { MessageBox, Message } from 'element-ui'
import Throttle from '@/utils/throttle'

import '@/axios'

Vue.prototype.$http = axios
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

Vue.component('Throttle', Throttle)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
