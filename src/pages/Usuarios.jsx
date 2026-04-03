import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import Sidebar from '../components/Sidebar'

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [novoEmail, setNovoEmail] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [salvando, setSalvando] = useState(false)
  const [modal, setModal] = useState(null)

  useEffect(() => {
    fetchUsuarios()
  }, [])

  async function fetchUsuarios() {
    const { data } = await supabase.from('profiles').select('*')
    setUsuarios(data || [])
    setLoading(false)
  }

  async function handleAddUsuario(e) {
    e.preventDefault()
    setSalvando(true)
    setErro('')
    setSucesso('')

    const { error } = await supabase.auth.admin.createUser({
      email: novoEmail,
      password: novaSenha,
      email_confirm: true
    })

    if (error) {
      setErro('Erro ao adicionar usuário. Verifique os dados.')
    } else {
      setSucesso('Usuário adicionado com sucesso!')
      setNovoEmail('')
      setNovaSenha('')
      fetchUsuarios()
    }
    setSalvando(false)
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
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        @media (max-width: 768px) {
          .main-content { margin-left: 0; padding: 5rem 1.25rem 2rem; }
          .grid-2 { grid-template-columns: 1fr; }
        }
      `}</style>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#080808' }}>
        <Sidebar />
        <main className="main-content">
          <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Usuários</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', marginBottom: '2rem' }}>Gerencie os sócios com acesso ao painel</p>

          {/* Lista de usuários */}
          <div style={{ marginBottom: '3rem' }}>
            {loading ? (
              <p style={{ color: 'rgba(255,255,255,0.4)' }}>Carregando...</p>
            ) : usuarios.length === 0 ? (
              <p style={{ color: 'rgba(255,255,255,0.3)' }}>Nenhum usuário encontrado.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {usuarios.map(u => (
                  <div key={u.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(245,168,0,0.15)', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <p style={{ fontWeight: 'bold' }}>{u.name || 'Sem nome'}</p>
                      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>{u.email}</p>
                    </div>
                    <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: '#F5A800', textTransform: 'uppercase' }}>{u.role}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Adicionar usuário */}
          <div style={{ borderTop: '1px solid rgba(245,168,0,0.15)', paddingTop: '2rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Adicionar usuário</h2>
            <form onSubmit={handleAddUsuario} style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="grid-2">
                <div>
                  <label style={lbl}>E-mail</label>
                  <input style={inp} type="email" placeholder="email@exemplo.com" value={novoEmail} onChange={e => setNovoEmail(e.target.value)} required />
                </div>
                <div>
                  <label style={lbl}>Senha inicial</label>
                  <input style={inp} type="text" placeholder="Mínimo 6 caracteres" value={novaSenha} onChange={e => setNovaSenha(e.target.value)} required />
                </div>
              </div>
              {erro && <p style={{ color: '#ff5555', fontSize: '0.85rem' }}>{erro}</p>}
              {sucesso && <p style={{ color: '#22c55e', fontSize: '0.85rem' }}>{sucesso}</p>}
              <button type="submit" disabled={salvando} style={{ padding: '0.85rem', background: '#F5A800', border: 'none', color: '#000', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', letterSpacing: '0.1em', maxWidth: '200px' }}>
                {salvando ? 'ADICIONANDO...' : 'ADICIONAR'}
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  )
}
