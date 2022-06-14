import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "../component/Navbar";
import FindingGroupmates from "./FindingGroupmates";
import AboutUs from "./AboutUs";
import '../App.css';
import Account from './Account'
import EditAccount from './EditAccount'
import Home3 from './Home3'
import YourPosts from './YourPosts'
import ViewProfile from "./ViewProfile";

function Home() {

  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Home3} />
        <Route exact path="/Account" component={Account} />
        <Route exact path="/EditAccount" component={EditAccount} />
        <Route exact path="/FindingGroupmates" component={FindingGroupmates} />
        <Route exact path="/YourPosts" component={YourPosts} />
        <Route exact path="/AboutUs" component={AboutUs} />
        <Route path="/FindingGroupmates/ViewProfile" component={ViewProfile} />
      </Switch>
    </Router>
  );
}
export default Home;
