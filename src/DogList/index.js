import React from 'react'
import { Card } from 'semantic-ui-react'
// look at: https://react.semantic-ui.com/views/card/

function DogList(props) {

	let colors = ["red","orange","yellow","olive","green","teal","blue","violet","purple","pink","brown","grey","black"]
	const dogs = props.dogs.map((dog) => {
		let color = colors[Math.floor(Math.random() * colors.length-1)]
		return( 
		<Card key={dog.id} centered={true} color={color}>
			<Card.Content>
				<Card.Header>
					{dog.name}
				</Card.Header>
				<Card.Description>
					{
						// previously dog.owner was a string, now it's an object created on register.
					}

					{dog.name} is a {dog.breed} that belong to {dog.owner.username}
				</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<button onClick={() => props.deleteDog(dog.id)}>Delete Dog</button>
				<button onClick={() => props.editDog(dog.id)}>Edit Dog</button>
			</Card.Content>
		</Card>
		)
	})

	return(
		<Card.Group stackable={true} itemsPerRow={3}>
			{dogs}
		</Card.Group>
	)
}

export default DogList