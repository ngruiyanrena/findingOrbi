import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "../component/Navbar";
import FindingGroupmates from "./FindingGroupmates";
import AboutUs from "./AboutUs";
import '../App.css';
import Account from './Account'
import Home3 from './Home3'

function Home() {

  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Home3} />
        <Route path="/Account" component={Account} />
        <Route path="/FindingGroupmates" component={FindingGroupmates} />
        <Route path="/AboutUs" component={AboutUs} />
      </Switch>
    </Router>
  );
}
export default Home;
