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
import NewBots from './Components/app/bots/NewBot'
import ChatBot from './Components/app/bots/ChatBot'
import Error from './Components/404/Error'

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
        <Route exact path="/app/bots/new" component={NewBots} />
        <Route exact path="/bot/:id" component={ChatBot} />

        {/*404 page */}
        <Route exact path="/404" component={Error} />
        <Redirect from="*" to="/404" />
      </Switch>
    </Router>
  )
}

export default App
