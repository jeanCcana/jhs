import React from 'react'
import UserOutlined from '@ant-design/icons/UserOutlined'
import LockOutlined from '@ant-design/icons/LockOutlined'
import Form from 'antd/es/form'
import Button from 'antd/es/button'
import Input from 'antd/es/input'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { startLogin } from '../../actions/auth'
import { MyFooter } from '../ui/MyFooter'

const StyledButton = styled(Button)`
  background: #2e318a;
  border-color: #2e318a;

  &:hover {
    background: #505291;
    border-color: #44478b;
  }

  &:focus {
    background: #505291;
    border-color: #505291;
  }
`

export const LoginScreen = () => {
  const dispatch = useDispatch()
  const { isLogin } = useSelector((state) => state.auth)
  const handleLogin = (values) => {
    const { username, password } = values
    dispatch(startLogin(username, password))
  }

  return (
    <div className="bg-white h-screen w-full flex">
      <div className="w-full md:w-1/2 flex flex-col ">
        <div className="flex justify-center pt-12">
          <img className="h-24" src="/assets/logo.png" alt="logo" />
        </div>

        <div className="flex-1 flex flex-col justify-center px-8 md:px-24 lg:px-32">
          <Form
            name="login"
            autoComplete="off"
            className="login-form"
            onFinish={handleLogin}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Ingrese el usuario' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                size="large"
                className="py-2 px-3"
                placeholder="Usuario"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Ingrese la contraseña' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                size="large"
                type="password"
                placeholder="Contraseña"
              />
            </Form.Item>
            <Form.Item>
              <StyledButton
                type="primary"
                htmlType="submit"
                size="large"
                loading={isLogin}
                block
                className="login-form-button mt-8"
              >
                Iniciar sesión
              </StyledButton>
            </Form.Item>
          </Form>
        </div>
        <MyFooter className="bg-white pt-12 pb-12" />
      </div>
      <div className="bg-gradient-to-r from-blue-800 to-blue-300 w-1/2 hidden md:block">
        <img
          alt="bgimage"
          className="object-cover w-full h-screen opacity-50"
          src="/assets/loginbg.jpg"
        />
      </div>
    </div>
  )
}
