import { supabase } from '../client'
import { Button } from "@material-ui/core";
import { Link } from 'react-router-dom';
// import ProfilePic from '../component/ProfilePic'


function Account() {
  const session = supabase.auth.session()
  //const user = supabase.auth.user()

  const getProfiles = async () => {
    const user = supabase.auth.user()
    const { data } = await supabase.from('profiles').select('username').eq('id', user.id).single()
    return data
  }

  return (
    <div key={session.user.id}>
      <h1> Profile </h1>

      {/* <ProfilePic
            url={avatar_url}
            size={150}
          }}
        /> */}

      <p>Email: {session.user.email}</p>
      <p>Tele Handle: {getProfiles}</p>
      <p>Major: {}</p>
      <p>Year of Study: {}</p>
      <p>Available Days: {}</p>
      <p>Personal Working Style: {}</p>

      <h2> </h2>
      <Link to="/EditAccount"><Button variant="contained" color="primary">Edit Profile</Button></Link>
      <h2> </h2>
      <div/>
      <Link to="/"><Button size='small' variant='contained' onClick={() => supabase.auth.signOut()}>LogOut</Button></Link>
    </div>
  )
}

export default Account