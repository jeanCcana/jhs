import React from 'react'
import UserOutlined from '@ant-design/icons/UserOutlined'
import LockOutlined from '@ant-design/icons/LockOutlined'
import Form from 'antd/es/form'
import Button from 'antd/es/button'
import Input from 'antd/es/input'
import { useDispatch, useSelector } from 'react-redux'
import { startLogin } from '../../actions/auth'
import { MyFooter } from '../ui/MyFooter'

export const LoginScreen = () => {
  const dispatch = useDispatch()
  const { isLogin } = useSelector((state) => state.auth)
  const handleLogin = (values) => {
    const { username, password } = values
    dispatch(startLogin(username, password))
  }
  const initialValues = {
    username: 'admin',
    password: '12345',
  }

  return (
    <div className="bg-white h-screen w-full flex flex-wrap">
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="flex justify-center pt-12 md:-mb-24">
          <img className="h-24" src="/assets/logo.png" alt="logo" />
        </div>

        <div className="flex flex-col justify-center my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={initialValues}
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
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={isLogin}
                block
                className="login-form-button mt-8"
              >
                Iniciar sesión
              </Button>
            </Form.Item>
          </Form>
          <MyFooter className="bg-white pt-12 pb-12" />
        </div>
      </div>
      <div className="w-1/2 hidden md:block shadow-2xl ">
        <img
          alt="bgimage"
          className="object-cover w-full h-screen "
          src="/assets/loginbg.jpg"
        />
      </div>
    </div>
  )
}
