import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "../component/Navbar";
import Profile from "./Profile";
import FindingGroupmates from "./FindingGroupmates";
import '../App.css';
//import Task from './Task';

function Home() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Profile} />
        <Route path="/FindingGroupmates" component={FindingGroupmates} />
      </Switch>
    </Router>
  );
}
export default Home;