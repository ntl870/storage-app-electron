import { Route } from '@renderer/routes/routes'
import { Layout, Menu, Steps } from 'antd'
import Sider from 'antd/es/layout/Sider'
import React from 'react'
import useRouter from '@renderer/hooks/useRouter'
import { makeVar } from '@apollo/client'

interface ProtectedLayoutProps {
  children: React.ReactNode
  routes: Route[]
}

export const currentStep = makeVar(0)

export const ProtectedLayout = ({ children, routes }: ProtectedLayoutProps) => {
  const { navigate } = useRouter()
  const onSelectItem = (key: string) => {
    navigate(key, {
      replace: true
    })
  }

  return (
    <Layout className="min-h-screen">
      <Sider theme="light" className="w-[500px]">
        <Steps
          className="p-4 h-full"
          direction="vertical"
          current={currentStep()}
          items={[
            {
              title: 'Sign in'
            },
            {
              title: 'Setup your device'
            },
            {
              title: 'Cloud Storage'
            }
          ]}
        />
      </Sider>

      <Layout className="ml-300px min-h-screen overflow-y-hidden">
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </Layout>
  )
}
