import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loading from 'react-fullscreen-loading'
import { LoginScreen } from '../components/auth/LoginScreen'
import { DashboardRoutes } from './DashboardRoutes'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { startChecking } from '../actions/auth'

export const AppRouter = () => {
  const { checking, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(startChecking())
  }, [dispatch])

  if (checking) {
    return <Loading loading loaderColor="#003A8C" />
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            exact
            path="/login"
            component={LoginScreen}
            isAuthenticated={!!user}
          />
          <PrivateRoute
            path="/"
            component={DashboardRoutes}
            isAuthenticated={!!user}
          />
        </Switch>
      </div>
    </Router>
  )
}
