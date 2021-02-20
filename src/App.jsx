import 'antd/dist/antd.css'
import './assets/output.css'
import './App.css'
import React from 'react'
import esES from 'antd/lib/locale/es_ES'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import { AppRouter } from './routers/AppRouter'
import { store } from './store/store'

export const App = () => (
  <Provider store={store}>
    <ConfigProvider locale={esES}>
      <AppRouter />
    </ConfigProvider>
  </Provider>
)
