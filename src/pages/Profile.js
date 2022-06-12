import EditProfile from "./EditProfile";
import { Link } from 'react-router-dom'; // IF IS REACT-WEB

import { Button } from "@material-ui/core";
import Box from "../component/Box";

function Profile(props) {
    const major = props.major;
    const studyyear = props.StudyYear;
    const availdays = props.AvailDay
    return (
        <div> 
        <h1>Profile</h1>
        <Box>
            <h2>Major : {major}</h2>
            <h2>Year of Study : {studyyear}</h2>
            <h2>Personal Working Style:</h2>
            <h2>Available Days : {availdays}</h2>
        </Box>
        <h1>Reviews</h1>
         <Link to="/EditProfile"><Button variant="contained" color="primary">Edit Profile</Button></Link>

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

