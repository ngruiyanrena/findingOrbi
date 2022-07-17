import { useState } from 'react'
import { supabase } from '../client'
import { Link } from 'react-router-dom';
import { Button } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Email } from '@material-ui/icons';
import { PasswordRounded } from '@mui/icons-material';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

function SignUp() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [open, setOpen] = useState(false);

  const handleSignUp = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signUp({ 
          email: email, 
          password: password })
      if (error) throw error
      setOpen(true)
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
        <p>Sign up with your email and a password below</p>
        {loading ? (
          "Creating an account ..."
        ) : (
          <div> 
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              A link has been sent. Please check your email to verify your email address. 
            </Alert>
          </Collapse>
              
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
            <Button variant="contained" onClick={handleSignUp}>Sign Up</Button>
          </form>
          </div>
        )}
      </div>
      <h1> </h1>
      <p> Already have an existing account? </p>
      <Link to="/" style={{ textDecoration: 'none' }}><Button size="small" variant="contained" color="primary">Login here</Button></Link>
    </div>
  )
}

export default SignUp;