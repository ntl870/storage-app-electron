import 'antd/dist/reset.css'
import './assets/index.css'
import { Routes, Route } from 'react-router-dom'
import { AlertProvider } from './context/AlertContext'
import { PrivateRoute } from './routes/PrivateRoute'
import { ProtectedRoute } from './routes/ProtectedRoute'
import Login from './pages/Login/Login'

function App(): JSX.Element {
  return (
    <AlertProvider>
      <Routes>
        <Route
          path="/*"
          element={
            <ProtectedRoute isProtected>
              <PrivateRoute />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/signup"
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </AlertProvider>
  )
}

export default App
