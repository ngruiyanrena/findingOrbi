import { Button } from "@material-ui/core";
import { IconSkipBack } from "@supabase/ui";
import { Link, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../client';
import { Chat } from "@material-ui/icons";
import { HandshakeOutlined } from "@mui/icons-material";
import ToggleButton from '@mui/material/ToggleButton';
import * as React from 'react';


function ViewProfile() {
    const { type } = useParams()
    const { UserId, PostId } = useLocation().state;

    const [data, setData] = useState('')
    const [avatarUrl, setAvatarUrl] = useState(null)
    const [days, setDays] = useState('')
    const session = supabase.auth.session()

    useEffect(() => {
        getProfile()
        setStateOfButton()
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
        <div style={{height: "100vh"}}>
            <h1> View Profile(s) </h1>

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