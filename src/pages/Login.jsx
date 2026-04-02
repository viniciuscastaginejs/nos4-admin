import { useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('E-mail ou senha incorretos.')
      setLoading(false)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        html, body, #root {
          height: 100%;
          width: 100%;
        }

        .login-root {
          min-height: 100vh;
          width: 100%;
          background: #080808;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
          padding: 1.5rem;
        }

        .login-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 100% 60% at 50% 100%, rgba(245,168,0,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 10% 10%, rgba(245,168,0,0.07) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 90% 90%, rgba(245,168,0,0.07) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        .grid-overlay {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(245,168,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,168,0,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }

        .glow-bottom {
          position: fixed;
          bottom: -150px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 400px;
          background: radial-gradient(ellipse, rgba(245,168,0,0.12) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .login-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 420px;
          padding: 3rem 2.5rem;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(245,168,0,0.25);
          backdrop-filter: blur(24px);
          animation: fadeUp 0.7s ease forwards;
        }

        .login-card::before {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #F5A800, transparent);
        }

        .login-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(245,168,0,0.3), transparent);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .logo-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .logo-wrap img {
          width: 190px;
          filter: drop-shadow(0 0 24px rgba(245,168,0,0.5));
        }

        .login-label {
          font-size: 0.58rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: #F5A800;
          text-align: center;
          margin-bottom: 2rem;
          opacity: 0.75;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .input-field {
          width: 100%;
          padding: 0.9rem 1rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          -webkit-appearance: none;
        }

        .input-field::placeholder { color: rgba(255,255,255,0.25); }

        .input-field:focus {
          border-color: rgba(245,168,0,0.6);
          background: rgba(245,168,0,0.05);
        }

        .error-msg {
          color: #ff5555;
          font-size: 0.8rem;
          text-align: center;
          margin-bottom: 1rem;
        }

        .btn-login {
          width: 100%;
          padding: 1rem;
          background: #F5A800;
          border: none;
          color: #000;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.15rem;
          letter-spacing: 0.25em;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          -webkit-appearance: none;
        }

        .btn-login:hover {
          background: #ffc23d;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(245,168,0,0.3);
        }

        .btn-login:active { transform: translateY(0); }

        .btn-login:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .footer-text {
          text-align: center;
          margin-top: 1.5rem;
          font-size: 0.65rem;
          color: rgba(255,255,255,0.15);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 2.5rem 1.5rem;
          }
          .logo-wrap img {
            width: 160px;
          }
        }
      `}</style>

      <div className="login-root">
        <div className="grid-overlay" />
        <div className="glow-bottom" />

        <div className="login-card">
          <div className="logo-wrap">
            <img src="/logo.png" alt="NOS4" />
          </div>

          <p className="login-label">Acesso restrito — Painel Admin</p>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                className="input-field"
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <input
                className="input-field"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="error-msg">{error}</p>}

            <button className="btn-login" type="submit" disabled={loading}>
              {loading ? 'ENTRANDO...' : 'ENTRAR'}
            </button>
          </form>

          <p className="footer-text">NOS4 Produções de Eventos</p>
        </div>
      </div>
    </>
  )
}