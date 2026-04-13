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
          flex-w
