import '../App.css';
import { useState, useEffect } from 'react'
import { supabase } from '../client'
import Box from "../component/Box";
import { IconSearch, IconUser, Input } from "@supabase/ui";
import { Button } from "@material-ui/core";
import { Link } from 'react-router-dom';



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

      <div class="flex-container">

      {/* style={{width:"50%", marginLeft:"80px"}} */}
      <div class="flex-child" > 
      <Box> 
        <h1>Search</h1>
        <Input 
          placeholder="Search Module Code here" 
          onChange={event => setQuery(event.target.value)}
          icon={<IconSearch />}
        />
      </Box>
      </div>

      {/* style={{width:"50%", float:'right'}} */}
      <div class="flex-child"> 
      <Box> 
        <h1>Filter </h1>
        <p>Input your preferences for each following work style field</p>
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

      </Box>
      </div>
      </div>

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
          <div key={post.id}>
            <Box>
              <p><strong>Module code:</strong> {post.ModuleCode}</p>
              <p>Searching for <strong>{post.MemberNo}</strong> member(s)</p>
              <p><strong>Preferred Partner Working Style:</strong> {post.WorkStylePref1}, {post.WorkStylePref2}, {post.WorkStylePref3}, {post.WorkStylePref4}, {post.WorkStylePref5}</p>
              <Link style={{ textDecoration: 'none' }} to={{
                pathname: "/FindingGroupmates/ViewProfile", 
                state: {UserId: post.UserId, PostId: post.id}
              }}>
                <Button size="small" variant="contained" startIcon={<IconUser />}>View Profile(s)</Button>
              </Link>
            </Box>
          </div>
      ))} 
    </div>
  );
}

export default FindingGroupmates;

