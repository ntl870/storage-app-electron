import 'antd/dist/reset.css'
import './assets/index.css'
import { Routes, Route } from 'react-router-dom'
import { AlertProvider } from './context/AlertContext'
import { PrivateRoute } from './routes/PrivateRoute'

function App(): JSX.Element {
  return (
    <AlertProvider>
      <Routes>
        <Route path="/*" element={<PrivateRoute />} />
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
