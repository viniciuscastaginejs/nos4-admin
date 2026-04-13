import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

export default function Eventos() {
  const navigate = useNavigate()
  const [eventos, setEventos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEventos()
  }, [])

  async function fetchEventos() {
    const { data } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true })
    setEventos(data || [])
    setLoading(false)
  }

  async function handleDelete(id) {
    if (!confirm('Tem certeza que deseja remover este evento?')) return
    await supabase.from('events').delete().eq('id', id)
    fetchEventos()
  }

  async function handleDuplicate(ev) {
    const { id, created_at, ...rest } = ev
    const { error } = await supabase.from('events').insert([{
      ...rest,
      title: `${ev.title} (cópia)`
    }])
    if (!error) fetchEventos()
  }

  const statusLabel = {
    em_breve: { label: 'Em breve', color: '#888' },
    vendas_abertas: { label: 'Vendas abertas', color: '#22c55e' },
    lista_vip: { label: 'Lista VIP', color: '#F5A800' },
    esgotado: { label: 'Esgotado', color: '#ef4444' }
  }

  const SITE_URL = 'https://nos4producoes.vercel.app'

  return (
    <>
      <style>{`
        .main-content {
          margin-left: 240px;
          flex: 1;
          padding: 2.5rem;
          color: #fff;
          font-family: sans-serif;
        }
        .evento-item {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1rem 1.5rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(245,168,0,0.15);
        }
        .evento-btns {
          display: flex;
          gap: 0.5rem;
          flex-shrink: 0;
          flex-wrap: wrap;
          justify-content: flex-end;
        }
        .evento-btn {
          padding: 0.5rem 0.85rem;
          background: transparent;
          cursor: pointer;
          font-size: 0.75rem;
          white-space: nowrap;
        }
        @media (max-width: 768px) {
          .main-content {
            margin-left: 0;
            padding: 5rem 1.25rem 2rem;
          }
          .evento-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .evento-btns {
            width: 100%;
            justify-content: flex-start;
          }
        }
      `}</style>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#080808' }}>
        <Sidebar />
        <main className="main-content">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Eventos</h1>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', marginTop: '0.25rem' }}>Gerencie os eventos da NOS4</p>
            </div>
            <button
              onClick={() => navigate('/dashboard/eventos/novo')}
              style={{ padding: '0.75rem 1.5rem', background: '#F5A800', border: 'none', color: '#000', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer', letterSpacing: '0.1em' }}
            >
              + NOVO EVENTO
            </button>
          </div>

          {loading ? (
            <p style={{ color: 'rgba(255,255,255,0.4)' }}>Carregando...</p>
          ) : eventos.length === 0 ? (
            <div style={{ padding: '3rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(245,168,0,0.15)', textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>
              <p>Nenhum evento cadastrado ainda.</p>
              <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Clique em "+ Novo Evento" para começar.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {eventos.map(ev => (
                <div key={ev.id} className="evento-item">
                  {ev.image_url
                    ? <img src={ev.image_url} alt={ev.title} style={{ width: '80px', height: '80px', objectFit: 'cover', flexShrink: 0 }} />
                    : <div style={{ width: '80px', height: '80px', background: '#222', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: '0.7rem' }}>SEM FOTO</div>
                  }
                  <div style={{ flex: 1, minWidth: '150px' }}>
                    <p style={{ fontWeight: 'bold', fontSize: '1rem' }}>{ev.title}</p>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                      {new Date(ev.date + 'T00:00:00').toLocaleDateString('pt-BR')} {ev.time ? `— ${ev.time}` : ''} {ev.location ? `· ${ev.location}` : ''}
                    </p>
                    <span style={{ fontSize: '0.75rem', color: statusLabel[ev.status]?.color || '#888', marginTop: '0.4rem', display: 'inline-block' }}>
                      ● {statusLabel[ev.status]?.label || ev.status}
                    </span>
                  </div>
                  <div className="evento-btns">
                    <button
                      className="evento-btn"
                      onClick={() => navigate(`/dashboard/eventos/editar/${ev.id}`)}
                      style={{ border: '1px solid rgba(245,168,0,0.4)', color: '#F5A800' }}
                    >
                      EDITAR
                    </button>
                    <button
                      className="evento-btn"
                      onClick={() => handleDuplicate(ev)}
                      style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.5)' }}
                    >
                      DUPLICAR
                    </button>
                    <button
                      className="evento-btn"
                      onClick={() => handleDelete(ev.id)}
                      style={{ border: '1px solid rgba(239,68,68,0.4)', color: '#ef4444' }}
                    >
                      REMOVER
                    </button>
                    <button
                      className="evento-btn"
                      onClick={() => window.open(`${SITE_URL}/eventos/${ev.id}`, '_blank')}
                      style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.4)' }}
                    >
                      VER NO SITE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  )
}
