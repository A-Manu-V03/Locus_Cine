
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Seats from './pages/Seats'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/comprar/:movieId/:time"
        element={
          <ProtectedRoute>
            <Seats />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
