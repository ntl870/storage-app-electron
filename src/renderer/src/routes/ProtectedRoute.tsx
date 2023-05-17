import { Navigate } from 'react-router-dom'

interface Props {
  isProtected?: boolean
  children: React.ReactElement
}

export const ProtectedRoute = ({ children, isProtected }: Props) => {
  const isAuth = !!localStorage.getItem('token')
  const isTemp = localStorage.getItem('isTemp') === 'true'

  if (isProtected && !isAuth) {
    return <Navigate to="/intro" replace />
  }

  if (!isProtected && isAuth && !isTemp) {
    return <Navigate to="/" replace />
  }

  return children
}
