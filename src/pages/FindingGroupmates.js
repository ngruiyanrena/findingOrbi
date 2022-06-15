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

      <Box>
        <h1>Search </h1>
        <Input 
          placeholder="Search Module Code here" 
          onChange={event => setQuery(event.target.value)}
          icon={<IconSearch />}
        />
      </Box>

      {posts.filter(post => {
          if (query === '') {
            return post;
          } else if (post.ModuleCode.toLowerCase().includes(query.toLowerCase())) {
            return post;
          }
          })
        .map((post, id) => (
          <div key={post.id}>
            <Box>
              <p><strong>Module code:</strong> {post.ModuleCode}</p>
              <p>Searching for <strong>{post.MemberNo}</strong> member(s)</p>
              <p><strong>Preferred Partner Working Style:</strong> {post.WorkStylePref1}, {post.WorkStylePref2}, {post.WorkStylePref3}, {post.WorkStylePref4}, {post.WorkStylePref5}</p>
              <Link style={{ textDecoration: 'none' }} to={{
                pathname: "/FindingGroupmates/ViewProfile", 
                state: {UserId: post.UserId}
              }}>
                <Button size="small" variant="contained" startIcon={<IconUser />}>View Profile</Button>
              </Link>
            </Box>
          </div>
      ))} 

    </div>
  );
}

export default FindingGroupmates;

