import userService from "../../services/user"

const state = () => ({
  users: [],
  usersLoading: false,
  usersError: null
})

// getters
const getters = {}

// actions
const actions = {
  async getAllUsers({ commit }, params) {
    try {
      commit("setUsersError", null)
      commit("setUsersLoading", true)
      const data = await userService.getUsers(params)
      commit("setUsers", data)
    } catch (error) {
      commit("setUsersError", error?.response?.data?.error)
    } finally {
      commit("setUsersLoading", false)
    }
  }
}

// mutations
const mutations = {
  setUsers(state, payload) {
    state.users = payload
  },
  setUsersLoading(state, payload) {
    state.usersLoading = payload
  },
  setUsersError(state, payload) {
    state.usersError = payload
  }
}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
}
