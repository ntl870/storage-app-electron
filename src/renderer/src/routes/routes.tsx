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
    element: <div />
  }
]

export default routes
