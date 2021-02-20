import { types } from '../types/types'

export const OpenSnackBar = (severity, message) => ({
  type: types.uiOpenSnackBar,
  payload: {
    severity,
    message,
  },
})

export const CloseSnackBar = () => ({
  type: types.uiCloseSnackBar,
})
