import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
// import sha256 from 'js-sha256';

class Signup extends Component {
    constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
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
		
		// TODO - validate!
		axios
			.post('/auth/signup', {
				username: this.state.username,
				password: this.state.password
			})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('youre good')
					this.setState({
						redirectTo: '/login'
					})
				} else {
					console.log('duplicate')
				}
			})
		// this.props._login(this.state.username, this.state.email, sha256(this.state.password))
		// this.setState({ redirectTo: '/nav'})
	}

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
			
					<div className="SignupForm">
						<h1>Signup form</h1>
						<label htmlFor="username">Username: </label>
						<input
							type="text"
							name="username"
							value={this.state.username}
							onChange={this.handleChange}
						/>
						<label htmlFor="password">Password: </label>
						<input
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.handleChange}
						/>
						<label htmlFor="confirmPassword">Confirm Password: </label>
						<input
							type="password"
							name="confirmPassword"
							value={this.state.confirmPassword}
							onChange={this.handleChange}
						/>
						<button onClick={this.handleSubmit}>Sign up</button>
					</div>
				
			)
		}
    }
}

    export default Signup
