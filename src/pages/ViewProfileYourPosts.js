import { Button } from "@material-ui/core";
import { IconSkipBack } from "@supabase/ui";
import { Link, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../client';
import { Chat } from "@material-ui/icons";
import * as React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import { ReviewsSharp } from '@mui/icons-material';
import Box from "../component/Box";



function ViewProfileYourPosts() {
    const { type } = useParams()
    const { UserId } = useLocation().state;

    const [data, setData] = useState('')
    const [avatarUrl, setAvatarUrl] = useState(null)
    const [days, setDays] = useState('')
    const session = supabase.auth.session()
    const [open, setOpen] = useState(false);
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        getProfile()
      }, [])

    async function getProfile() {
      const { data } = await supabase.from('profiles').select('*').eq('id', UserId).single()

      if (data) {
        setData(data)
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
      const { data : getreviews } = await supabase
        .from('reviews')
        .select('*') 
        .eq('reviewee', data.id)
      setReviews(getreviews)
      }
    }

    useEffect(() => {
        if (data.avatar_url) downloadImage(data.avatar_url)
      }, [data.avatar_url])
    
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
    

    return (
        <div style={{height: "100vh"}}>
            <h1> View Profile </h1>

            <img
              src={avatarUrl ? avatarUrl : `https://artscimedia.case.edu/wp-content/uploads/sites/79/2016/12/14205134/no-user-image.gif`} 
              alt={avatarUrl ? 'Avatar' : 'No image'}
              style={{ height: 150, width: 150 }}
            />

            <p><strong>Tele Handle:</strong> {data.username}</p>
            <p><strong>Major:</strong> {data.major}</p>
            <p><strong>Year of Study:</strong> {data.yearOfStudy}</p>
            <p><strong>Available Days:</strong> {days}</p>
            <p><strong>Personal Working Style:</strong> {data.workingStyle1}, {data.workingStyle2}, {data.workingStyle3}, {data.workingStyle4}, {data.workingStyle5}</p>

            <h1> </h1>
            <a href={"https://telegram.me/"+data.username} rel="noopener noreferrer" target="_blank" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" startIcon={<Chat />}>Chat</Button>
            </a> 
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
                      <Box>
                        <Rating name="read-only" precision={0.5} value={review.rate} readOnly />
                        <p><strong>Module Code:</strong> {review.moduleCode}</p>
                        <p><strong>Feedback:</strong> {review.content}</p>
                      </Box>
                    </div> 
                  ))} 
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleClose()}>Close</Button>
              </DialogActions>
            </Dialog>
            
            <h1> </h1>
            <Link to="/YourPosts" style={{ textDecoration: 'none' }}>
              <Button colour="primary" variant="contained" startIcon={<IconSkipBack />}>Go back to Your Posts</Button>
            </Link>
        </div>
    ) 
}

export default ViewProfileYourPosts