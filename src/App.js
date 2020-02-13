import React from 'react';
import './App.css';
import DogContainer from './DogContainer'

function App() {
  // console.log(process.env);
  return (
    <div className="App">
    <h1>Dogs</h1>
    <DogContainer />
    </div>
  );
}

export default App;
