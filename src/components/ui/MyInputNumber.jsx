import React from 'react'
import { InputNumber } from 'antd'
import styled from 'styled-components'

export const StyledInputNumber = styled(InputNumber)`
  width: 100%;

  .ant-input-number-handler-wrap {
    visibility: hidden;
  }
`
export const MyInputNumber = ({ ...props }) => <StyledInputNumber {...props} />
