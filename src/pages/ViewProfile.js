import { Button } from "@material-ui/core";
import { IconSkipBack } from "@supabase/ui";
import { Link, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../client';
import { Chat } from "@material-ui/icons";
import { HandshakeOutlined } from "@mui/icons-material";
import ToggleButton from '@mui/material/ToggleButton';
import * as React from 'react';
import Box from "../component/Box";
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import { ReviewsSharp } from '@mui/icons-material';


function ViewProfile() {
    const { type } = useParams()
    const { UserId, PostId } = useLocation().state;

    const [info, setInfo] = useState('')
    const [profiles, setProfiles] = useState('')
    const [ days, setDays ] = useState('')
    const [avatarUrl, setAvatarUrl] = useState(null)
    const session = supabase.auth.session()

    useEffect(() => {
        getProfiles()
        setStateOfButton()
      }, [])

    async function getProfiles() {
      const { data : profileUserId } = await supabase.from('profiles').select('*').eq('id', UserId).single()
      const { data : post } = await supabase.from('posts').select('*').eq('id', PostId).single()
      let profiles = []
      if (profileUserId) {
        profiles.push(profileUserId)
      }
      if (post.AcceptUserIds) {
        for (var i = 0; i < post.AcceptUserIds.length; i++) {
          const { data } = await supabase.from('profiles').select('*').eq('id', post.AcceptUserIds[i]).single()
          profiles.push(data)
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

    // "offer" button 
    const [selected, setSelected] = useState(false);

    async function setStateOfButton() {
      const { data } = await supabase
        .from('posts')
        .select('OffersUserIds')
        .eq('id', PostId)
        .single()
      for (var i = 0; i < data.OffersUserIds.length; i++) {
        if (data.OffersUserIds[i] === session.user.id) {
          setSelected(true)
        }
      }
    }
    
    async function offer() {
      setSelected(!selected)
      const { data } = await supabase
        .from('posts')
        .select('OffersUserIds')
        .eq('id', PostId)
        .single()
      if (selected === false) {
        data.OffersUserIds.push(session.user.id)
      } else {
        for (var i = 0; i < data.OffersUserIds.length; i++) {
          if (data.OffersUserIds[i] === session.user.id) {
            data.OffersUserIds.splice(i, 1)
          }
        }
      }
      const unique = (value, index, self) => {
        return self.indexOf(value) === index
      }
      const { updatedOffersUserIds } = await supabase
        .from('posts')
        .update({ OffersUserIds : data.OffersUserIds.filter(unique) })
        .eq('id', PostId)
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

    async function fetchReviews(user) {
      const { data } = await supabase
          .from('reviews')
          .select('*') 
          .eq('reviewee', user) 
      setReviews(data)
    }

    return (
        <div style={{minheight: "100vh"}}>
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
              {"   "}
            </a> 

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
            </Box>

            <ToggleButton
              value="check"
              color='info'
              selected={selected}
              onClick={() => {
                offer();
              }}
              size="small"
            >
              <HandshakeOutlined /> Offer 
            </ToggleButton>
            <h1> </h1>
            <Link to="/FindingGroupmates" style={{ textDecoration: 'none' }}>
              <Button colour="primary" variant="contained" startIcon={<IconSkipBack />}>Go back to Finding Groupmates</Button>
            </Link>
        </div>
    ) 
}

export default ViewProfile