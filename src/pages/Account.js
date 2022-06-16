import { supabase } from '../client'
import { Button } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { Edit, RecordVoiceOver } from '@material-ui/icons';
import { useState, useEffect } from 'react'


function Account() {
  const session = supabase.auth.session()
  const [data, setData] = useState('')
  const [avatarUrl, setAvatarUrl] = useState(null)
  // const [days, setDays] = useState('')

  useEffect(() => {
    getProfile()
  }, [])

  async function getProfile() {
    const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
    if (data) setData(data)
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

  // function getAvailableDays(data) {
  //   let availableDays = "";
  //   for (var i = 0; i < data.availableDay.length; i++) {
  //     availableDays += <li>${data[i].availableDay} + ", "</li>
  //   }
  //   setDays(availableDays)
  // }

  // useEffect(() => {
  //   getAvailableDays()
  // }, [])

  return (
    <div style={{height: "100vh"}}>

      <h1> Profile </h1>

      <img
        src={avatarUrl ? avatarUrl : `https://artscimedia.case.edu/wp-content/uploads/sites/79/2016/12/14205134/no-user-image.gif`} 
        alt={avatarUrl ? 'Avatar' : 'No image'}
        style={{ height: 150, width: 150 }}
      />

      <p><strong>Email:</strong> {session.user.email}</p>
      <p><strong>Tele Handle:</strong> {data.username}</p>
      <p><strong>Major:</strong> {data.major}</p>
      <p><strong>Year of Study:</strong> {data.yearOfStudy}</p>
      <p><strong>Available Days:</strong> {data.availableDay}</p>
      {/* <p><strong>Available Days:</strong> {getAvailableDays(data)}</p> */}
      <p><strong>Personal Working Style:</strong> {data.workingStyle1}, {data.workingStyle2}, {data.workingStyle3}, {data.workingStyle4}, {data.workingStyle5}</p>

      <h2> </h2>
      <Link to="/EditAccount"><Button variant="contained" color="primary" startIcon={<Edit />}>Edit Profile</Button></Link>
      <h2> </h2>
      <div/>
      <Link to="/"><Button size='small' variant='contained' onClick={() => supabase.auth.signOut()}>LogOut</Button></Link>
    </div>
  )
}

export default Account