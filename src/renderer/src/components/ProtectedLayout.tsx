import { Route } from '@renderer/routes/routes'
import { Layout, Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import React from 'react'
import useRouter from '@renderer/hooks/useRouter'

interface ProtectedLayoutProps {
  children: React.ReactNode
  routes: Route[]
}

export const ProtectedLayout = ({ children, routes }: ProtectedLayoutProps) => {
  const { navigate, pathname } = useRouter()
  const onSelectItem = (key: string) => {
    navigate(key, {
      replace: true
    })
  }
  return (
    <Layout className="min-h-screen">
      <Sider breakpoint="lg" collapsible theme="light">
        <div className="logo" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[pathname]}
          items={routes}
          onSelect={({ key }) => onSelectItem(key)}
        />
      </Sider>
      <Layout className="ml-300px min-h-screen overflow-y-hidden">
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </Layout>
  )
}
