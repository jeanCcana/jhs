import React, { useState } from 'react'
import { Menu } from 'antd'
import PropTypes from 'prop-types'
import { Link, Redirect, Route, Switch } from 'react-router-dom'
import { ProductsRelation } from './ProductsRelation'
import { Products } from './Products'

const { Item } = Menu

export const ProductsSample = ({ match: { url, path } }) => {
  const [currentKey, setCurrentKey] = useState('datos')

  const handleClick = (e) => {
    setCurrentKey(e.key)
  }

  return (
    <>
      <Menu onClick={handleClick} selectedKeys={[currentKey]} mode="horizontal">
        <Item key="datos">
          <Link to={`${url}/datos`}>Datos</Link>
        </Item>
        <Item key="relacion">
          <Link to={`${url}/relacion`}>Relacion</Link>
        </Item>
      </Menu>
      <Switch>
        <Route path={`${path}/datos`} render={() => <Products />} />
        <Route path={`${path}/relacion`} render={() => <ProductsRelation />} />
        <Redirect to={`${path}/datos`} />
      </Switch>
    </>
  )
}

ProductsSample.propTypes = {
  match: PropTypes.any.isRequired,
  url: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
}
