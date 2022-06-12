import '../App.css';
import { useState, useEffect } from 'react'
import { supabase } from '../client'
import Box from "../component/Box";
import { Input } from "@supabase/ui";

import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

// import FormLabel from '@mui/material/FormLabel';

function FindingGroupmates() {
  const [posts, setPosts] = useState([])
  const [post, setPost] = useState({ ModuleCode: "", MemberNo: "", WorkStylePref1: "", WorkStylePref2: "", WorkStylePref3: "", WorkStylePref4: "", WorkStylePref5: "" }) 
  const { ModuleCode, MemberNo, WorkStylePref1, WorkStylePref2, WorkStylePref3, WorkStylePref4, WorkStylePref5 } = post 
  
  useEffect(() => {
    fetchPosts()
  }, []) // call fetchpost function when application loads
  
  async function fetchPosts() {
    const { data } = await supabase
        .from('posts')
        .select() //select all posts
      setPosts(data)
      console.log("data: ", data) // to check how the data looks like
  }

  async function createPost() {
    await supabase
      .from('posts') //insert individual post input by the user
      .insert([
        { ModuleCode, MemberNo, WorkStylePref1, WorkStylePref2, WorkStylePref3, WorkStylePref4, WorkStylePref5 } 
      ])
      .single()
    setPost({ ModuleCode: "", MemberNo: "", WorkStylePref1: "", WorkStylePref2: "", WorkStylePref3: "", WorkStylePref4: "", WorkStylePref5: ""}) 
    // setpost for once post created call setpost to reset the form fields
    fetchPosts() 
    //fetchpost to update the ui with the new post
  }

  const [query, setQuery] = useState("")

  return (
    <div className="App">
    <h1>Find Your Groupmates</h1>

    <Box>

    <h1>Search </h1>
    <Input placeholder="Search Module Code here" onChange={event => setQuery(event.target.value)} />

    </Box>

    <Box>
      <h2> New Post </h2>

      <h4 align='left'> Module Code: </h4>
      <Input
        placeholder="eg. CS2030"
        value={ModuleCode} 
        onChange={e => setPost({ ...post, ModuleCode: e.target.value})}
        //onchange handler as the user types
      />
      <div/>
  
      <h4 align='left'> Working Style Preference: </h4>
      <FormControl>
        <RadioGroup
          row
          onChange={e => setPost({ ...post, WorkStylePref1: e.target.value})}
        >
          <FormControlLabel value="Team Member" control={<Radio />} label="Team Member" />
          <FormControlLabel value="Team Leader" control={<Radio />} label="Team Leader" />
        </RadioGroup>
        <RadioGroup
          row
          onChange={e => setPost({ ...post, WorkStylePref2: e.target.value})}
        >
          <FormControlLabel value="Supportive" control={<Radio />} label="Supportive" />
          <FormControlLabel value="Take Charge" control={<Radio />} label="Take Charge" />
        </RadioGroup>
        <RadioGroup
          row
          onChange={e => setPost({ ...post, WorkStylePref3: e.target.value})}
        >
          <FormControlLabel value="Organised" control={<Radio />} label="Organised" />
          <FormControlLabel value="Spontaneous" control={<Radio />} label="Spontaneous" />
        </RadioGroup>
        <RadioGroup
          row
          onChange={e => setPost({ ...post, WorkStylePref4: e.target.value})}
        >
          <FormControlLabel value="Detail Oriented" control={<Radio />} label="Detail Oriented" />
          <FormControlLabel value="Broad Perspective" control={<Radio />} label="Broad Perspective" />
        </RadioGroup>
        <RadioGroup
          row
          onChange={e => setPost({ ...post, WorkStylePref5: e.target.value})}
        >
          <FormControlLabel value="Creative" control={<Radio />} label="Creative" />
          <FormControlLabel value="Strategic" control={<Radio />} label="Strategic" />
        </RadioGroup>
      </FormControl>
      <div/>
      <h4 align='left'> Number of members searching for: </h4>
      <Input
        placeholder="eg. 2"
        value={MemberNo}
        onChange={e => setPost({ ...post, MemberNo: e.target.value})}
      />
      <div/>
      <button onClick={createPost}>Create Post</button>
      </Box>
      {
        posts.filter(post => {
          if (query === '') {
            return post;
          } else if (post.ModuleCode.toLowerCase().includes(query.toLowerCase())) {
            return post;
          }
        }).map((post,id) => (
          <div key={post.id}>
          <Box>
            <p>Module code : {post.ModuleCode}</p>
            <p>Searching for {post.MemberNo} member(s)</p>
            <p>Preferred Partner Working Style: {[post.WorkStylePref1, ", ", post.WorkStylePref2, ", ", post.WorkStylePref3, ", ", post.WorkStylePref4, ", ", post.WorkStylePref5]}</p>
            </Box>
          </div>
        ))
      } 
    </div>
  );
}
export default FindingGroupmates;