import EditProfile from "./EditProfile";

import { Button } from "@material-ui/core";

function Profile() {
    return (
        <div> hello 
        
        <Button variant="contained" color="primary" onClick={EditProfile}>Edit Profile</Button>

        </div>
    )
}

export default Profile; 