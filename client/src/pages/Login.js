// should we move this to a component? Alex
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
// import sha256 from 'js-sha256';
//import Container from '../components/Container/Container';
import './Login.css'

class LoginForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			redirectTo: null
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit(event) {
		event.preventDefault()
		console.log('handleSubmit')
		this.props._login(this.state.username, this.state.password, this)
		this.setState({
			username: '',
			password: '',
		})
	}

	// state set only when this function is called, which is after _login succeeds
	success(){
		console.log("we did it");
		this.setState({ redirectTo: '/nav' })
	}

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
		
			return (
				<div className="LoginForm">
					<form>
						<div id = "getUser">
							<label htmlFor="username">Username: </label>
							<input
								type="text"
								name="username"
								value={this.state.username}
								onChange={this.handleChange}
							/>
						</div>
						<div id ="password">
							<label htmlFor="password">Password: </label>
							<input
								type="password"
								name="password"
								value={this.state.password}
								onChange={this.handleChange}
							/>
						</div>
					
						<button className ="btn btn-secondary" id ="login_button" onClick={this.handleSubmit}>Login</button>
					</form>
				</div>

			)
		}
	}
}

export default LoginForm
