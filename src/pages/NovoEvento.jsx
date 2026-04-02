import { useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

export default function NovoEvento() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    ticket_link: '',
    vip_link: '',
    promo_code: 'NOS4',
    status: 'em_breve',
    type: 'festa'
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleImage(e) {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      let image_url = null
      if (imageFile) {
        const ext = imageFile.name.split('.').pop()
        const filename = `${Date.now()}.${ext}`
        const { error: uploadError } = await supabase.storage.from('events').upload(filename, imageFile)
        if (uploadError) throw uploadError
        const { data: urlData } = supabase.storage.from('events').getPublicUrl(filename)
        image_url = urlData.publicUrl
      }
      const { error: insertError } = await supabase.from('events').insert([{ ...form, image_url }])
      if (insertError) throw insertError
      navigate('/dashboard/eventos')
    } catch (err) {
      setError('Erro ao salvar evento. Tente novamente.')
      setLoading(false)
    }
  }

  const inp = {
    width: '100%', padding: '0.85rem 1rem',
    background: '#111', border: '1px solid #333',
    color: '#fff', fontSize: '0.9rem',
    fontFamily: 'sans-serif', outline: 'none',
    appearance: 'none', WebkitAppearance: 'none'
  }

  const lbl = {
    display: 'block', fontSize: '0.7rem',
    letterSpacing: '0.2em', textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem'
  }

  const fld = { display: 'flex', flexDirection: 'column' }
  const selWrap = { position: 'relative' }
  const selArrow = {
    position: 'absolute', right: '1rem', top: '50%',
    transform: 'translateY(-50%)', pointerEvents: 'none',
    color: '#F5A800', fontSize: '0.7rem'
  }

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
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        @media (max-width: 768px) {
          .main-content {
            margin-left: 0;
            padding: 5rem 1.25rem 2rem;
          }
          .grid-2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div style={{ display: 'flex', minHeight: '100vh', background: '#080808' }}>
        <Sidebar />
        <main className="main-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <button onClick={() => navigate('/dashboard/eventos')} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '0.85rem' }}>
              ← Voltar
            </button>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Novo Evento</h1>
          </div>

          <form onSubmit={handleSubmit} style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            <div style={fld}>
              <label style={lbl}>Arte do evento</label>
              <div onClick={() => document.getElementById('imageInput').click()} style={{ width: '100%', height: '200px', border: '1px dashed rgba(245,168,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: '#111', overflow: 'hidden' }}>
                {imagePreview
                  ? <img src={imagePreview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>Clique para fazer upload da arte</p>}
              </div>
              <input id="imageInput" type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
            </div>

            <div style={fld}>
              <label style={lbl}>Nome do evento *</label>
              <input style={inp} name="title" value={form.title} onChange={handleChange} required placeholder="Ex: Festa NOS4 — Abril" />
            </div>

            <div style={fld}>
              <label style={lbl}>Tipo</label>
              <div style={selWrap}>
                <select style={inp} name="type" value={form.type} onChange={handleChange}>
                  <option value="festa">Festa</option>
                  <option value="show">Show</option>
                  <option value="banda">Banda</option>
                  <option value="dj">DJ</option>
                  <option value="grupo">Grupo</option>
                </select>
                <span style={selArrow}>▼</span>
              </div>
            </div>

            <div className="grid-2">
              <div style={fld}>
                <label style={lbl}>Data *</label>
                <input style={{ ...inp, colorScheme: 'dark' }} type="date" name="date" value={form.date} onChange={handleChange} required />
              </div>
              <div style={fld}>
                <label style={lbl}>Horário</label>
                <input style={{ ...inp, colorScheme: 'dark' }} type="time" name="time" value={form.time} onChange={handleChange} />
              </div>
            </div>

            <div style={fld}>
              <label style={lbl}>Local</label>
              <input style={inp} name="location" value={form.location} onChange={handleChange} placeholder="Ex: Club XYZ — Ribeirão Preto" />
            </div>

            <div style={fld}>
              <label style={lbl}>Descrição</label>
              <textarea style={{ ...inp, minHeight: '100px', resize: 'vertical' }} name="description" value={form.description} onChange={handleChange} placeholder="Detalhes do evento..." />
            </div>

            <div className="grid-2">
              <div style={fld}>
                <label style={lbl}>Link de ingresso</label>
                <input style={inp} name="ticket_link" value={form.ticket_link} onChange={handleChange} placeholder="https://..." />
              </div>
              <div style={fld}>
                <label style={lbl}>Link Lista VIP</label>
                <input style={inp} name="vip_link" value={form.vip_link} onChange={handleChange} placeholder="https://forms.google.com/..." />
              </div>
            </div>

            <div className="grid-2">
              <div style={fld}>
                <label style={lbl}>Código promocional</label>
                <input style={inp} name="promo_code" value={form.promo_code} onChange={handleChange} />
              </div>
              <div style={fld}>
                <label style={lbl}>Status</label>
                <div style={selWrap}>
                  <select style={inp} name="status" value={form.status} onChange={handleChange}>
                    <option value="em_breve">Em breve</option>
                    <option value="vendas_abertas">Vendas abertas</option>
                    <option value="lista_vip">Lista VIP</option>
                    <option value="esgotado">Esgotado</option>
                  </select>
                  <span style={selArrow}>▼</span>
                </div>
              </div>
            </div>

            {error && <p style={{ color: '#ff5555', fontSize: '0.85rem' }}>{error}</p>}

            <button type="submit" disabled={loading} style={{ padding: '1rem', background: '#F5A800', border: 'none', color: '#000', fontWeight: 'bold', fontSize: '0.95rem', cursor: 'pointer', letterSpacing: '0.1em' }}>
              {loading ? 'SALVANDO...' : 'SALVAR EVENTO'}
            </button>

          </form>
        </main>
      </div>
    </>
  )
}