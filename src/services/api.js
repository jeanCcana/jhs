import Axios from 'axios'

const baseURL = process.env.REACT_APP_API_URL

export const createAuthAxiosInstance = () =>
  Axios.create({
    baseURL,
    auth: {
      username: 'reactapp',
      password: 'chichogramos',
    },
  })

export const createPublicAxiosInstance = () =>
  Axios.create({
    baseURL,
  })

export const createTokenAxiosInstance = () => {
  const token = localStorage.getItem('token') || ''
  return Axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${token}` },
  })
}
