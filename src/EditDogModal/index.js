import React, { Component } from 'react'
import { Form, Button, Label, Modal, Header } from 'semantic-ui-react'
// let's make our edit modal nice using semantics-ui-react
// https://react.semantic-ui.com/modules/modal/

class EditDogModal extends Component {

	constructor(props) {
		super(props)

		this.state = {
			name: '',
			owner: '',
			breed: '',
		}
	}

	componentDidMount() {
		// notice -- in DogContainer -- we sre rendering EditDogModal all the time instead of
		// conditionally. so 2 problems:
		// it 'mounts' even when it isn't showing
		// componentDidMount no longer fires when we re-open it
		// this means our form is empty
		this.setState({
			name: this.props.dogToEdit.name,
			owner: this.props.dogToEdit.owner,
			breed: this.props.dogToEdit.breed,
		})
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})	
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.updateDog(this.state)
	}

	render() {
		return(
			<Modal open={this.props.open} closeIcon onClose={this.props.closeModal}>
				<Header>Edit Dog</Header>
				<Modal.Content>
					<Form onSubmit={this.handleSubmit}>
						<Label>Name:</Label>
						<Form.Input
							type="text"
							name="name"
							value={this.state.name}
							placeholder="Enter New Name"
							onChange={this.handleChange}
						/>
						<Label>Owner:</Label>
						<Form.Input
							type="text"
							name="owner"
							value={this.state.owner}
							placeholder="Enter New Owner"
							onChange={this.handleChange}
						/>
						<Label>Breed:</Label>
						<Form.Input
							type="text"
							name="breed"
							value={this.state.breed}
							placeholder="Enter New Breed"
							onChange={this.handleChange}
						/>
						<Modal.Actions>
							<Button color={'green'} type="Submit">Update Dog</Button>
						</Modal.Actions>	
					</Form>
				</Modal.Content>
			</Modal>
		)
	}
}

export default EditDogModal