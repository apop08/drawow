import React, {Component} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import About from "./pages/LoginPage";
// import Game from "./pages/Game";
// import Rank from "./pages/Rank";
//import Profile from "./pages/Profile";
import Nav from "./pages/Nav";
import NoMatch from "./pages/NoMatch";
import Canvas from "./components/Canvas"
import axios from "axios";
// Set up the router
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: null
    };

    this._logout = this._logout.bind(this);
	this._login = this._login.bind(this);
	this._register = this._register.bind(this);
  }

	componentDidMount() {
		axios.get('/auth/user').then(response => {
			console.log(response.data)
			if (!!response.data.user) {
				console.log('THERE IS A USER')
				this.setState({
					loggedIn: true,
					user: response.data.user
				})
			} else {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_logout(event) {
		event.preventDefault()
		console.log('logging out')
		axios.post('/auth/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_login(username, password) {
		axios
			.post('/auth/login', {
				username,
				password
			})
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					// update the state
					this.setState({
						loggedIn: true,
						user: response.data.user
					})
				}
			})
	}

	_register(username, email, password) {
		axios
			.post('/auth/register', {
				username,
				email,
				password
			})
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					// update the state
					this._login(username, password)
				}
			})
	}
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/" exact render={(props) => <LoginPage {...props} _login={this._login} _register={this._register} />}></Route>
            <Route path="/about" exact component={About}></Route>
			<Route path="/nav" exact component={Nav}></Route>
            {/* <Route path="/game" exact component={Game}></Route> */}
            {/* <Route path="/rank" exact component={Rank}></Route> */}
            {/* <Route path ="/profile" exact component={Profile}></Route> */}
            <Route path="/test/canvas" exact component={Canvas}></Route>
            <Route component={NoMatch}></Route>
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;

