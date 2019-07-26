import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import './Signup.css'

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
				if (!response.data.error) {
					console.log('youre good')
					this.setState({
						redirectTo: '/nav'
					})
				} else {
					alert("Already signed up. please login")
					console.log('duplicate')
					this.setState({
						redirectTo: '/'
					})
				}
			})
	}

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {

			return (

				<div className="SignupForm">
					<div id = "getUser">
						<label htmlFor="username">Username: </label>
						<input
							className ="signupinput"
							type="text"
							name="username"
							value={this.state.username}
							onChange={this.handleChange}
						/>
					</div>
					<div id ="password">
						<label htmlFor="password">Password: </label>
						<input
							className ="signupinput"
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.handleChange}
						/>
					</div>
					<div id = "confirm">
						<label htmlFor="confirmPassword">Confirm Password: </label>
						<input
							className ="signupinput"
							type="password"
							name="confirmPassword"
							value={this.state.confirmPassword}
							onChange={this.handleChange}
						/>
					</div>

					<button className="btn btn-secondary signup" onClick={this.handleSubmit}>Sign up</button>
				</div>

			)
		}
	}
}

export default Signup
