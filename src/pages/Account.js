import { supabase } from '../client'
import { Button } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { Edit } from '@material-ui/icons';
import { useState, useEffect } from 'react'
import { ReviewsSharp } from '@mui/icons-material';

import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Box from "../component/Box";
import Box2 from "../component/Box2";
import Rating from '@mui/material/Rating';


function Account() {
  const session = supabase.auth.session()
  const [profiles, setProfiles] = useState('')
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [days, setDays] = useState('')

  useEffect(() => {
    getProfile()
  }, [])

  async function getProfile() {
    const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
    
    if (data) {
      setProfiles(data)
      let availDays = "";
      let length = data.availableDay.length
      if (length === 0) {
        setDays("")
      } else {
        for (let i = 0; i < length - 1; i++) {
          availDays += data.availableDay[i] + ", ";
        }
        availDays += data.availableDay[length - 1]
        setDays(availDays)
      }
    }
  }

  useEffect(() => {
    if (profiles.avatar_url) downloadImage(profiles.avatar_url)
  }, [profiles.avatar_url])

  const downloadImage = async (path) => {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  // reviews 
  const [open, setOpen] = useState(false);
  const [reviews, setReviews] = useState([])

  function handleClickOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }
  
  const descriptionElementRef = React.useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    fetchReviews()
  }, [])

  async function fetchReviews() {
    const { data } = await supabase
        .from('reviews')
        .select('*') 
        .eq('reviewee', session.user.id) 
    setReviews(data)
  }

  return (
    <div style={{height: "100vh"}}>

      <h1> Profile </h1>

      <img
        src={avatarUrl ? avatarUrl : `https://artscimedia.case.edu/wp-content/uploads/sites/79/2016/12/14205134/no-user-image.gif`} 
        alt={avatarUrl ? 'Avatar' : 'No image'}
        style={{ height: 150, width: 150 }}
      />

      <p><strong>Email:</strong> {session.user.email}</p>
      <p><strong>Tele Handle:</strong> {profiles.username}</p>
      <p><strong>Major:</strong> {profiles.major}</p>
      <p><strong>Year of Study:</strong> {profiles.yearOfStudy}</p>
      <p><strong>Available Days:</strong> {days}</p> 
      <p><strong>Personal Working Style:</strong> {profiles.workingStyle1}, {profiles.workingStyle2}, {profiles.workingStyle3}, {profiles.workingStyle4}, {profiles.workingStyle5}</p>

      <h2> </h2>

      <Link to="/EditAccount" style={{ textDecoration: 'none' }}><Button variant="contained" color="primary" startIcon={<Edit />}>Edit Profile</Button></Link>
     {" "}
      
      <Button variant="contained" color="primary" startIcon={<ReviewsSharp />} onClick={() => handleClickOpen()}>View Reviews</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll='paper'
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Reviews</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {reviews.map((review) => (
              <div>
                <Box2>
                  <Rating name="read-only" precision={0.5} value={review.rate} readOnly />
                  <p><strong>Module Code:</strong> {review.moduleCode}</p>
                  <p><strong>Feedback:</strong> {review.content}</p>
                </Box2>
              </div> 
            ))} 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Close</Button>
        </DialogActions>
      </Dialog>

      <div/>

      <h2> </h2>
      <Link to="/" style={{ textDecoration: 'none' }}><Button size='small' variant='contained' onClick={() => supabase.auth.signOut()}>LogOut</Button></Link>

    </div>
  )
}

export default Account