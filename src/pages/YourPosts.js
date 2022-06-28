import { useState, useEffect } from 'react'
import { supabase } from '../client'
import Box from "../component/Box";
import { Button } from "@material-ui/core";
import { Input } from "@supabase/ui";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';

import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { Link } from 'react-router-dom';
import { IconUser } from "@supabase/ui";

function YourPosts() {
    // const session = supabase.auth.session()
    const user = supabase.auth.user()
    const [posts, setPosts] = useState([])
    const [post, setPost] = useState({ ModuleCode: "", MemberNo: "", WorkStylePref1: "", WorkStylePref2: "", WorkStylePref3: "", WorkStylePref4: "", WorkStylePref5: "", UserId: user.id})
    const { ModuleCode, MemberNo, WorkStylePref1, WorkStylePref2, WorkStylePref3, WorkStylePref4, WorkStylePref5, UserId } = post 

    useEffect(() => {
        fetchPosts()
      }, [])

    async function fetchPosts() {
        const { data } = await supabase
            .from('posts')
            .select('*') 
            .eq('UserId', user.id) 
        setPosts(data)
    }

    function refreshPage() {
        window.location.reload(false);
      }

    async function createPost() {
        await supabase
            .from('posts') //insert individual post input by the user
            .insert([
            { ModuleCode, MemberNo, WorkStylePref1, WorkStylePref2, WorkStylePref3, WorkStylePref4, WorkStylePref5, UserId} 
            ])
            .single()
        setPost({ ModuleCode: "", WorkStylePref1: "", WorkStylePref2: "", WorkStylePref3: "", WorkStylePref4: "", WorkStylePref5: "", MemberNo: "", UserId: user.id}) 
        // setpost for once post created call setpost to reset the form fields
        fetchPosts() 
        //fetchpost to update the ui with the new post
    }

    async function deletePost(post) {
        await supabase
            .from('posts')
            .delete()
            .eq('id', post.id)
        fetchPosts()
    }

    async function finalclick() {
        createPost();
        resetRadioState1();
        resetRadioState2();
        resetRadioState3();
        resetRadioState4();
        resetRadioState5();
    }

    const [q1, setq1] = useState('')
    const handleChange1 = (event) => {
        setq1(event.target.value)
    }
    async function resetRadioState1() {
        setq1('');
    }

    const [q2, setq2] = useState('')
    const handleChange2 = (event) => {
        setq2(event.target.value)
    }
    async function resetRadioState2() {
        setq2('');
    }

    const [q3, setq3] = useState('')
    const handleChange3 = (event) => {
        setq3(event.target.value)
    }
    async function resetRadioState3() {
        setq3('');
    }

    const [q4, setq4] = useState('')
    const handleChange4 = (event) => {
        setq4(event.target.value)
    }
    async function resetRadioState4() {
        setq4('');
    }

    const [q5, setq5] = useState('')
    const handleChange5 = (event) => {
        setq5(event.target.value)
    }
    async function resetRadioState5() {
        setq5('');
    }

    return (
        <div> 
            <h1>Your Posts</h1>

            <Box>
                <h2> New Post </h2>

                <h4 align='left'> Module Code: </h4>
                <Input
                    placeholder="eg. CS2030"
                    value={ModuleCode} 
                    onChange={e => setPost({ ...post, ModuleCode: e.target.value})}
                />
                <div/>
            
                <h4 align='left'> Working Style Preference: </h4>
                <FormControl>
                    <RadioGroup
                    row
                    onChange={e => setPost({ ...post, WorkStylePref1: e.target.value})}
                    >
                    <FormControlLabel value="Team Member" control={<Radio />} label="Team Member" onChange={handleChange1} checked={q1 === 'Team Member'}/>
                    <FormControlLabel value="Team Leader" control={<Radio />} label="Team Leader" onChange={handleChange1} checked={q1 === 'Team Leader'}/>
                
                    </RadioGroup>
                    <RadioGroup
                    row
                    onChange={e => setPost({ ...post, WorkStylePref2: e.target.value})}
                    >
                    <FormControlLabel value="Supportive" control={<Radio />} label="Supportive" onChange={handleChange2} checked={q2 === 'Supportive'}/>
                    <FormControlLabel value="Take Charge" control={<Radio />} label="Take Charge" onChange={handleChange2} checked={q2 === 'Take Charge'}/>
                    </RadioGroup>
                    <RadioGroup
                    row
                    onChange={e => setPost({ ...post, WorkStylePref3: e.target.value})}
                    >
                    <FormControlLabel value="Organised" control={<Radio />} label="Organised" onChange={handleChange3} checked={q3 === 'Organised'}/>
                    <FormControlLabel value="Spontaneous" control={<Radio />} label="Spontaneous" onChange={handleChange3} checked={q3 === 'Spontaneous'}/>
                    </RadioGroup>
                    <RadioGroup
                    row
                    onChange={e => setPost({ ...post, WorkStylePref4: e.target.value})}
                    >
                    <FormControlLabel value="Detail Oriented" control={<Radio />} label="Detail Oriented" onChange={handleChange4} checked={q4 === 'Detail Oriented'}/>
                    <FormControlLabel value="Broad Perspective" control={<Radio />} label="Broad Perspective" onChange={handleChange4} checked={q4 === 'Broad Perspective'}/>
                    </RadioGroup>
                    <RadioGroup
                    row
                    onChange={e => setPost({ ...post, WorkStylePref5: e.target.value})}
                    >
                    <FormControlLabel value="Creative" control={<Radio />} label="Creative" onChange={handleChange5} checked={q5 === 'Creative'}/>
                    <FormControlLabel value="Strategic" control={<Radio />} label="Strategic" onChange={handleChange5} checked={q5 === 'Strategic'}/>
                    </RadioGroup>
                </FormControl>
                <div/>
                <h4 align='left'> Number of members searching for: </h4>
                <Input
                    placeholder="eg. 2"
                    descriptionText=' '
                    value={MemberNo}
                    onChange={e => setPost({ ...post, MemberNo: e.target.value})}
                />
                <div/>
                <Button variant="contained" endIcon={<SendIcon />} onClick={finalclick}>Create Post</Button>
            </Box>

            {posts.map((post) => (
                <div>
                    <Box>
                        <p><strong>Module code:</strong> {post.ModuleCode}</p>
                        <p>Searching for <strong>{post.MemberNo}</strong> member(s)</p>
                        <p><strong>Preferred Partner Working Style:</strong> {post.WorkStylePref1}, {post.WorkStylePref2}, {post.WorkStylePref3}, {post.WorkStylePref4}, {post.WorkStylePref5}</p>
                        <Button onClick={() => deletePost(post)} size="small" variant="outlined" startIcon={<DeleteIcon />}>Delete</Button>
                        
                        <p><strong>Pending Offers:</strong></p>
                        {/* for loop to go through the array of post.OffersUserIds */}
                        {/* <Link style={{ textDecoration: 'none' }} to={{
                            pathname: "/YourPosts/ViewOfferProfile", 
                            state: {UserId: post.UserId}
                        }}>
                            <Button size="small" variant="contained" startIcon={<IconUser />}>View Profile</Button>
                        </Link> */}
                    </Box>
                </div>
            ))}

        </div>
    )
}

export default YourPosts
