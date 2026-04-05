import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

export default function Sidebar() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const isMobile = window.innerWidth <= 768

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/')
  }

  const linkStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '0.85rem 1.5rem',
    color: isActive ? '#F5A800' : 'rgba(255,255,255,0.5)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    borderLeft: isActive ? '2px solid #F5A800' : '2px solid transparent',
    background: isActive ? 'rgba(245,168,0,0.05)' : 'transparent',
    fontFamily: 'sans-serif'
  })

  if (isMobile) {
    return (
      <>
        {/* TOPBAR MOBILE */}
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          height: '56px', background: '#0d0d0d',
          borderBottom: '1px solid rgba(245,168,0,0.15)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1rem', zIndex: 100
        }}>
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="NOS4" style={{ height: '32px' }} />
          <button
            onClick={() => setOpen(!open)}
            style={{
              background: 'transparent',
              border: '1px solid rgba(245,168,0,0.3)',
              color: '#F5A800', width: '40px', height: '40px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: '1.2rem', borderRadius: '4px'
            }}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>

        {/* MENU DROPDOWN */}
        {open && (
          <div style={{
            position: 'fixed', top: '56px', left: 0, right: 0,
            background: '#0d0d0d',
            borderBottom: '1px solid rgba(245,168,0,0.15)',
            zIndex: 99
          }}>
            <NavLink to="/dashboard" end style={({ isActive }) => linkStyle(isActive)} onClick={() => setOpen(false)}>Dashboard</NavLink>
            <NavLink to="/dashboard/eventos" style={({ isActive }) => linkStyle(isActive)} onClick={() => setOpen(false)}>Eventos</NavLink>
            <NavLink to="/dashboard/usuarios" style={({ isActive }) => linkStyle(isActive)} onClick={() => setOpen(false)}>Usuários</NavLink>
            <NavLink to="/dashboard/trocar-senha" style={({ isActive }) => linkStyle(isActive)} onClick={() => setOpen(false)}>Trocar Senha</NavLink>
            <div style={{ padding: '1rem 1.5rem' }}>
              <button onClick={handleLogout} style={{
                width: '100%', padding: '0.6rem',
                background: 'transparent',
                border: '1px solid rgba(245,168,0,0.3)',
                color: '#F5A800', cursor: 'pointer',
                fontSize: '0.8rem', letterSpacing: '0.15em'
              }}>
                SAIR
              </button>
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <aside style={{
      width: '240px', height: '100vh',
      background: '#0d0d0d',
      borderRight: '1px solid rgba(245,168,0,0.15)',
      display: 'flex', flexDirection: 'column',
      position: 'fixed', top: 0, left: 0, zIndex: 100
    }}>
      <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(245,168,0,0.15)' }}>
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="NOS4" style={{ width: '120px' }} />
      </div>
      <nav style={{ flex: 1, padding: '1rem 0' }}>
        <NavLink to="/dashboard" end style={({ isActive }) => linkStyle(isActive)}>Dashboard</NavLink>
        <NavLink to="/dashboard/eventos" style={({ isActive }) => linkStyle(isActive)}>Eventos</NavLink>
        <NavLink to="/dashboard/usuarios" style={({ isActive }) => linkStyle(isActive)}>Usuários</NavLink>
        <NavLink to="/dashboard/trocar-senha" style={({ isActive }) => linkStyle(isActive)}>Trocar Senha</NavLink>
      </nav>
      <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(245,168,0,0.15)' }}>
        <button onClick={handleLogout} style={{
          width: '100%', padding: '0.6rem',
          background: 'transparent',
          border: '1px solid rgba(245,168,0,0.3)',
          color: '#F5A800', cursor: 'pointer',
          fontSize: '0.8rem', letterSpacing: '0.15em'
        }}>
          SAIR
        </button>
      </div>
    </aside>
  )
}
