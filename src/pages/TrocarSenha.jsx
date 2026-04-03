import { useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

export default function TrocarSenha() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (form.password !== form.confirm) {
      setError('As senhas não coincidem.')
      return
    }
    if (form.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      return
    }
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.updateUser({ password: form.password })
    if (error) {
      setError('Erro ao trocar senha. Tente novamente.')
    } else {
      setSuccess(true)
    }
    setLoading(false)
  }

  const inp = {
    width: '100%', padding: '0.85rem 1rem',
    background: '#111', border: '1px solid #333',
    color: '#fff', fontSize: '0.9rem',
    fontFamily: 'sans-serif', outline: 'none'
  }

  const lbl = {
    display: 'block', fontSize: '0.7rem',
    letterSpacing: '0.2em', textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem'
  }

  return (
    <>
      <style>{`
        .main-content { margin-left: 240px; flex: 1; padding: 2.5rem; color: #fff; font-family: sans-serif; }
        @media (max-width: 768px) { .main-content { margin-left: 0; padding: 5rem 1.25rem 2rem; } }
      `}</style>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#080808' }}>
        <Sidebar />
        <main className="main-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <button onClick={() => navigate('/dashboard')} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '0.85rem' }}>
              ← Voltar
            </button>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Trocar Senha</h1>
          </div>

          {success ? (
            <div style={{ padding: '2rem', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e', maxWidth: '400px' }}>
              <p style={{ fontWeight: 'bold' }}>Senha alterada com sucesso!</p>
              <button onClick={() => navigate('/dashboard')} style={{ marginTop: '1rem', padding: '0.5rem 1.5rem', background: '#F5A800', border: 'none', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}>
                VOLTAR
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={lbl}>Nova senha</label>
                <input style={inp} type="password" placeholder="Mínimo 6 caracteres" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
              </div>
              <div>
                <label style={lbl}>Confirmar senha</label>
                <input style={inp} type="password" placeholder="Repita a senha" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} required />
              </div>
              {error && <p style={{ color: '#ff5555', fontSize: '0.85rem' }}>{error}</p>}
              <button type="submit" disabled={loading} style={{ padding: '1rem', background: '#F5A800', border: 'none', color: '#000', fontWeight: 'bold', fontSize: '0.95rem', cursor: 'pointer', letterSpacing: '0.1em' }}>
                {loading ? 'SALVANDO...' : 'SALVAR NOVA SENHA'}
              </button>
            </form>
          )}
        </main>
      </div>
    </>
  )
}
