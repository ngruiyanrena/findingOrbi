import { useState } from 'react'
import { supabase } from '../client'
import { Link } from 'react-router-dom';
import { Button } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Email } from '@material-ui/icons';
import { PasswordRounded } from '@mui/icons-material';

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
                <TextField 
                  margin="normal" 
                  id="email" 
                  type="email" 
                  label=" Email" 
                  variant="outlined"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
                <div/>
                <TextField 
                  margin="normal" 
                  id="password" 
                  type="password" 
                  label=" Password" 
                  variant="outlined"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PasswordRounded />
                      </InputAdornment>
                    ),
                  }}
                />
                <div/>
                <h1> </h1>
                <Button variant="contained" onClick={handleLogin}>Login</Button>
              </form>
            )}
      </div>
      <h1> </h1>
      <p> Do not have an existing account? </p>
      <Link to="/SignUp"><Button size="small" variant="contained" color="primary">Sign up here</Button></Link>
    </div>
  )
}

export default Login;