import { makeVar } from '@apollo/client'
import { Route } from '@renderer/routes/routes'
import { Layout, Steps } from 'antd'
import Sider from 'antd/es/layout/Sider'
import React from 'react'

interface ProtectedLayoutProps {
  children: React.ReactNode
  rotues?: Route[]
}

export const currentStep = makeVar(0)

export const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
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
              title: 'Finishing up'
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
