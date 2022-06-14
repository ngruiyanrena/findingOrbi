import { Button } from "@material-ui/core";
import { IconSkipBack } from "@supabase/ui";
import { Link, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../client';


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
    
    return (
        <div>
            <h1> View Profile </h1>

            <img
              src={avatarUrl ? avatarUrl : `https://artscimedia.case.edu/wp-content/uploads/sites/79/2016/12/14205134/no-user-image.gif`} 
              alt={avatarUrl ? 'Avatar' : 'No image'}
              style={{ height: 150, width: 150 }}
            />

            <p><strong>Tele Handle:</strong> {data.username}</p>
            <p><strong>Major:</strong> {data.major}</p>
            <p><strong>Year of Study:</strong> {data.yearOfStudy}</p>
            <p><strong>Available Days:</strong> {data.availableDays}</p>
            <p><strong>Personal Working Style:</strong> {data.workingStyle1}, {data.workingStyle2}, {data.workingStyle3}, {data.workingStyle4}, {data.workingStyle5}</p>

            <h1> </h1>
            <Link to="/FindingGroupmates"><Button colour="primary" variant="contained" startIcon={<IconSkipBack />}>Go back to Finding Groupmates</Button></Link>
        </div>
    ) 
}

export default ViewProfile