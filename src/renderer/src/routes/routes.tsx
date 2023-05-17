import { SyncOutlined } from '@ant-design/icons'
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
  }
]

export default routes
