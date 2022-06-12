import React from "react";
import './App.css';
import Home1 from "./pages/Home1";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App" style={{
      backgroundColor: "rgb(238, 219, 248)"}}>
      <Router> 
        <Switch>
          <Route path="/" component={Home1} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
