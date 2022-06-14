import '../index.css'
import { useState, useEffect } from 'react'
import { supabase } from '../client'
import Home from './Home'
import Home2 from './Home2'

function Home1() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Home2 /> : <Home />}
    </div>
  )
}

export default Home1;