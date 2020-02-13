import React, { Component } from 'react'
import { Form, Button, Label, Segment } from 'semantic-ui-react'

class NewDogForm extends Component {

	constructor(props) {
		super(props)
	// cool thing you can do that works!
		this.state = {
			name: '',
			owner: '',
			breed: '',
		}
	}

	handleChange = (e) => {
		// ES6 computed properties syntax or computed property names
		this.setState({
			[e.target.name]: e.target.value
		})	
	}

	handleSubmit = (e) => {
		 e.preventDefault()
		this.props.createDog(this.state)
		this.setState({
			name: '',
			owner: '',
			breed: '',
		})
	}

	render() {
		return(
			<Segment>
				<h4>Add new dog:</h4>
				<Form onSubmit={this.handleSubmit}>
					<Label>Name:</Label>
					<Form.Input
						type='text'
						name='name'
						value={this.state.name}
						onChange={this.handleChange}
					/>
					<Label>Owner:</Label>
					<Form.Input
						type='text'
						name='owner'
						value={this.state.owner}
						onChange={this.handleChange}
					/>
					<Label>Breed:</Label>
					<Form.Input
						type='text'
						name='breed'
						value={this.state.breed}
						onChange={this.handleChange}
					/>
					<Button type="Submit">Create Dog</Button>
				</Form>
			</Segment>
		)
	}
}

export default NewDogForm