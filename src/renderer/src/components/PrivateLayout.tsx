import { makeVar } from '@apollo/client'
import useRouter from '@renderer/hooks/useRouter'
import routes, { Route } from '@renderer/routes/routes'
import { Layout, Menu, Typography } from 'antd'
import Sider from 'antd/es/layout/Sider'
import React, { useState } from 'react'
import logo from '../assets/logo.png'

interface ProtectedLayoutProps {
  children: React.ReactNode
  routes?: Route[]
}

export const currentStep = makeVar(0)

export const PrivateLayout = ({ children }: ProtectedLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const { navigate, pathname } = useRouter()

  const onSelectItem = (key: string) => {
    navigate(key, {
      replace: true
    })
  }
  return (
    <Layout className="min-h-screen">
      <Sider
        breakpoint="lg"
        collapsible
        theme="light"
        collapsedWidth="0"
        trigger={null}
        collapsed={collapsed}
        // onBreakpoint={(broken) => {
        //   setCollapsed(broken)
        // }}
      >
        <div className="flex items-center p-4">
          <img id="logo" src={logo} className="w-10 h-10 mr-1" />
          <Typography.Title level={4} className="mb-0">
            CloudStorage
          </Typography.Title>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[pathname]}
          items={routes}
          onSelect={({ key }) => onSelectItem(key)}
        />
      </Sider>
      <Layout className="ml-300px min-h-screen overflow-y-hidden">
        {/* <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} /> */}
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </Layout>
  )
}
