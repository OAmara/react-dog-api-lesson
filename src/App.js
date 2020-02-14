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

	register = async (registerInfo) => {
		console.log('register() in App.js called with the following info', registerInfo);
		// const url = process.env.REACT_APP_URL + '/api/v1/users/register'		
		// const registerResponse = await fetch(url, {
		// 	method: 'POST',
		// 	body: .json()
		// })
	}

	login = async (loginInfo) => {
		console.log('login() in App.js called with the following info', loginInfo);
	}

	render() {
  		// console.log(process.env);
		return (
		    <div className="App">
			    <h1>Dawgs</h1>
			    { 
				    this.state.loggedIn 
				    ? 
				    <DogContainer /> 
				    : 
				    <LoginRegisterForm 
				    	register={this.register}
				    	login={this.login}
				    />
				}
		    </div>
		);
	}
}

export default App;
