// import EditProfile from "./EditProfile";
import { Link } from 'react-router-dom'; // IF IS REACT-WEB

import { Button } from "@material-ui/core";

function Profile() {
    return (
        <div> 
         <Link to="/EditProfile"><Button variant="contained" color="primary">Edit Profile</Button></Link>
        {/* <Button variant="contained" color="primary" onClick={EditProfile}>Edit Profile</Button> */}

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
    )
}

export default Profile; 

