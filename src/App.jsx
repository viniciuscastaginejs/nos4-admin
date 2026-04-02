import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Eventos from './pages/Eventos'
import NovoEvento from './pages/NovoEvento'
import EditarEvento from './pages/EditarEvento'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/dashboard/eventos" element={<PrivateRoute><Eventos /></PrivateRoute>} />
        <Route path="/dashboard/eventos/novo" element={<PrivateRoute><NovoEvento /></PrivateRoute>} />
        <Route path="/dashboard/eventos/editar/:id" element={<PrivateRoute><EditarEvento /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App