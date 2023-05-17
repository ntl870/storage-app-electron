import 'antd/dist/reset.css'
import './assets/index.css'
import { Routes, Route } from 'react-router-dom'
import { AlertProvider } from './context/AlertContext'
import { PrivateRoute } from './routes/PrivateRoute'
import { ProtectedRoute } from './routes/ProtectedRoute'
import MainPage from './pages/Main/MainPage'
import { ProtectedLayout } from './components/ProtectedLayout'
import Login from './pages/Login/Login'
import SetupMachinePage from './pages/SetupMachine/SetupMachinePage'
import { FinishingUpPage } from './pages/FinishingUpPage/FinishingUpPage'
import { makeVar } from '@apollo/client'

export const computerProps = makeVar({
  name: '',
  hostname: '',
  macAddress: ''
})

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
          path="/intro"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <MainPage />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Login />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/setup-machine"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <SetupMachinePage />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/finishing-up"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <FinishingUpPage />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AlertProvider>
  )
}

export default App
