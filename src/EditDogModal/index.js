import React from 'react'
import { Form, Button, Label, Modal, Header } from 'semantic-ui-react'
// let's make our edit modal nice using semantics-ui-react
// https://react.semantic-ui.com/modules/modal/

function EditDogModal(props) {

		return(
			<Modal open={props.open} closeIcon onClose={props.closeModal}>
				<Header>Edit Dog</Header>
				<Modal.Content>
					<Form onSubmit={props.handleSubmitEditForm}>
						<Label>Name:</Label>
						<Form.Input
							type="text"
							name="name"
							value={props.dogToEdit.name}
							placeholder="Enter New Name"
							onChange={props.handleEditChange}
						/>
						<Label>Owner:</Label>
						<Form.Input
							type="text"
							name="owner"
							value={props.dogToEdit.owner}
							placeholder="Enter New Owner"
							onChange={props.handleEditChange}
						/>
						<Label>Breed:</Label>
						<Form.Input
							type="text"
							name="breed"
							value={props.dogToEdit.breed}
							placeholder="Enter New Breed"
							onChange={props.handleEditChange}
						/>
						<Modal.Actions>
							<Button color={'green'} type="Submit">Update Dog</Button>
						</Modal.Actions>	
					</Form>
				</Modal.Content>
			</Modal>
		)
}

export default EditDogModal