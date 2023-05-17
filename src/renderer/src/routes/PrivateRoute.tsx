import { Navigate, Route, Routes } from 'react-router-dom'
import routes from './routes'
import { PrivateLayout } from '@renderer/components/PrivateLayout'

export const PrivateRoute = () => {
  return (
    <PrivateLayout routes={routes.filter((item) => !item.hidden)}>
      <Routes>
        {routes.map((route) => {
          return <Route key={route.path} path={route.path} element={route.element} />
        })}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PrivateLayout>
  )
}
