import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Drawer, Layout } from 'antd'
import PropTypes from 'prop-types'
import { DashboardMenu } from './DashboardMenu'
import { useBreakpoint } from '../../hooks/useBreakpoint'

const FixedSider = styled(Layout.Sider)`
  overflow: auto;
  height: 100vh;
  position: sticky;
  top: 0;
  left: 0;
`
const MyDrawer = styled(Drawer)`
  .ant-drawer-body {
    background: #001528;
    color: white;
    padding: 0px;
  }
`
const Logo = styled.div`
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
`
export const DashboardSider = ({ items, collapsed, setCollapsed }) => {
  const brkPnt = useBreakpoint()

  useEffect(() => {
    if (brkPnt.lg) {
      if (collapsed) {
        setCollapsed(false)
      }
    } else if (!collapsed) {
      setCollapsed(true)
    }
  }, [brkPnt])

  const Menu = () => (
    <DashboardMenu
      items={items}
      collapse={() => {
        setCollapsed(true)
      }}
    />
  )

  return (
    <>
      <FixedSider trigger={null} collapsed={collapsed} hidden={!brkPnt.lg}>
        <Logo />
        <Menu />
      </FixedSider>
      <MyDrawer
        key="drawerleft"
        placement="left"
        closable={false}
        onClose={() => setCollapsed(true)}
        visible={!brkPnt.lg && !collapsed}
      >
        <Logo />
        <Menu />
      </MyDrawer>
    </>
  )
}

DashboardSider.propTypes = {
  items: PropTypes.array.isRequired,
  collapsed: PropTypes.bool.isRequired,
  setCollapsed: PropTypes.func.isRequired,
}
