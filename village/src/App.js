import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom'

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  
  updateSmurfs = newSmurf => {
    this.setState({ smurfs: newSmurf })
  }
  
  componentDidMount() {
    axios
      .get('http://localhost:3333/smurfs')
      .then( response => this.setState({ smurfs: response.data }))
      .catch( err => console.log(err))
  }


  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
        <nav className="navContainer">
            <h1>Smurf City </h1>
          <div className="navLinks">
            <NavLink to="/"><h3>Home</h3></NavLink>
            <NavLink exact to="/smurf-form"><h3>Add Smurfs</h3></NavLink>
          </div>
        </nav>
        
        
        <Route exact path="/smurf-form" 
          render={ props => (
            <SmurfForm 
              {...props}
              updateSmurfs={this.updateSmurfs}
            />
          )}
        />
         
        <Route path="/"
          render = { props => (
            <Smurfs
              {...props}
              smurfs = {this.state.smurfs}
            />
          )}
        />
        </div>
    );
  }
}

export default App;
