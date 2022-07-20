import '../App.css';
import { useState, useEffect } from 'react'
import { supabase } from '../client'
import { IconSearch, Input } from "@supabase/ui";
import { Link } from 'react-router-dom';
import { Grid, Card, Select, MenuItem, InputLabel, FormControl, CardActionArea } from "@material-ui/core";


function FindingGroupmates() {
  const [posts, setPosts] = useState([])
  const [query, setQuery] = useState("")
  const [workingStyle1, setWorkingStyle1] = useState("")
  const [workingStyle2, setWorkingStyle2] = useState("")
  const [workingStyle3, setWorkingStyle3] = useState("")
  const [workingStyle4, setWorkingStyle4] = useState("")
  const [workingStyle5, setWorkingStyle5] = useState("")
  
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
      <Grid container spacing={2}>
      <Grid item xs={12}>
      <Card style={{padding:"10px", marginLeft: "10%", marginRight: "10%" }}> 
        <h1>Search And Filter</h1>
        <div style={{margin: "auto"}}>
          <Input 
            placeholder="Search Module Code here" 
            onChange={event => setQuery(event.target.value)}
            icon={<IconSearch />}
          />
          <h1> </h1>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
          <FormControl style={{width: "25%"}}>
            <InputLabel id="WorkingStyle1Select">Team Member/Team Leader</InputLabel>
            <Select
              labelId="WorkingStyle1Select"
              id="WorkingStyle1Select"
              value={workingStyle1}
              label="Team Member/Team Leader"
              onChange={(e) => setWorkingStyle1(e.target.value)}
            >
              <MenuItem value={"Team Member"}>Team Member</MenuItem>
              <MenuItem value={"Team Leader"}>Team Leader</MenuItem>
              <MenuItem value={""}>None</MenuItem>
            </Select>
          </FormControl>
          <FormControl style={{width: "25%"}}>
            <InputLabel id="WorkingStyle2Select">Supportive/Take Charge</InputLabel>
            <Select
              labelId="WorkingStyle2Select"
              id="WorkingStyle2Select"
              value={workingStyle2}
              label="Supportive/Take Charge"
              onChange={(e) => setWorkingStyle2(e.target.value)}
            >
              <MenuItem value={"Supportive"}>Supportive</MenuItem>
              <MenuItem value={"Take Charge"}>Take Charge</MenuItem>
              <MenuItem value={""}>None</MenuItem>
            </Select>
          </FormControl>  
          <FormControl style={{width: "25%"}}>
            <InputLabel id="WorkingStyle3Select">Organised / Spontaneous</InputLabel>
            <Select
              labelId="WorkingStyle3Select"
              id="WorkingStyle3Select"
              value={workingStyle3}
              label="Organised / Spontaneous"
              onChange={(e) => setWorkingStyle3(e.target.value)}
            >
              <MenuItem value={"Organised"}>Organised</MenuItem>
              <MenuItem value={"Spontaneous"}>Spontaneous</MenuItem>
              <MenuItem value={""}>None</MenuItem>
            </Select>
          </FormControl>  
          </div>
          <div style={{ display: "flex", justifyContent: "space-around", marginTop: "5px" }}>
            <FormControl style={{width: "30%"}}>
              <InputLabel id="WorkingStyle4Select">Detail Oriented / Broad Perspective</InputLabel>
              <Select
                labelId="WorkingStyle4Select"
                id="WorkingStyle4Select"
                value={workingStyle4}
                label="Detail Oriented / Broad Perspective"
                onChange={(e) => setWorkingStyle4(e.target.value)}
              >
                <MenuItem value={"Detail Oriented"}>Detail Oriented</MenuItem>
                <MenuItem value={"Broad Perspective"}>Broad Perspective</MenuItem>
                <MenuItem value={""}>None</MenuItem>
              </Select>
            </FormControl>  
            <FormControl style={{width: "30%"}}>
              <InputLabel id="WorkingStyle5Select">Creative / Strategic</InputLabel>
              <Select
                labelId="WorkingStyle5Select"
                id="WorkingStyle5Select"
                value={workingStyle5}
                label="Creative / Strategic"
                onChange={(e) => setWorkingStyle5(e.target.value)}
              >
                <MenuItem value={"Creative"}>Creative</MenuItem>
                <MenuItem value={"Strategic"}>Strategic</MenuItem>
                <MenuItem value={""}>None</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </Card>
      </Grid>
      

      <Grid item xs={12}>
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
          <div key={post.id} style={{width:"100%"}}>
            <Link style={{ textDecoration: 'none' }} to={{
                pathname: "/FindingGroupmates/ViewProfile", 
                state: {UserId: post.UserId, PostId: post.id}
              }}>
              <Card style={{padding: "10px", marginLeft: "10%", marginRight: "10%", marginBottom: "1%", height: "10rem"}}>
                <CardActionArea style={{height: "100%"}}>
                  <h2><strong>Module code:</strong> {post.ModuleCode}</h2>
                  <p>Searching for <strong>{post.MemberNo}</strong> member(s)</p>
                  <p><strong>Preferred Partner Working Style:</strong> {post.WorkStylePref1}, {post.WorkStylePref2}, {post.WorkStylePref3}, {post.WorkStylePref4}, {post.WorkStylePref5}</p>
                </CardActionArea>
              </Card>
            </Link>
          </div>
      ))} 
      </Grid>
    </Grid>
    </div>
  );
}

export default FindingGroupmates;

