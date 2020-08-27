import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

import router from "./router/routes"
//请求发送
import axios from 'axios'

Vue.prototype.$axios = axios;

//状态管理
import store from "./vuex/store"
// 注册常量
import constantMap from "./util/constant";

Vue.use(constantMap);

console.log(constantMap)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
