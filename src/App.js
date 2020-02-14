import React, { Component } from 'react';
import './App.css';
import DogContainer from './DogContainer'
import LoginRegisterForm from './LoginRegisterForm'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loggedIn: false,
			loggedInUserEmail: null, // might be helpful to track
		}
	}
	render() {
  		// console.log(process.env);
		return (
		    <div className="App">
			    <h1>Dogs</h1>
			    { this.state.loggedIn ? <DogContainer /> : <LoginRegisterForm />}
		    </div>
		);
	}
}

export default App;
