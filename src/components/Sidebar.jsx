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

  const navLink = (to, label, end = false) => (
    <NavLink
      to={to}
      end={end}
      onClick={() => setOpen(false)}
      style={({ isActive }) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '0.75rem 1.5rem',
        color: isActive ? '#F5A800' : 'rgba(255,255,255,0.5)',
        textDecoration: 'none',
        fontSize: '0.9rem',
        letterSpacing: '0.05em',
        borderLeft: isActive ? '2px solid #F5A800' : '2px solid transparent',
        background: isActive ? 'rgba(245,168,0,0.05)' : 'transparent',
        transition: 'all 0.2s'
      })}
    >
      {label}
    </NavLink>
  )

  return (
    <>
      <style>{`
        .sidebar {
          width: 240px;
          min-height: 100vh;
          background: #0d0d0d;
          border-right: 1px solid rgba(245,168,0,0.15);
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 100;
          transition: transform 0.3s ease;
        }

        .sidebar-overlay { display: none; }
        .hamburger { display: none; }

        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(-100%);
          }
          .sidebar.open {
            transform: translateX(0);
          }
          .sidebar-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.7);
            z-index: 99;
          }
          .hamburger {
            display: flex;
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 101;
            background: #0d0d0d;
            border: 1px solid rgba(245,168,0,0.3);
            color: #F5A800;
            width: 42px;
            height: 42px;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 1.2rem;
            transform: none;
          }
        }
      `}</style>

      <button className="hamburger" onClick={() => setOpen(!open)}>
        {open ? '✕' : '☰'}
      </button>

      {open && <div className="sidebar-overlay" onClick={() => setOpen(false)} />}

      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(245,168,0,0.15)' }}>
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="NOS4" style={{ width: '120px' }} />
        </div>

        <nav style={{ flex: 1, padding: '1.5rem 0' }}>
          {navLink('/dashboard', 'Dashboard', true)}
          {navLink('/dashboard/eventos', 'Eventos')}
        </nav>

        <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(245,168,0,0.15)' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%', padding: '0.6rem',
              background: 'transparent',
              border: '1px solid rgba(245,168,0,0.3)',
              color: '#F5A800', cursor: 'pointer',
              fontSize: '0.8rem', letterSpacing: '0.15em'
            }}
          >
            SAIR
          </button>
        </div>
      </aside>
    </>
  )
}
