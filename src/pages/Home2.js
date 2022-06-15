import '../index.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './Login'
import SignUp from './SignUp'

function Home2() {

  return (
    <div className="container" style={{ padding: '50px 0 100px 0', height: "100vh"}}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/SignUp" component={SignUp} />
        </Switch>
      </Router>
    </div>
  )
}

export default Home2;