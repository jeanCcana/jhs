import React from 'react'
import { Layout } from 'antd'
import { Switch, Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

export const DashboardContent = React.memo(({ items }) => {
  const renderRoute = (route) =>
    route.submenu ? (
      route.submenu.map(renderRoute)
    ) : (
      <Route exact={route.exact} path={route.path} render={route.render} />
    )

  return (
    <>
      <Layout.Content
        className="bg-white mt-6 mx-4"
        style={{ overflow: 'initial' }}
      >
        <Switch>
          {items.map(renderRoute)}
          <Redirect to="/productos" />
        </Switch>
      </Layout.Content>
    </>
  )
})

DashboardContent.propTypes = {
  items: PropTypes.array.isRequired,
}
