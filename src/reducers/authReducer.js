import { types } from '../types/types'

const initialState = {
  isLogin: false,
  checking: true,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.authNotifyStartLogin:
      return {
        ...state,
        isLogin: true,
      }
    case types.authNotifyStopLogin:
      return {
        ...state,
        isLogin: false,
      }
    case types.authLogin:
      return {
        ...state,
        ...payload,
      }
    case types.authCheckingStart:
      return {
        ...state,
        checking: true,
      }
    case types.authCheckingFinish:
      return {
        ...state,
        checking: false,
      }
    case types.authLogout:
      return {
        isLogin: false,
        checking: false,
      }
    default:
      return state
  }
}
