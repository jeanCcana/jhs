import React from 'react'
import Text from 'antd/es/typography/Text'
import { Footer } from 'antd/lib/layout/layout'
import PropTypes from 'prop-types'

export const MyFooter = ({ className }) => (
  <Footer className={`${className} text-center`}>
    <Text type="secondary">
      © {new Date().getFullYear()} JHS. Derechos reservados.
    </Text>
  </Footer>
)

MyFooter.propTypes = {
  className: PropTypes.string,
}
