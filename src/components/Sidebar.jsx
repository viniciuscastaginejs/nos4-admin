import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

export default function Sidebar() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <>
      <style>{`
        /* DESKTOP SIDEBAR */
        .sidebar {
          width: 240px;
          height: 100vh;
          background: #0d0d0d;
          border-right: 1px solid rgba(245,168,0,0.15);
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 100;
        }

        .sidebar-nav a {
          display: flex;
          align-items: center;
          padding: 0.85rem 1.5rem;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          font-size: 0.9rem;
          border-left: 2px solid transparent;
          transition: all 0.2s;
          font-family: sans-serif;
        }

        .sidebar-nav a.active {
          color: #F5A800;
          border-left: 2px solid #F5A800;
          background: rgba(245,168,0,0.05);
        }

        /* MOBILE TOPBAR */
        .topbar {
          display: none;
        }

        .topbar-menu {
          display: none;
        }

        @media (max-width: 768px) {
          .sidebar {
            display: none;
          }

          .topbar {
            display: flex;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 100;
            background: #0d0d0d;
            border-bottom: 1px solid rgba(245,168,0,0.15);
            align-items: center;
            justify-content: space-between;
            padding: 0.75rem 1rem;
            height: 56px;
          }

          .topbar img {
            height: 32px;
          }

          .topbar-btn {
            background: transparent;
            border: 1px solid rgba(245,168,0,0.3);
            color: #F5A800;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 1.2rem;
            border-radius: 4px;
          }

          .topbar-menu {
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 56px;
            left: 0;
            right: 0;
            background: #0d0d0d;
            border-bottom: 1px solid rgba(245,168,0,0.15);
            z-index: 99;
            padding: 0.5rem 0;
          }

          .topbar-menu a {
            display: block;
            padding: 0.85rem 1.5rem;
            color: rgba(255,255,255,0.5);
            text-decoration: none;
            font-size: 0.95rem;
            font-family: sans-serif;
            border-left: 3px solid transparent;
          }

          .topbar-menu a.active {
            color: #F5A800;
            border-left: 3px solid #F5A800;
            background: rgba(245,168,0,0.05);
          }

          .topbar-menu .sair-btn {
            margin: 0.5rem 1.5rem;
            padding: 0.6rem;
            background: transparent;
            border: 1px solid rgba(245,168,0,0.3);
            color: #F5A800;
            cursor: pointer;
            font-size: 0.8rem;
            letter-spacing: 0.15em;
            width: calc(100% - 3rem);
          }
        }
      `}</style>

      {/* DESKTOP SIDEBAR */}
      <aside className="sidebar">
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(245,168,0,0.15)' }}>
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="NOS4" style={{ width: '120px' }} />
        </div>
        <nav className="sidebar-nav" style={{ flex: 1, padding: '1rem 0' }}>
          <NavLink to="/dashboard" end className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
          <NavLink to="/dashboard/eventos" className={({ isActive }) => isActive ? 'active' : ''}>Eventos</NavLink>
          <NavLink to="/dashboard/usuarios" className={({ isActive }) => isActive ? 'active' : ''}>Usuários</NavLink>
          <NavLink to="/dashboard/trocar-senha" className={({ isActive }) => isActive ? 'active' : ''}>Trocar Senha</NavLink>
        </nav>
        <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(245,168,0,0.15)' }}>
          <button onClick={handleLogout} style={{ width: '100%', padding: '0.6rem', background: 'transparent', border: '1px solid rgba(245,168,0,0.3)', color: '#F5A800', cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '0.15em' }}>
            SAIR
          </button>
        </div>
      </aside>

      {/* MOBILE TOPBAR */}
      <div className="topbar">
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="NOS4" />
        <button className="topbar-btn" onClick={() => setOpen(!open)}>
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <div className="topbar-menu">
          <NavLink to="/dashboard" end className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setOpen(false)}>Dashboard</NavLink>
          <NavLink to="/dashboard/eventos" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setOpen(false)}>Eventos</NavLink>
          <NavLink to="/dashboard/usuarios" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setOpen(false)}>Usuários</NavLink>
          <NavLink to="/dashboard/trocar-senha" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setOpen(false)}>Trocar Senha</NavLink>
          <button className="sair-btn" onClick={handleLogout}>SAIR</button>
        </div>
      )}
    </>
  )
}
