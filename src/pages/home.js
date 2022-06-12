import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "../component/Navbar";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import FindingGroupmates from "./FindingGroupmates";
import AboutUs from "./AboutUs";
import '../App.css';
//import Task from './Task';
import Home1 from "./Home1";
import Login from './Login'
import SignUp from './SignUp'

function Home() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" component={Home1} />
        <Route path="/Login" component={Login} />
        <Route path="/SignUp" component={SignUp} />
        <Route exact path="/Profile" component={Profile} />
        <Route exact path="/EditProfile" component={EditProfile} />
        <Route path="/FindingGroupmates" component={FindingGroupmates} />
        <Route path="/AboutUs" component={AboutUs} />
      </Switch>
    </Router>
  );
}
export default Home;