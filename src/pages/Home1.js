import '../index.css'
import { useState, useEffect } from 'react'
import { supabase } from '../client'
import Login from './Login'
import SignUp from './SignUp'
import Account from './Account'

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
      {!session ? <Login /> : <Account key={session.user.id} session={session} />}
    </div>
  )
}

export default Home1;