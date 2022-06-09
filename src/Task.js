import './App.css';
import { useState, useEffect } from 'react'
import { supabase } from './client'

function Task() {
  const [posts, setPosts] = useState([])
  const [post, setPost] = useState({ ModuleCode: "", MemberNo: "", WorkStylePref: ""})
  const { ModuleCode, MemberNo, WorkStylePref } = post
  const [profiles, setProfiles] = useState([])
  const [profile, setProfile] = useState({ Major: "", StudyYear: "", OwnWorkStyle: "", AvailDays: ""})
  const { Major, StudyYear, OwnWorkStyle, AvailDays } = profile
  useEffect(() => {
    fetchPosts()
  }, []) // call fetchpost function when application loads
  useEffect(() => {
    fetchProfiles()
  }, [])
  async function fetchPosts() {
    const { data } = await supabase
        .from('posts')
        .select() //select all posts
      setPosts(data)
      console.log("data: ", data) // to check how the data looks like
  }
  async function fetchProfiles() {
    const { data } = await supabase
        .from('profile')
        .select() //select all profiles
      setProfiles(data)
      console.log("data: ", data) // to check how the data looks like
  }

  async function createProfile() {
    await supabase
      .from('profile')
      .insert([
        { Major, StudyYear, OwnWorkStyle, AvailDays }
      ])
      .single()
    setProfile({ Major: "", StudyYear: "", OwnWorkStyle: "", AvailDays: "" })
    fetchProfiles()
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
      <input
        placeholder="ModuleCode"
        value={ModuleCode} 
        onChange={e => setPost({ ...post, ModuleCode: e.target.value})}
        //onchange handler as the user types
      />
      <input
        placeholder="MemberNo"
        value={MemberNo}
        onChange={e => setPost({ ...post, MemberNo: e.target.value})}
      />
      <input
        placeholder="WorkStylePref"
        value={WorkStylePref}
        onChange={e => setPost({ ...post, WorkStylePref: e.target.value})}
      />
      <button onClick={createPost}>Create Post</button>
      {
        posts.map(post => (
          <div key={post.id}>
            <h3>{post.ModuleCode}</h3>
            <p>{post.MemberNo}</p>
            <p>{post.WorkStylePref}</p>
          </div>
        ))
      } 

      <input
        placeholder="Major"
        value={Major} 
        onChange={e => setProfile({ ...profile, Major: e.target.value})}
        //onchange handler as the user types
      />
      <input
        placeholder="StudyYear"
        value={StudyYear} 
        onChange={e => setProfile({ ...profile, StudyYear: e.target.value})}
        //onchange handler as the user types
      />
      <input
        placeholder="OwnWorkStyle"
        value={OwnWorkStyle} 
        onChange={e => setProfile({ ...profile, OwnWorkStyle: e.target.value})}
        //onchange handler as the user types
      />
      <input
        placeholder="AvailDays"
        value={AvailDays} 
        onChange={e => setProfile({ ...profile, AvailDays: e.target.value})}
        //onchange handler as the user types
      />
      <button onClick={createProfile}>Create Profile</button>
      {
        profiles.map(profile => (
          <div key={profile.id}>
            <h3>{profile.Major}</h3>
            <p>{profile.StudyYear}</p>
            <p>{profile.OwnWorkStyle}</p>
            <p>{profile.AvailDays}</p>
          </div>
        ))
      } 
    </div>
  );
}
export default Task;