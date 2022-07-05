import '../App.css';
import Box from "../component/Box";
import { useState, useEffect } from 'react';
import { Input } from "@supabase/ui";
import { Button } from "@material-ui/core";
import * as React from 'react';
import { supabase } from '../client'
import { Container, Radio, Rating } from "../component/RatingStyles";
import { FaStar } from "react-icons/fa";
//import StarRating from 'react-star-rating';



function Reviews() {
    const [review, setReview] = useState({ moduleCode: "", content: "", rate: 0})
    const { moduleCode, content, rate } = review 

    async function createreview() {
        const {data, error} = await supabase
            .from('reviews') //insert individual post input by the user
            .insert([
            {moduleCode, content, rate} 
            ])
            .single()
            console.log(error)
        setReview({moduleCode: "", content:"" , rate:0})
        }

    return (
        <div style={{height: "100vh"}}>
        
        <h1>Submit a Review</h1>
        {" "}
        <Box>
       
        <h4 align='left'> Module Code of the project worked on: </h4>
        <Input
                    placeholder="eg: CS2030"
                    value={moduleCode} 
                    onChange={e => setReview({ ...review, moduleCode: e.target.value})}
                />
        <h2> Please type a review for your groupmate below: </h2>
        <Container>
        
        {[...Array(5)].map((item, index) => {
		const givenRating = index + 1;
		return (
		<label>
			<Radio
			type="radio"
			value={givenRating}
			onClick={() => {
				setReview({ ...review, rate: givenRating})
				alert(`Are you sure you want to give ${givenRating} stars ?`);
			}}
			/>
			<Rating>
			<FaStar
				color={
				givenRating < rate || givenRating === rate
					? "000"
					: "rgb(192,192,192)"
				}
			/>
			</Rating>
		</label>
		);
	})}
	</Container>

        <Input
                    placeholder="eg: Great groupmate! Would love to work together again"
                    value={content} 
                    onChange={e => setReview({...review,  content: e.target.value})}
                />
            
                <h1></h1>
                <Button variant="contained" onClick={() => createreview()}>Create Post</Button>
        </Box>
        

        </div>
    )
}

export default Reviews