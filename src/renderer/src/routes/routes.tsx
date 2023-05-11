import Login from '@renderer/pages/Login/Login'
import MainPage from '@renderer/pages/Main/MainPage'
import SetupMachinePage from '@renderer/pages/SetupMachine/SetupMachinePage'

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
    label: 'My Storage',
    element: <MainPage />
  },
  {
    path: '/login',
    key: '/login',
    label: 'Login',
    element: <Login />
  },
  {
    path: '/setup-machine',
    key: '/setup-machine',
    element: <SetupMachinePage />
  }
]

export default routes
