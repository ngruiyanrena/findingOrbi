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


function ViewProfile() {
    const { type } = useParams()
    const { UserId, PostId } = useLocation().state;

    const [profile, setProfile] = useState('')
    const [avatarUrl, setAvatarUrl] = useState(null)
    const session = supabase.auth.session()
    const [acceptedProfiles, setAcceptedProfiles] = useState('')

    useEffect(() => {
        getProfile()
        setStateOfButton()
        getAcceptedProfiles()
      }, [])

    async function getProfile() {
      const { data } = await supabase.from('profiles').select('*').eq('id', UserId).single()

      if (data) {
        setProfile(data)
      }
    }

    function getAvailableDays(profileInfo) {
      console.log(profileInfo)
      let availDays = "";
      let length = profileInfo.length
      if (length === 0) {
        return "" 
      } else {
        for (let i = 0; i < length - 1; i++) {
          availDays += profileInfo[i] + ", ";
        }
        availDays += profileInfo[length - 1]
        return availDays
      }
    }

    async function getAcceptedProfiles() {
      const { data : post } = await supabase.from('posts').select('*').eq('id', PostId).single()
      let profiles = []
      if (post.AcceptUserIds) {
        for (var i = 0; i < post.AcceptUserIds.length; i++) {
          const { data } = await supabase.from('profiles').select('*').eq('id', post.AcceptUserIds[i]).single()
          profiles.push(data)
        }
      }
      setAcceptedProfiles(profiles)
    }

    useEffect(() => {
        if (profile.avatar_url) downloadImage(profile.avatar_url)
      }, [profile.avatar_url])
    
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

    return (
        <div style={{minheight: "100vh"}}>
            <h1> View Profile(s) </h1>

            <Box>
            <h2> Groupmate 1</h2>

            <img
              src={avatarUrl ? avatarUrl : `https://artscimedia.case.edu/wp-content/uploads/sites/79/2016/12/14205134/no-user-image.gif`} 
              alt={avatarUrl ? 'Avatar' : 'No image'}
              style={{ height: 150, width: 150 }}
            />
    
            <p><strong>Tele Handle:</strong> {profile.username}</p>
            <p><strong>Major:</strong> {profile.major}</p>
            <p><strong>Year of Study:</strong> {profile.yearOfStudy}</p>
            <p><strong>Available Days:</strong> {profile.availableDay ? getAvailableDays(profile.availableDay) : ""}</p>
            <p><strong>Personal Working Style:</strong> {profile.workingStyle1}, {profile.workingStyle2}, {profile.workingStyle3}, {profile.workingStyle4}, {profile.workingStyle5}</p>

            <h1> </h1>
            <a href={"https://telegram.me/"+profile.username} rel="noopener noreferrer" target="_blank" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" startIcon={<Chat />}>Chat</Button>
            </a> 
            </Box>

            {acceptedProfiles ? acceptedProfiles.map((acceptedProfile) => (
              <div>
              <Box>
                <h2> Groupmate {acceptedProfiles.indexOf(acceptedProfile) + 2}</h2>
                <p><strong>Tele Handle:</strong> {acceptedProfile.username}</p>
                <p><strong>Major:</strong> {acceptedProfile.major}</p>
                <p><strong>Year of Study:</strong> {acceptedProfile.yearOfStudy}</p>
                <p><strong>Available Days:</strong> {acceptedProfile.availableDay ? getAvailableDays(acceptedProfile.availableDay) : ""}</p>
                <p><strong>Personal Working Style:</strong> {acceptedProfile.workingStyle1}, {acceptedProfile.workingStyle2}, {acceptedProfile.workingStyle3}, {acceptedProfile.workingStyle4}, {acceptedProfile.workingStyle5}</p>

                <h1> </h1>
                <a href={"https://telegram.me/"+acceptedProfile.username} rel="noopener noreferrer" target="_blank" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="primary" startIcon={<Chat />}>Chat</Button>
                </a> 
              </Box>
              </div>
            )) : ""}

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