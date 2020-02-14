import React, { Component } from 'react'
import DogList from '../DogList'
import NewDogForm from '../NewDogForm'
import EditDogModal from '../EditDogModal'

class DogContainer extends Component {

	constructor(props) {
		super(props)

		this.state = {
			dogs: [],
			editModalOpen: false,
			// this will be the data we are editing eith the form in the modal
			dogToEdit: {
				name: '',
				breed: '',
				id: '',
			}
		}
	}

	// component lifecycle methods should always be defined as class methods
	componentDidMount() {
		// get the dogs when the component mounts
		this.getDogs()
	}

	getDogs = async () => {
		try {
			// for development, URL is local:
			// REACT_APP_API_URL=http://localhost:8000 --> placed in .env.development
			const dogsResponse = await fetch(process.env.REACT_APP_API_URL + "/api/v1/dogs/", {
				// you must send cookie every time for back end to know you are logged in.
				credentials: 'include'
			})
			// logging the results you get back from an API and drilling down into 
			// the object to make sure you are putting the thing you mean to be putting into state is important
			const dogsJson = await dogsResponse.json()
			// console.log('Here is the data we got in getDogs in dogsJson: ', dogsJson);
			this.setState({
				dogs: dogsJson.data
			})
		} catch(err) {
			console.error(err);
		}
	}

	createDog = async (dogToAdd) => {
		console.log('Form Submission', dogToAdd);

		try {
			// customize fetch according to this: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
			// do this by passing in a second arg after the URL --
				// an object containing various configuration
			// so we can send a POST request with JSON as the body
			// request body will be dogToAdd
			// we also need to set a header when we send json header Content-Type: application/json
			const createDogResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/dogs/', {
				credentials: 'include',
				method: 'POST',
				body: JSON.stringify(dogToAdd), // this is how you convert an object to JSON
				headers: {
					'Content-Type': 'application/json'
				}
			})
			// console.log('Here is http response createDogResponse in createDog in DogContainer', createDogResponse);
			const createDogJson = await createDogResponse.json()
			// console.log("Here is what we got when we tried to create a dog in createDog in DogContainer", createDogJson);
			// to reload page to show new dog
			if(createDogResponse.status === 201) {
				// option 1. quic and dirty -- call getDogs
				// -- requires a second fetch call, more time, more brandwidth
				// -- you laready have almost all of the data you need except the new dog

				// this.getDogs()

				// 2. manually add the dog to state -- more elegant, you don't need the 2nd call
				
				// const state = this.state
				// state.dogs.push(createDogJson.data)
				// this.setState(state)

				// 3. another alternative -- use spread operator
				// same as no. 2.
				// ...this.state.dogs means "all the dogs that are already in this array"
				this.setState({
					dogs: [...this.state.dogs, createDogJson.data]
				})
			}
		} catch(err) {
			console.error(err);
		}
	}

	deleteDog = async (id) => {
		try {
			const deleteDogResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/dogs/' + id, {
				credentials: 'include',
				method: 'Delete'
			})
			const deleteDogJson = await deleteDogResponse.json()
			// console.log('Here`s response when we tried to delete a dog', deleteDogJson);

			// we want to remove the dog with this id from the array of dogs in state
			// why? becuase it saves querying data and time: look at create method
			if(deleteDogJson.status === 200) {
				// code like this would work
				// const dogs = this.state.dogs
				// let indexOfDogToDelete = 0
				// for (let i = 0; i< dogs.length; i++) {
				// 	if(dogs[i].id == id) {
				// 		indexOfDogToDelete = i
				// 	}
				// }

				// often in react you will see a pattern like this:
				this.setState({
					dogs: this.state.dogs.filter(dog => dog.id !== id)
				})
			} else {
				// make 200 in if statement a string to look at example of how you can produce/ throw Errors.
				throw new Error("Could not delete dog")
			}

		} catch(err) {
			console.error(err);
		}
	}


	// for modal
	editDog = (idOfDogToEdit) => {
		// console.log('Here`s the id fo the dog to edit', idOfDogToEdit);
		// console.log(this.state.dogs.find((dog) => {
		// 	if(dog.id === idOfDogToEdit) {
		// 		return true
		// 	} else {
		// 		return false
		// 	}
		// }));
		const dogToEdit = this.state.dogs.find((dog) => dog.id === idOfDogToEdit)
		this.setState({
			editModalOpen: true,
			dogToEdit: {
				...dogToEdit
				// the line above is using the spread operator to represent the 4 lines below
				// name: dogToEdit.name,
				// owner: dogToEdit.owner,
				// breed: dogToEdit.breed,
				// id: dogToEdit.id
			}
		})
	}

	handleEditChange = (e) => {
		// this is a 100% awesome way to 
		// const oldDog = this.state.dogToEdit
		// oldDog[e.target.name] = e.target.value
		// this.setState({ dogToEdit: oldDog })	
		
		// often React developers will use fancy new syntax like this to show off!
		this.setState({
			dogToEdit: {
				...this.state.dogToEdit, // copy properties from object in state using spread operator 
				[e.target.name]: e.target.value, // replace the old value for whatever was edited for the new value
			}
		})
	}

	handleSubmitEditForm = (e) => {
		e.preventDefault()
		this.updateDog()
	}
	updateDog = async () => {
		

		// id of dog we need is in state
		const updateDogResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/dogs/' + this.state.dogToEdit.id, 
			{	
				credentials: 'include',
				method: 'PUT',
				body: JSON.stringify(this.state.dogToEdit),
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		// console.log('Here`s the response from fetch in updateDog in DogContainer', updateDogResponse);

		const updateDogJson = await updateDogResponse.json()
		// console.log('Here`s the data', updateDogJson);

		if(updateDogResponse.status === 200) {
			// const dogs = this.state.dogs
			// const indexOfDogToUpdate = this.state.dogs.findIndex(dog => dog.id == this.state.idOfDogToEdit)
			// dogs[indexOfDogToUpdate] = updateDogJson.data
			// this.setState({
			// 	dogs: dogs
			// })

			const newDogArrayWithUpdatedDog = this.state.dogs.map((dog) => {
				if(dog.id === updateDogJson.data.id) {
					return updateDogJson.data
				} else {
					return dog
				}
			})
			this.setState({
				dogs: newDogArrayWithUpdatedDog
			})

			this.closeModal()
		}
	}

	closeModal = () => {
		this.setState({
			editModalOpen: false
		})
	}

	render() {
		// console.log('Here is this.state in render() in DogContainer', this.state);
		return(
			<>
				<DogList 
					dogs={this.state.dogs} 
					deleteDog={this.deleteDog} 
					editDog={this.editDog}
				/>
				<NewDogForm createDog={this.createDog}/>
				<EditDogModal 
					open={this.state.editModalOpen}
					dogToEdit={this.state.dogToEdit}
					updateDog={this.updateDog}
					closeModal={this.closeModal}
					handleEditChange={this.handleEditChange}
					handleSubmitEditForm={this.handleSubmitEditForm}
				/>
			</>
		)
	}
}

export default DogContainer