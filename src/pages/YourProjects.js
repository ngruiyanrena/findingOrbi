import '../App.css';
import { useState, useEffect } from 'react'
import { supabase } from '../client';
import Box from "../component/Box";
import { Button } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { IconUser } from "@supabase/ui";

function YourProjects() {
    const [acceptedPosts, setAcceptedPosts] = useState([])
    const [offerPosts, setOfferPosts] = useState([])
    const [yourPosts, setYourPosts] = useState([])
    const session = supabase.auth.session()

    useEffect(() => {
        fetchAcceptedPosts()
        fetchOfferPosts()
        fetchYourPosts()
    }, [])

    async function fetchAcceptedPosts() {
        const { data } = await supabase
            .from('posts')
            .select('*')
            .contains('AcceptUserIds', [session.user.id]) 
        setAcceptedPosts(data)
    }

    async function fetchOfferPosts() {
        const { data } = await supabase
            .from('posts')
            .select('*')
            .contains('OffersUserIds', [session.user.id]) 
        setOfferPosts(data)
    }

    async function fetchYourPosts() {
        const { data } = await supabase
            .from('posts')
            .select('*') 
            .eq('UserId', session.user.id) 
        setYourPosts(data)
    }

    return (
        <div style={{minheight: "100vh"}}>
        <h1>Your Projects</h1>

        <h2>Active Projects</h2>
        {acceptedPosts.map((acceptedPost) => (
            <div key={acceptedPost.id}> 
                <Box>
                    <p><strong>Module Code:</strong> {acceptedPost.ModuleCode}</p>
                    <p><strong>Current Number of Groupmates</strong> (including yourself): <strong>{acceptedPost.AcceptUserIds.length + 1} </strong> member(s)</p>
                    <Link style={{ textDecoration: 'none' }} to={{
                        pathname: "/YourProjects/ViewGroupmatesProfiles", 
                        state: {UserId: acceptedPost.UserId, PostId: acceptedPost.id}
                    }}>
                        <Button size="small" variant="contained" startIcon={<IconUser />}>View Profile(s) of Groupmates</Button>
                    </Link>
                </Box>
            </div>
        ))}
        {yourPosts.map((yourPost) => (
            <div key={yourPost.id}> 
                <Box>
                    <p><strong>Module Code:</strong> {yourPost.ModuleCode}</p>
                    <p><strong>Current Number of Groupmates</strong> (including yourself): <strong>{yourPost.AcceptUserIds.length + 1} </strong> member(s)</p>
                    <Link style={{ textDecoration: 'none' }} to={{
                        pathname: "/YourProjects/ViewGroupmatesProfiles", 
                        state: {UserId: yourPost.UserId, PostId: yourPost.id}
                    }}>
                        <Button size="small" variant="contained" startIcon={<IconUser />}>View Profile(s) of Groupmates</Button>
                    </Link>
                </Box>
            </div>
        ))}


        <h2>Pending Projects</h2>
        {offerPosts.map((offerPost) => (
            <div key={offerPost.id}> 
                <Box>
                    <p><strong>Module Code:</strong> {offerPost.ModuleCode}</p>
                    <p><strong>Number of Accepted Groupmates</strong> : <strong>{offerPost.AcceptUserIds.length + 1} </strong> member(s)</p>
                    <Link style={{ textDecoration: 'none' }} to={{
                        pathname: "/YourProjects/ViewProfile", 
                        state: {UserId: offerPost.UserId, PostId: offerPost.id}
                    }}>
                        <Button size="small" variant="contained" startIcon={<IconUser />}>View Profile(s)</Button>
                    </Link>
                </Box>
            </div>
        ))}

        </div>
    )
}

export default YourProjects