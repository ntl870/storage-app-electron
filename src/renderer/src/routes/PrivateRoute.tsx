import { ProtectedLayout } from '@renderer/components/ProtectedLayout'
import { Routes, Route, Navigate } from 'react-router-dom'
import routes from './routes'

export const PrivateRoute = () => {
  return (
    <ProtectedLayout routes={routes.filter((item) => !item.hidden)}>
      <Routes>
        {routes.map((route) => {
          return <Route key={route.path} path={route.path} element={route.element} />
        })}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ProtectedLayout>
  )
}
