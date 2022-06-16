import { Button } from "@material-ui/core";
import { IconSkipBack } from "@supabase/ui";
import { Link, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../client';
import { Chat } from "@material-ui/icons";
import { HandshakeOutlined } from "@mui/icons-material";
import LoadingButton from '@mui/lab/LoadingButton';


function ViewProfile() {
    const { type } = useParams()
    const { UserId } = useLocation().state;

    const [data, setData] = useState('')
    const [avatarUrl, setAvatarUrl] = useState(null)

    useEffect(() => {
        getProfile()
      }, [])

    async function getProfile() {
        const { data } = await supabase.from('profiles').select('*').eq('id', UserId).single()
        setData(data)
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
    const [loading, setLoading] = useState(false);
    function handleClick() {
      setLoading(true);
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
            <p><strong>Available Days:</strong> {data.availableDay}</p>
            <p><strong>Personal Working Style:</strong> {data.workingStyle1}, {data.workingStyle2}, {data.workingStyle3}, {data.workingStyle4}, {data.workingStyle5}</p>

            <h1> </h1>
            <a href={"https://telegram.me/"+data.username} rel="noopener noreferrer" target="_blank" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" startIcon={<Chat />}>Chat</Button>
            </a> 
            {" "}
            <LoadingButton
              onClick={handleClick}
              loading={loading}
              startIcon={<HandshakeOutlined />}
              loadingIndicator="Pending..."
              variant="contained"
            >
              Offer
            </LoadingButton>
            <h1> </h1>
            <Link to="/FindingGroupmates" style={{ textDecoration: 'none' }}>
              <Button colour="primary" variant="contained" startIcon={<IconSkipBack />}>Go back to Finding Groupmates</Button>
            </Link>
        </div>
    ) 
}

export default ViewProfile