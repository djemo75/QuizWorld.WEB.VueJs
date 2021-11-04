import "es6-promise/auto"
import Vue from "vue"
import App from "./App.vue"
import { BootstrapVue, IconsPlugin } from "bootstrap-vue"
import router from "./router"
import VueToastify from "vue-toastify"
import store from "./store"

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import { axiosInstance } from "./utils/axios"

Vue.config.productionTip = false
Vue.prototype.$axios = axiosInstance

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueToastify)

new Vue({
  render: (h) => h(App),
  store,
  router
}).$mount("#app")
