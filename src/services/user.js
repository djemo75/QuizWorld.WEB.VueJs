import CryptoJS from "crypto-js"
import { axiosInstance as axios } from "../utils/axios"

const API_URL = process.env.VUE_APP_API_URL

export const getUsers = async (params) => {
  const res = await axios.get(`${API_URL}/users`, { params })
  return res.data
}

export const getUserById = async (userId) => {
  const res = await axios.get(`${API_URL}/users/${userId}`)
  return res.data
}

export const login = async (data) => {
  const users = await getUsers({ username: data.username })

  const loggedUser = users.find((x) => {
    var bytes = CryptoJS.AES.decrypt(x.password, process.env.VUE_APP_SECRET_KEY)
    var decryptedPassword = bytes.toString(CryptoJS.enc.Utf8)

    return x.username === data.username && decryptedPassword === data.password
  })
  if (loggedUser) {
    localStorage.setItem(
      "loggedUser",
      JSON.stringify({ id: loggedUser.id, username: loggedUser.username })
    )
    return loggedUser
  }

  throw new Error("Wrong username or passwrod!")
}

export const register = async (data) => {
  const users = await getUsers({ username: data.username })
  const existUsername = users.find((x) => x.username === data.username)
  if (existUsername) {
    throw new Error("Username is used!")
  } else {
    const res = await axios.post(`${API_URL}/users/`, data)
    return res.data
  }
}

export const getMe = async () => {
  const data = localStorage.getItem("loggedUser")

  if (!data) {
    return null
  }

  const { id } = JSON.parse(data)
  const result = await getUserById(id)

  return result
}

export const editUserById = async (userId, payload) => {
  const res = await axios.put(`${API_URL}/users/${userId}`, payload)
  return res.data
}

export default {
  getUsers,
  getUserById,
  login,
  getMe
}
