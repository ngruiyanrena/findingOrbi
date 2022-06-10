import '../App.css';
import { useState, useEffect } from 'react'
import { supabase } from '../client'
import Box from "../component/Box";
import { Input } from "@supabase/ui";

function FindingGroupmates() {
  const [posts, setPosts] = useState([])
  const [post, setPost] = useState({ ModuleCode: "", MemberNo: "", WorkStylePref: ""})
  const { ModuleCode, MemberNo, WorkStylePref } = post
  
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
        { ModuleCode, MemberNo, WorkStylePref }
      ])
      .single()
    setPost({ ModuleCode: "", MemberNo: "", WorkStylePref: "" }) 
    // setpost for once post created call setpost to reset the form fields
    fetchPosts() 
    //fetchpost to update the ui with the new post
  }
  return (
    <div className="App">
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
      <h4 align='left'> Number of members searching for: </h4>
      <Input
        placeholder="eg. 2"
        value={MemberNo}
        onChange={e => setPost({ ...post, MemberNo: e.target.value})}
      />
      <div/>
      <h4 align='left'> Working Style Preference: </h4>
      <Input
        placeholder="WorkStylePref"
        value={WorkStylePref}
        onChange={e => setPost({ ...post, WorkStylePref: e.target.value})}
      />
      <div/>
      <button onClick={createPost}>Create Post</button>
      </Box>
      {
        posts.map(post => (
          <div key={post.id}>
          <Box>
            <p>Module code : {post.ModuleCode}</p>
            <p>Searching for {post.MemberNo} member(s)</p>
            <p>Preferred Partner Workstyle: {post.WorkStylePref}</p>
            </Box>
          </div>
        ))
      } 
    </div>
  );
}
export default FindingGroupmates;