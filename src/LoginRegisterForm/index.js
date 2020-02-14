import React, { Component } from 'react'
import { Form, Button, Label } from 'semantic-ui-react'

class LoginRegisterForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			email: '',
			password: '',
			username: '',
		}
	}
	render() {
		return(
			<div className='LoginRegisterForm'>
				<Form>
					<Label>Username:</Label>
					<Form.Input
						type='text'
						name='username'
						value={this.state.username}
					/>
					<Label>Email:</Label>
					<Form.Input
						type='text'
						name='email'
						value={this.state.email}
					/>
					<Label>Password:</Label>
					<Form.Input
						type='text'
						name='password'
						value={this.state.password}
					/>
					<Button type='Submit'>Log In</Button>
				</Form>
			</div>
		)
	}
}

export default LoginRegisterForm