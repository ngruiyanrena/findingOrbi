import { useState, useEffect } from 'react';
import { supabase } from '../client';
import * as React from 'react';
import Box from "../component/Box";
import {Link, useLocation } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';

function Review() {
    const [reviews, setReviews] = useState([])
    const { userid } = useLocation().state;

    useEffect(() => {
        fetchReviews()
      }, [])

    async function fetchReviews() {
        const { data } = await supabase
            .from('reviews')
            .select('*') 
            .eq('reviewee', userid) 
        setReviews(data)
    }
    return (
      <div>
      <h1>Reviews: </h1>
      {reviews.filter(review => {
          return review;
        }).map((review, id) => (
          <div key={review.id}>
            <Box>
            <Rating name="read-only" value={review.rate} readOnly />
              <p><strong>Module Code:</strong> {review.moduleCode}</p>
              <p><strong>Feedback:</strong> {review.content}</p>
            </Box>
        </div>
            ))} 
            {/* <div> 
                <Link to="/Account" style={{ textDecoration: 'none' }}>
                  <Button variant="contained">Return to Profile</Button>
                </Link>
              </div> */}
      </div>
    );
  }
  export default Review;
  