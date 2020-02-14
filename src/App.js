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

		 const url = process.env.REACT_APP_API_URL + '/api/v1/users/register'	

		 try {
			 const registerResponse = await fetch(url, {
			 	// INCLUDE THIS IN EVERY FETCH CALL
			 	// this will send your cookie, this is done automatically in express servers
			 	// If left out, user will not be authenticated
			 	credentials: 'include', // sneds the cookie
			 	method: 'POST',
			 	body: JSON.stringify(registerInfo),
			 	headers: {
			 		'Content-Type': 'application/json'
			 	}
			 })
			 // console.log(registerResponse);
			 const registerJson = await registerResponse.json()
			 // console.log(registerJson);
		 } catch (err) {
		 	 console.error(err)
		 }

	}

	login = async (loginInfo) => {
		console.log('login() in App.js called with the following info', loginInfo);

		const url = process.env.REACT_APP_API_URL + '/api/v1/users/login'	

		try {
			const loginResponse = await fetch(url, {
			 	// INCLUDE THIS IN EVERY FETCH CALL
			 	// this will send your cookie, this is done automatically in express servers
			 	// If left out, user will not be authenticated
			 	credentials: 'include', // sneds the cookie
			 	method: 'POST',
			 	body: JSON.stringify(loginInfo),
			 	headers: {
			 		'Content-Type': 'application/json'
			 	}
			})
			// console.log(loginResponse);
			const loginJson = await loginResponse.json()
			// console.log(loginJson);

			// 'log in' the user and switch the component to dog container
			if (loginResponse.status === 200) {
				this.setState({
					loggedIn: true,
					loggedInUserEmail: loginJson.data.email, // optional, but helpful for UI stuff
				})
			}

		} catch (err) {
		 	 console.error(err)
		}
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
