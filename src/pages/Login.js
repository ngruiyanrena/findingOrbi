import { useState } from 'react'
import { supabase } from '../client'
import { Link } from 'react-router-dom';
import { Button } from "@material-ui/core";

function Login() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ 
        email: email, 
        password: password })
      if (error) throw error
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget" aria-live="polite">
        <h1>Welcome to Finding Orbi! </h1>
          <p>Login with your email and password below</p>
            {loading ? (
              'Logging in...'
            ) : (
              <form onSubmit={e => e.preventDefault()}>
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  className="inputField"
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div/>
                <label htmlFor="password">Password:</label>
                <input
                  id="password"
                  className="inputField"
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div/>
                <button onClick={handleLogin} className="button block" aria-live="polite">
                  Login
                </button>
              </form>
            )}
      </div>
      <p> Do not have an existing account? </p>
      <Link to="./SignUp"><Button size="small" variant="contained" color="primary">Sign Up here</Button></Link>
    </div>
  )
}

export default Login;