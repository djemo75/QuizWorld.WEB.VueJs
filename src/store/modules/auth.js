import { DIFFICULTIES } from "../../constans/difficulties"
import userService from "../../services/user"

const state = () => ({
  user: null,
  userLoading: false
})

// getters
const getters = {
  difficulty: (state) => {
    const currentDifficulty = [...DIFFICULTIES]
      .reverse()
      .find((d) => d.minLevel <= state.user.level)

    return { ...currentDifficulty, level: state.user.level }
  }
}

// actions
const actions = {
  async getAuthData({ commit }) {
    commit("setUserLoading", true)
    const data = await userService.getMe()
    commit("setUserData", data)
    commit("setUserLoading", false)
  }
}

// mutations
const mutations = {
  setUserLoading(state, payload) {
    state.userLoading = payload
  },
  setUserData(state, payload) {
    state.user = payload
  },
  logout(state) {
    localStorage.removeItem("loggedUser")
    state.user = null
  },
  increaseAvailableHints(state) {
    state.user.availableHints = state.user.availableHints + 1
    state.user.hintGenerationDate = new Date()
  },
  useHint(state) {
    state.user.availableHints = state.user.availableHints - 1
    state.user.usedHints = state.user.usedHints + 1
  }
}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
}
