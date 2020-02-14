import React, { Component } from 'react'
import { Form, Button, Label } from 'semantic-ui-react'
 import './index.css'

class LoginRegisterForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			email: '',
			password: '',
			username: '',
			action: 'login', // login or register
		}
	}

	switchForm = () => {
		if(this.state.action === 'login') {
			this.setState({ action: 'register' })
		} else {
			this.setState({ action: 'login' })
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		console.log(`You are trying to ${this.state.action}, with the following credentials`);
		console.log(this.state);
	}

	render() {
		// TODO: Add form validation code
		// Highlight blank fields in red and show an error message below them -- username requried, etc
		// BONUS TODO: use RegExp to improse requirements on password! --> (professionals do this)
		return(
			<div className='LoginRegisterForm'>
				<h2 className='LoginRegisterForm-h2'>{this.state.action + ' here'}</h2>
				<Form onSubmit={this.handleSubmit}>
				{
					// only show username field if they are registering
					// bc our back end only uses email
					this.state.action === 'register'
					?
					<React.Fragment>
						<Label>Username:</Label>
						<Form.Input
							type='text'
							name='username'
							value={this.state.username}
							placeholder='Desired Username'
							onChange={this.handleChange}
						/>
					</React.Fragment>
					:
					null
				}
					<Label>Email:</Label>
					<Form.Input
						type='text'
						name='email'
						value={this.state.email}
						placeholder='Your Email'
						onChange={this.handleChange}
					/>


					<Label>Password:</Label>
					<Form.Input
						type='text'
						name='password'
						value={this.state.password}
						placeholder='Password'
						onChange={this.handleChange}
					/>
					<Button color={'teal'} type='Submit'>Log In</Button>
				</Form>
				{
					this.state.action === 'register'
					?
					// they see this on register screen
					<small>Already have an account? Log In <span className='fake-link' onClick={this.switchForm}>Here </span></small>
					:
					// And this on login screen
					<small>Need an account? Sign up <span className='fake-link' onClick={this.switchForm}>Here </span>!</small>
				}
			</div>
		)
	}
}

export default LoginRegisterForm