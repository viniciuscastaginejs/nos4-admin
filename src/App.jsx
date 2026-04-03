import { HashRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Eventos from './pages/Eventos'
import NovoEvento from './pages/NovoEvento'
import EditarEvento from './pages/EditarEvento'
import TrocarSenha from './pages/TrocarSenha'
import Usuarios from './pages/Usuarios'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/dashboard/eventos" element={<PrivateRoute><Eventos /></PrivateRoute>} />
        <Route path="/dashboard/eventos/novo" element={<PrivateRoute><NovoEvento /></PrivateRoute>} />
        <Route path="/dashboard/eventos/editar/:id" element={<PrivateRoute><EditarEvento /></PrivateRoute>} />
        <Route path="/dashboard/trocar-senha" element={<PrivateRoute><TrocarSenha /></PrivateRoute>} />
        <Route path="/dashboard/usuarios" element={<PrivateRoute><Usuarios /></PrivateRoute>} />
      </Routes>
    </HashRouter>
  )
}

export default App
