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
    const session = supabase.auth.session()

    useEffect(() => {
        fetchAcceptedPosts()
        fetchOfferPosts()
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
        console.log(data)
        setOfferPosts(data)
    }
    return (
        <div>
        <h1>Your Projects</h1>

        <h2>Active Projects</h2>
        {acceptedPosts.map((acceptedPost) => (
            <diiv>
                <Box>
                    <p><strong>Module Code:</strong> {acceptedPost.ModuleCode}</p>
                    <p><strong>Number of Groupmates</strong> (including yourself): <strong>{acceptedPost.AcceptUserIds.length + 1} </strong> member(s)</p>
                    <Link style={{ textDecoration: 'none' }} to={{
                        pathname: "/YourProjects/ViewGroupmatesProfile(s)", 
                        state: {PostId: acceptedPost.id}
                    }}>
                        <Button size="small" variant="contained" startIcon={<IconUser />}>View Profile(s) of Groupmates</Button>
                    </Link>
                </Box>
            </diiv>
        ))}

        <h2>Pending Projects</h2>

        </div>
    )
}

export default YourProjects