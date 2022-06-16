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

  useEffect(() => {
    fetchPosts()
  }, []) // call fetchpost function when application loads
  
  async function fetchPosts() {
    const { data } = await supabase
      .from('posts')
      .select() //select all posts
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

        <h1>Filter </h1>
        <h3>Input your preferences for each following work style field</h3>
        <p> Feel free to leave it blank if you have no preference!</p>
        <Input 
        label= "Team member / Team leader"
          placeholder="eg: Team member" 
          onChange={event => setWorkingStyle1(event.target.value)}
          />
          <h1></h1>
           <Input 
        label= "Supportive / Take charge"
          placeholder="eg: Take charge" 
          onChange={event => setWorkingStyle2(event.target.value)}
          />
           <h1></h1>
         <Input 
        label= "Organised / Spontaneous"
          placeholder="eg: Organised" 
          onChange={event => setWorkingStyle3(event.target.value)}
          />
           <h1></h1>
         <Input 
        label= "Detail Oriented / Broad Perspective "
          placeholder="eg: Detail Oriented" 
          onChange={event => setWorkingStyle4(event.target.value)}
          />
           <h1></h1>
         <Input 
        label= "Creative / Strategic"
          placeholder="eg: Strategic" 
          onChange={event => setWorkingStyle5(event.target.value)}
          />
       

        
      </Box>

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
              <Link to={{
                pathname: "/FindingGroupmates/ViewProfile", 
                state: {UserId: post.UserId}
              }}><Button size="small" variant="contained" startIcon={<IconUser />}>View Profile</Button></Link>
            </Box>
          </div>
      ))} 

    </div>
  );
}

export default FindingGroupmates;

