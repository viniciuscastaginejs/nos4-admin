import Sidebar from '../components/Sidebar'

export default function Dashboard() {
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
        @media (max-width: 768px) {
          .main-content {
            margin-left: 0;
            padding: 5rem 1.25rem 2rem;
          }
        }
      `}</style>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#080808' }}>
        <Sidebar />
        <main className="main-content">
          <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Bem-vindo ao painel 👋
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
            NOS4 Produções de Eventos — Painel Admin
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(245,168,0,0.2)', borderTop: '2px solid #F5A800' }}>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#F5A800', textTransform: 'uppercase' }}>Total de eventos</p>
              <p style={{ fontSize: '2.5rem', fontWeight: 'bold', marginTop: '0.5rem' }}>0</p>
            </div>
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(245,168,0,0.2)', borderTop: '2px solid #F5A800' }}>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#F5A800', textTransform: 'uppercase' }}>Eventos ativos</p>
              <p style={{ fontSize: '2.5rem', fontWeight: 'bold', marginTop: '0.5rem' }}>0</p>
            </div>
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(245,168,0,0.2)', borderTop: '2px solid #F5A800' }}>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#F5A800', textTransform: 'uppercase' }}>Próximo evento</p>
              <p style={{ fontSize: '1rem', fontWeight: 'bold', marginTop: '0.5rem', color: 'rgba(255,255,255,0.5)' }}>Nenhum cadastrado</p>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}