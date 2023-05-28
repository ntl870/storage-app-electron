import { SettingOutlined, SyncOutlined } from '@ant-design/icons'
import { SettingsPage } from '@renderer/pages/SettingsPage/SettingsPage'
import { SyncPage } from '@renderer/pages/SyncPage/SyncPage'

export interface Route {
  path: string
  label?: string
  element: React.ReactNode
  icon?: React.ReactNode
  hidden?: boolean
  key: string
}

const routes: Route[] = [
  {
    path: '/',
    key: '/',
    label: 'Sync',
    icon: <SyncOutlined />,
    element: <SyncPage />
  },
  {
    path: '/settings',
    key: '/settings',
    label: 'Settings',
    icon: <SettingOutlined />,
    element: <SettingsPage />
  }
]

export default routes
