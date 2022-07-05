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


function ViewProfileYourProjects() {
    const { type } = useParams()
    const { UserId, PostId } = useLocation().state;

    const [info, setInfo] = useState('')
    const [profiles, setProfiles] = useState('')
    const [ days, setDays ] = useState('')
    const [avatarUrl, setAvatarUrl] = useState(null)
    const session = supabase.auth.session()

    useEffect(() => {
        getProfiles()
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


    return (
        <div style={{height: "100vh"}}>

            <h1> View Profile(s) </h1>

            <Stack direction="row" spacing={2}  divider={<Divider orientation="vertical" flexItem />} justifyContent="center">
            {
      
              profiles ? profiles.map((profile) => (
                <div>  
                <Button variant="outlined" onClick={() => setInfo(profile)}> View Profile of Groupmate {profiles.indexOf(profile) + 1} </Button>
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
            <Button variant="contained" color="primary" startIcon={<IconPenTool />}> Review </Button>

            </Box>

            <h1> </h1>
            <Link to="/YourProjects" style={{ textDecoration: 'none' }}>
              <Button colour="primary" variant="contained" startIcon={<IconSkipBack />}>Go back to Your Projects</Button>
            </Link>
        </div>
    ) 
}

export default ViewProfileYourProjects