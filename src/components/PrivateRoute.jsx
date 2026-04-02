 import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children }) {
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
  }, [])

  if (session === undefined) return null

  return session ? children : <Navigate to="/" />
}