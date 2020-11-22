import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import './plugins/element.js'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
