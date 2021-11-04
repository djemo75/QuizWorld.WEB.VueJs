import axios from "axios"

const axiosInstance = axios.create({
  headers: { "X-Api-Key": process.env.VUE_APP_QUIZ_API_KEY } // Required for using quizapi.io
})

export { axiosInstance }
