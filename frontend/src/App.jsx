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

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </Router>
  )
}

export default App
