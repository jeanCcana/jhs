import React, { useMemo, useState } from 'react'
import { Layout } from 'antd'
import { TeamOutlined, UserOutlined } from '@ant-design/icons'
import { MyFooter } from '../components/ui/MyFooter'
import { DashboardHeader } from '../components/ui/DashboardHeader'
import { DashboardSider } from '../components/ui/DashboardSider'
import { DashboardContent } from '../components/ui/DashboardContent'
import { Categories } from '../components/cruds/Categories'
import { Articles } from '../components/cruds/Articles'
import { Suppliers } from '../components/cruds/Suppliers'
import { Products } from '../components/cruds/Products/Products'
import { SubArticles } from '../components/cruds/SubArticles'

export const DashboardRoutes = () => {
  const [collapsed, setCollapsed] = useState(false)

  const items = useMemo(
    () => [
      {
        title: 'Submenu 1',
        key: 'Submenu1',
        icon: <UserOutlined />,
        submenu: [
          {
            title: 'Productos',
            path: '/productos',
            render: () => <Products />,
            exact: true,
          },
          {
            title: 'Articulos',
            path: '/articulos',
            render: () => <Articles />,
            exact: true,
          },
          {
            title: 'SubArticulos',
            path: '/subarticulos',
            render: () => <SubArticles />,
            exact: true,
          },
        ],
      },
      {
        title: 'Submenu 2',
        key: 'Submenu2',
        icon: <TeamOutlined />,
        submenu: [
          {
            title: 'Proveedores',
            path: '/proveedores',
            render: () => <Suppliers />,
            exact: true,
          },
          {
            title: 'Categorias',
            path: '/categorias',
            render: () => <Categories />,
            exact: true,
          },
        ],
      },
    ],
    [],
  )

  return (
    <>
      <Layout className="min-h-screen">
        <DashboardSider
          items={items}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <Layout>
          <DashboardHeader
            collapsed={collapsed}
            toggle={() => {
              setCollapsed(!collapsed)
            }}
          />
          <DashboardContent items={items} />
          <MyFooter />
        </Layout>
      </Layout>
    </>
  )
}
