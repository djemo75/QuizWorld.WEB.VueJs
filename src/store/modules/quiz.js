import quizService from "../../services/quiz"
import { calculateTotalRows, parseLinkHeader } from "../../utils/json-server"

const state = () => ({
  quiz: [],
  quizLoading: false,
  quizError: null,
  results: [],
  totalResults: 0,
  resultsLoading: false,
  resultsError: null,
  result: null,
  resultLoading: false,
  resultError: null,
  currentMonthQuizzes: [],
  currentMonthQuizzesLoading: false,
  currentMonthQuizzesError: null
})

// getters
const getters = {}

// actions
const actions = {
  async getQuiz({ commit }, params) {
    try {
      commit("setQuizError", null)
      commit("setQuizLoading", true)
      const data = await quizService.generateQuiz(params)
      commit("setQuizData", data)
    } catch (error) {
      commit("setQuizError", error?.response?.data?.error)
    } finally {
      commit("setQuizLoading", false)
    }
  },
  async getResults({ commit }, params) {
    try {
      commit("setResultsError", null)
      commit("setResultsLoading", true)
      const { data, headers } = await quizService.getQuizResults(params)
      if (headers.link) {
        const paginationLinks = parseLinkHeader(headers.link)
        commit("setTotalResults", calculateTotalRows(paginationLinks.last))
      }
      commit("setResults", data)
    } catch (error) {
      commit("setResultsError", error?.response?.data?.error)
    } finally {
      commit("setResultsLoading", false)
    }
  },
  async getResult({ commit }, resultId) {
    try {
      commit("setResultError", null)
      commit("setResultLoading", true)
      const data = await quizService.getQuizResult(resultId)
      commit("setResult", data)
    } catch (error) {
      if (error.response.status === 404) {
        commit("setResultError", "Result not found")
      } else {
        commit("setResultError", error?.response?.data?.error)
      }
    } finally {
      commit("setResultLoading", false)
    }
  },
  async getCurrentMonthQuizzes({ commit }, params) {
    try {
      commit("setCurrentMonthQuizzesError", null)
      commit("setCurrentMonthQuizzesLoading", true)
      const { data } = await quizService.getQuizResults(params)
      commit("setCurrentMonthQuizzes", data)
    } catch (error) {
      commit("setCurrentMonthQuizzesError", error?.response?.data?.error)
    } finally {
      commit("setCurrentMonthQuizzesLoading", false)
    }
  }
}

// mutations
const mutations = {
  setQuizLoading(state, payload) {
    state.quizLoading = payload
  },
  setQuizData(state, payload) {
    state.quiz = payload
  },
  setQuizError(state, payload) {
    state.quizError = payload
  },
  setResultsLoading(state, payload) {
    state.resultsLoading = payload
  },
  setResults(state, payload) {
    state.results = payload
  },
  setTotalResults(state, payload) {
    state.totalResults = payload
  },
  setResultsError(state, payload) {
    state.resultsError = payload
  },
  setResultLoading(state, payload) {
    state.resultLoading = payload
  },
  setResult(state, payload) {
    state.result = payload
  },
  setResultError(state, payload) {
    state.resultError = payload
  },
  setCurrentMonthQuizzesLoading(state, payload) {
    state.currentMonthQuizzesLoading = payload
  },
  setCurrentMonthQuizzes(state, payload) {
    const data = [...state.currentMonthQuizzes, ...payload]
    const uniqueArray = data.filter(
      (v, i, a) => a.findIndex((t) => t.id === v.id) === i
    )

    state.currentMonthQuizzes = uniqueArray
  },
  setCurrentMonthQuizzesError(state, payload) {
    state.currentMonthQuizzesError = payload
  }
}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
}
