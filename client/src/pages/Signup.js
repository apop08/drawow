import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

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
