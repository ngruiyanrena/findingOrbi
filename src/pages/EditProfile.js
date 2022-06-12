// import { Typography } from "@material-ui/core";

// function Profile() {
//   return <Typography>This is the profile</Typography>;
// }
// export default Profile;

import '../App.css';
import { useState, useEffect } from 'react'
import { supabase } from '../client'
//import RadioGrouped from '../component/radio'
import Box from "../component/Box";
//import { Button } from "@supabase/ui";
import { Button } from "@material-ui/core";
import { Input } from "@supabase/ui";
import { Link } from 'react-router-dom'; // IF IS REACT-WEB


import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Profile from './Profile.js';
// import FormLabel from '@mui/material/FormLabel';

function EditProfile() {
  const [profiles, setProfiles] = useState([])
  const [profile, setProfile] = useState({ Major: "", StudyYear: "", OwnWorkStyle: "", AvailDays: ""})
  const { Major, StudyYear, OwnWorkStyle1, OwnWorkStyle2, OwnWorkStyle3, OwnWorkStyle4, OwnWorkStyle5, AvailDays } = profile

 
  useEffect(() => {
    fetchProfiles()
  }, [])
 
  async function fetchProfiles() {
    const { data } = await supabase
        .from('profile')
        .select() //select all profiles
      setProfiles(data)
      console.log("data: ", data) // to check how the data looks like
  }

  async function createProfile() {
    await supabase
      .from('profile')
      .insert([
        { Major, StudyYear, OwnWorkStyle1, OwnWorkStyle2, OwnWorkStyle3, OwnWorkStyle4, OwnWorkStyle5, AvailDays }
      ])
      .single()
    fetchProfiles()
  }

 
  return (
    <div className="App">

    <h1> Edit Profile </h1>


    <Box>
      <h4> Please input your major: </h4>
      <Input
        placeholder="eg: Business Analytics"
        value={Major} 
        onChange={e => setProfile({ ...profile, Major: e.target.value})}
        //onchange handler as the user types
      />
    </Box>

    <Box>
      <h4> Please input your Year Of Study: </h4>
      <Input
        placeholder="eg: 1"
        value={StudyYear} 
        onChange={e => setProfile({ ...profile, StudyYear: e.target.value})}
        //onchange handler as the user types
      />
    </Box>

    <Box>
      <h4> Please input your Personal Working Style: </h4>
      <FormControl>
        <RadioGroup
          row
          onChange={e => setProfile({ ...profile, OwnWorkStyle1: e.target.value})}
        >
          <FormControlLabel value="Team Member" control={<Radio />} label="Team Member" />
          <FormControlLabel value="Team Leader" control={<Radio />} label="Team Leader" />
        </RadioGroup>
        <RadioGroup
          row
          onChange={e => setProfile({ ...profile, OwnWorkStyle2: e.target.value})}
        >
          <FormControlLabel value="Supportive" control={<Radio />} label="Supportive" />
          <FormControlLabel value="Take Charge" control={<Radio />} label="Take Charge" />
        </RadioGroup>
        <RadioGroup
          row
          onChange={e => setProfile({ ...profile, OwnWorkStyle3: e.target.value})}
        >
          <FormControlLabel value="Organised" control={<Radio />} label="Organised" />
          <FormControlLabel value="Spontaneous" control={<Radio />} label="Spontaneous" />
        </RadioGroup>
        <RadioGroup
          row
          onChange={e => setProfile({ ...profile, OwnWorkStyle4: e.target.value})}
        >
          <FormControlLabel value="Detail Oriented" control={<Radio />} label="Detail Oriented" />
          <FormControlLabel value="Broad Perspective" control={<Radio />} label="Broad Perspective" />
        </RadioGroup>
        <RadioGroup
          row
          onChange={e => setProfile({ ...profile, OwnWorkStyle5: e.target.value})}
        >
          <FormControlLabel value="Creative" control={<Radio />} label="Creative" />
          <FormControlLabel value="Strategic" control={<Radio />} label="Strategic" />
        </RadioGroup>
      </FormControl>
    </Box>

    <Box>
      <h4> Please input your Available Days: </h4> 
      <p> where Monday = 1, Tuesday = 2, Wednesday = 3, Thursday = 4, </p>
      <p> Friday = 5, Saturday = 6, Sunday = 7 </p>
      <Input
        placeholder="eg: 123"
        value={AvailDays} 
        onChange={e => setProfile({ ...profile, AvailDays: e.target.value})}
        //onchange handler as the user types
      />
    </Box>

    <Link to="/Profile"><Button type="submit" variant="contained" color="primary" onClick={createProfile}>Save Profile</Button></Link>
      {/* {
        profiles.map(profile => (
          <div key={profile.id}>
            <h3>{profile.Major}</h3>
            <p>{profile.StudyYear}</p>
            <p>{profile.OwnWorkStyle}</p>
            <p>{profile.AvailDays}</p>
          </div>
        ))
      }  */}
    </div>
  );
}

export default EditProfile;