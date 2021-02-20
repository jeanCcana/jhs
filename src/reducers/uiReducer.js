import { types } from '../types/types'

const initialState = {
  open: false,
  severity: '',
  message: '',
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.uiOpenSnackBar:
      return { ...state, ...payload, open: true }
    case types.uiCloseSnackBar:
      return { ...state, open: false }
    default:
      return state
  }
}
