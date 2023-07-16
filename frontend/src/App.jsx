import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

//pages
import Login from "./Components/Login-Register/Login"
import Register from "./Components/Login-Register/Register"
import Landing from './Components/Landing/Landing'
import Bots from './Components/app/Bots'
import Billing from './Components/app/Billing'
import Account from './Components/app/Account'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/app/bots" component={Bots} />
        <Route exact path="/app/account" component={Account} />
        <Route exact path="/app/billing" component={Billing} />
      </Switch>
    </Router>
  )
}

export default App
