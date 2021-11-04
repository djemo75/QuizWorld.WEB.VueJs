import Vue from "vue"
import Vuex from "vuex"
import auth from "./modules/auth"
import quiz from "./modules/quiz"
import users from "./modules/users"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    quiz,
    users
  },
  strict: false,
  plugins: []
})

export default store
