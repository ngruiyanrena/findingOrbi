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

function Profile() {
  const [profiles, setProfiles] = useState([])
  const [profile, setProfile] = useState({ Major: "", StudyYear: "", OwnWorkStyle: "", AvailDays: ""})
  const { Major, StudyYear, OwnWorkStyle, AvailDays } = profile
 
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
        { Major, StudyYear, OwnWorkStyle, AvailDays }
      ])
      .single()
    //setProfile({ Major: "", StudyYear: "", OwnWorkStyle: "", AvailDays: "" })
    fetchProfiles()
  }

 
  return (
    <div className="App">

    <h1> Profile </h1>


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
      <h4> Please input your Personal Work Style: </h4>
      <Input
        placeholder="eg: ENFP-T"
        value={OwnWorkStyle} 
        onChange={e => setProfile({ ...profile, OwnWorkStyle: e.target.value})}
        //onchange handler as the user types
      />
      </Box>
      <Box>
      <h4> Please input your Available Days: </h4> 
      <p>where monday = 1, tuesday = 2, .. sunday = 7</p>
      <Input
        placeholder="eg:123"
        value={AvailDays} 
        onChange={e => setProfile({ ...profile, AvailDays: e.target.value})}
        //onchange handler as the user types
      />
      </Box>

      <Button type="submit" variant="contained" color="primary" onClick={createProfile}>Save Profile</Button>
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
export default Profile;