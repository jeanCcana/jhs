import { message } from 'antd'
import { createAuthAxiosInstance } from '../services/api'
import { types } from '../types/types'

export const startLogin = (username, password) => (dispatch) => {
  dispatch(notifyStartLogin())
  const authAxios = createAuthAxiosInstance()

  authAxios
    .post('/auth', null, {
      params: {
        username,
        password,
        grant_type: 'password',
      },
    })
    .then(({ data }) => {
      localStorage.setItem('token', data.access_token)
      localStorage.setItem('refreshToken', data.refresh_token)
      dispatch(login(data))
      dispatch(notifyStopLogin())
    })
    .catch(() => {
      dispatch(notifyStopLogin())
      message.error('Credenciales incorrectas')
    })
}

export const startChecking = () => async (dispatch) => {
  const refreshToken = localStorage.getItem('refreshToken') || ''
  const authAxios = createAuthAxiosInstance()

  authAxios
    .post('/auth', null, {
      params: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      },
    })
    .then(({ data }) => {
      localStorage.setItem('token', data.access_token)
      localStorage.setItem('refreshToken', data.refresh_token)
      dispatch(login(data))
      dispatch(checkingFinsh())
    })
    .catch(() => dispatch(checkingFinsh()))
}

export const startLogout = () => (dispatch) => {
  dispatch(checkingStart())
  setTimeout(() => {
    localStorage.clear()
    dispatch(logout())
    dispatch(checkingFinsh())
  }, 1500)
}

const notifyStartLogin = () => ({
  type: types.authNotifyStartLogin,
})

const notifyStopLogin = () => ({
  type: types.authNotifyStopLogin,
})

const login = (user) => ({
  type: types.authLogin,
  payload: {
    user,
  },
})

const checkingStart = () => ({
  type: types.authCheckingStart,
})

const checkingFinsh = () => ({
  type: types.authCheckingFinish,
})

const logout = () => ({
  type: types.authLogout,
})
