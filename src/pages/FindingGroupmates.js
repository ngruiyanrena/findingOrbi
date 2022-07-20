import '../App.css';
import { useState, useEffect } from 'react'
import { supabase } from '../client'
import { IconSearch, IconUser, Input } from "@supabase/ui";
import { Button } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { Grid, Card } from "@material-ui/core";


function FindingGroupmates() {
  const [posts, setPosts] = useState([])
  const [query, setQuery] = useState("")
  const [workingStyle1, setWorkingStyle1] = useState("")
  const [workingStyle2, setWorkingStyle2] = useState("")
  const [workingStyle3, setWorkingStyle3] = useState("")
  const [workingStyle4, setWorkingStyle4] = useState("")
  const [workingStyle5, setWorkingStyle5] = useState("")
  
  const session = supabase.auth.session()

  useEffect(() => {
    fetchPosts()
  }, []) // call fetchpost function when application loads
  
  async function fetchPosts() {
    const { data } = await supabase
      .from('posts')
      .select() 
      .neq('UserId', session.user.id) // only can see other users' posts
    setPosts(data)
  }

  return (
    <div className="App">
      <h1>Find Your Groupmates</h1>
      <Grid container spacing={2}>
      <Grid item xs={6}>
      <Card style={{padding:"10px", marginLeft: "20%" }}> 
        <h1>Search</h1>
        <Input 
          placeholder="Search Module Code here" 
          onChange={event => setQuery(event.target.value)}
          icon={<IconSearch />}
        />
      </Card>
      </Grid>
      <Grid item xs={6}>
      <Card style={{padding:"10px", marginRight: "20%" }}> 
        <h1>Filter </h1>
        <p>Input your own work style</p>
        <p> Feel free to leave it blank if you have no preference!</p>
        <Input 
          label= "Team Member / Team Leader"
          placeholder="eg. Team Member" 
          onChange={event => setWorkingStyle1(event.target.value)}
          descriptionText=" "
        />
        <Input 
          label= "Supportive / Take Charge"
          placeholder="eg. Supportive" 
          onChange={event => setWorkingStyle2(event.target.value)}
          descriptionText=" "
        />
        <Input 
          label= "Organised / Spontaneous"
          placeholder="eg. Organised" 
          onChange={event => setWorkingStyle3(event.target.value)}
          descriptionText=" "
        />
        <Input 
          label= "Detail Oriented / Broad Perspective "
          placeholder="eg. Detail Oriented" 
          onChange={event => setWorkingStyle4(event.target.value)}
          descriptionText=" "
        />
        <Input 
          label= "Creative / Strategic"
          placeholder="eg. Creative" 
          onChange={event => setWorkingStyle5(event.target.value)}
          descriptionText=" "
        />
      </Card>
      </Grid>

      <Grid item xs={12}>
      {posts.filter(post => {
        if (query === '' && workingStyle1 === '' && workingStyle2 === '' && workingStyle3 === '' && 
        workingStyle4 === '' && workingStyle5 === '') {
          return post;
        } else if (post.ModuleCode.toLowerCase().includes(query.toLowerCase())
        && post.WorkStylePref1.toLowerCase().includes(workingStyle1.toLowerCase())
        && post.WorkStylePref2.toLowerCase().includes(workingStyle2.toLowerCase())
        && post.WorkStylePref3.toLowerCase().includes(workingStyle3.toLowerCase())
        && post.WorkStylePref4.toLowerCase().includes(workingStyle4.toLowerCase())
        && post.WorkStylePref5.toLowerCase().includes(workingStyle5.toLowerCase())
        ) {
          return post;
        }
        }).map((post, id) => (
          <div key={post.id} style={{width:"100%"}}>
            <Card style={{padding: "10px", marginLeft: "10%", marginRight: "10%", marginBottom: "2%"}}>
                <p><strong>Module code:</strong> {post.ModuleCode}</p>
                <p>Searching for <strong>{post.MemberNo}</strong> member(s)</p>
                <p><strong>Preferred Partner Working Style:</strong> {post.WorkStylePref1}, {post.WorkStylePref2}, {post.WorkStylePref3}, {post.WorkStylePref4}, {post.WorkStylePref5}</p>
                <Link style={{ textDecoration: 'none' }} to={{
                  pathname: "/FindingGroupmates/ViewProfile", 
                  state: {UserId: post.UserId, PostId: post.id}
                }}>
                  <Button size="small" variant="contained" startIcon={<IconUser />}>View Profile(s)</Button>
                </Link>
            </Card>
          </div>
      ))} 
      </Grid>
      </Grid>
    </div>
  );
}

export default FindingGroupmates;

