import { Button } from "@material-ui/core";
import { IconPenTool, IconSkipBack } from "@supabase/ui";
import { Link, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../client';
import { Chat } from "@material-ui/icons";
import * as React from 'react';
import Box from "../component/Box";
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import { Input } from "@supabase/ui";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import { ReviewsSharp } from '@mui/icons-material';
import Alert from '@mui/material/Alert';

function ViewProfileYourProjects() {
    const { type } = useParams()
    const { UserId, PostId } = useLocation().state;

    const [info, setInfo] = useState('')
    const [profiles, setProfiles] = useState('')
    const [ days, setDays ] = useState('')
    const [avatarUrl, setAvatarUrl] = useState(null)
    const session = supabase.auth.session()

    const [ MC, setMC ] = useState('')
    const [review, setReview] = useState({ reviewer: session.user.id, reviewee: info.id, moduleCode: MC, content: "", rate: 0})
    const { reviewer, reviewee, moduleCode, content, rate } = review 

    useEffect(() => {
        getProfiles()
      }, [])

    async function getProfiles() {
      const { data : profileUserId } = await supabase.from('profiles').select('*').eq('id', UserId).single()
      const { data : post } = await supabase.from('posts').select('*').eq('id', PostId).single()
      setMC(post.ModuleCode)
      let profiles = []
      if (profileUserId) {
        profiles.push(profileUserId)
      }
      if (post.AcceptUserIds) {
        for (var i = 0; i < post.AcceptUserIds.length; i++) {
          if (post.AcceptUserIds[i] !== session.user.id) {
            const { data } = await supabase.from('profiles').select('*').eq('id', post.AcceptUserIds[i]).single()
            profiles.push(data)
          }
        }
      }
      setProfiles(profiles)
    }

    useEffect(() => {
      if (info.availableDay) getAvailableDays(info.availableDay)
      if (info.avatar_url) downloadImage(info.avatar_url)
      if (info.id) fetchReviews(info.id)
    }, [info])

    function getAvailableDays(profileInfo) {
      let availDays = "";
      let length = profileInfo.length
      if (length === 0) {
        setDays("")
      } else {
        for (let i = 0; i < length - 1; i++) {
          availDays += profileInfo[i] + ", ";
        }
        availDays += profileInfo[length - 1]
        setDays(availDays)
      }
    }

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
    
    // Review button 
    const [open, setOpen] = React.useState(false);

    async function submitReview() {
      await supabase
          .from('reviews') //insert individual post input by the user
          .insert([
          {reviewer, reviewee: info.id, moduleCode: MC, content, rate} 
          ])
          .single()
      setReview({ reviewer: session.user.id, reviewee: info.id, moduleCode: MC, content: "", rate: 0})
      setOpen(false);
    }

    function handleClickOpen() {
      setOpen(true);
    }

    function handleClose() {
      setOpen(false)
    }

    // reviews 
    const [open2, setOpen2] = useState(false);
    const [reviews2, setReviews2] = useState([])

    function handleClickOpen2() {
      setOpen2(true)
    }

    function handleClose2() {
      setOpen2(false)
    }
    
    const descriptionElementRef = React.useRef(null);
    useEffect(() => {
      if (open2) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [open2]);

    async function fetchReviews(user) {
      const { data } = await supabase
          .from('reviews')
          .select('*') 
          .eq('reviewee', user) 
      setReviews2(data)
    }

    return (
        <div style={{height: "100vh"}}>

            <h1> View Profile(s) </h1>

            <Stack direction="row" spacing={2}  divider={<Divider orientation="vertical" flexItem />} justifyContent="center">
            {
      
              profiles ? profiles.map((profile) => (
                <div>  
                <Button variant="outlined" onClick={() => setInfo(profile)}> Click to View Profile of Groupmate {profiles.indexOf(profile) + 1} </Button>
                </div>
              )) : "" 
              
            }
            </Stack>

            <Box> 

              <img
                src={avatarUrl ? avatarUrl : `https://artscimedia.case.edu/wp-content/uploads/sites/79/2016/12/14205134/no-user-image.gif`} 
                alt={avatarUrl ? 'Avatar' : 'No image'}
                style={{ height: 150, width: 150 }}
              />

              <p><strong>Tele Handle:</strong> {info.username}</p>
              <p><strong>Major:</strong> {info.major}</p>
              <p><strong>Year of Study:</strong> {info.yearOfStudy}</p>
              <p><strong>Available Days:</strong> {days}</p>
              <p><strong>Personal Working Style:</strong> {info.workingStyle1}, {info.workingStyle2}, {info.workingStyle3}, {info.workingStyle4}, {info.workingStyle5}</p>
              
              <a href={"https://telegram.me/"+info.username} rel="noopener noreferrer" target="_blank" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary" startIcon={<Chat />}>Chat</Button>
              </a> 

              {" "}
              <Button variant="contained" color="primary" startIcon={<ReviewsSharp />} onClick={() => handleClickOpen2()}>View Reviews</Button>
              <Dialog
                open={open2}
                onClose={handleClose2}
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
                    {reviews2.map((review2) => (
                      <div>
                        <Box>
                          <Rating name="read-only" precision={0.5} value={review2.rate} readOnly />
                          <p><strong>Module Code:</strong> {review2.moduleCode}</p>
                          <p><strong>Feedback:</strong> {review2.content}</p>
                        </Box>
                      </div> 
                    ))} 
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => handleClose2()}>Close</Button>
                </DialogActions>
              </Dialog>

              <h1> </h1>
              <Button variant="outlined" color="primary" startIcon={<IconPenTool />} onClick={() => handleClickOpen()}>
                Leave A Review
              </Button>
              <Dialog fullWidth={true} open={open} onClose={handleClose}>
                <DialogTitle>Leave A Review</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Please rate your groupmate, {info ? info.username : ""}
                  </DialogContentText>
                  <Rating name="half-rating" precision={0.5} onChange={e => setReview({ ...review, rate: e.target.value})} />
                  <DialogContentText>
                    Type your review below: 
                  </DialogContentText>
                  <Input
                      placeholder="eg: Great groupmate! Would love to work together again."
                      value={content} 
                      onChange={e => setReview({...review,  content: e.target.value})}
                  />
                </DialogContent>
                <Alert severity="warning">Do note that any inappropriate reviews will be taken down</Alert>
                <DialogActions>
                  <Button onClick={() => handleClose()}>Cancel</Button>
                  <Button onClick={() => submitReview()}>Submit</Button>
                </DialogActions>
              </Dialog>

            </Box>

            <h1> </h1>
            <Link to="/YourProjects" style={{ textDecoration: 'none' }}>
              <Button colour="primary" variant="contained" startIcon={<IconSkipBack />}>Go back to Your Projects</Button>
            </Link>

        </div>
    ) 
}

export default ViewProfileYourProjects