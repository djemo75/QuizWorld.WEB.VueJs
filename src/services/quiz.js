import { axiosInstance as axios } from "../utils/axios"

const QUIZ_API_URL = process.env.VUE_APP_QUIZ_API_URL
const API_URL = process.env.VUE_APP_API_URL

export const generateQuiz = async (params) => {
  const res = await axios.get(`${QUIZ_API_URL}/questions`, { params })
  return res.data
}

export const submitQuiz = async (data) => {
  const res = await axios.post(`${API_URL}/quizzes`, data)
  return res.data
}

export const getQuizResults = async (params) => {
  return axios.get(`${API_URL}/quizzes`, { params })
}

export const getQuizResult = async (resultId) => {
  const res = await axios.get(`${API_URL}/quizzes/${resultId}`)
  return res.data
}

export default {
  generateQuiz,
  submitQuiz,
  getQuizResults,
  getQuizResult
}
