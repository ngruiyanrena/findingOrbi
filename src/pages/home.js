import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "../component/Navbar";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import FindingGroupmates from "./FindingGroupmates";
import AboutUs from "./AboutUs";
import '../App.css';
//import Task from './Task';
import Login from "./Login";

function Home() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/Profile" component={Profile} />
        <Route exact path="/EditProfile" component={EditProfile} />
        <Route path="/FindingGroupmates" component={FindingGroupmates} />
        <Route path="/AboutUs" component={AboutUs} />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  );
}
export default Home;